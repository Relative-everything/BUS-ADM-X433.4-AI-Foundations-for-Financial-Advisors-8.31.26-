/* Browser acceptance suite for the live model console in Sessions 1 and 4.
 *
 *   NODE_PATH=$(npm root -g) node scripts/test_live_console.js
 *
 * Needs playwright and a Chromium. Google's and Anthropic's endpoints are both
 * mocked, so the suite runs offline and consumes no quota or credit. Google
 * Fonts is aborted because the load event would otherwise never fire on an
 * air-gapped runner.
 *
 * Sections P to W (added 2026-10-16) cover a Claude key: the console reads the
 * vendor off the key's sk-ant- prefix, lists the models the key reaches,
 * turns thinking off where the model allows it and asks for the lowest effort
 * where it cannot, never sends a temperature to a model that rejects one, and
 * sends the browser-access header Anthropic requires. A Gemini key must still
 * send nothing to Anthropic, and a Claude key nothing to Google.
 *
 * The two cases that matter most are A and N: with no key connected, both
 * lessons must behave exactly as they did before the console existed. If those
 * regress, the console has broken the lesson for every student who never
 * pastes a key, which is most of them.
 *
 * Session 0.1 carried the console until 2026-10-12 and dropped it with the probes
 * it ran (MAINTAINING.md, "The live model console"). Sections B and J, its no-key
 * and run 4 tests, went with it; the lettering of the rest is unchanged.
 */
const { chromium } = require('playwright');
const path = require('path');
const REPO = require("path").resolve(__dirname, "..");
const url = f => 'file://' + path.join(REPO, f);

let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; console.log('  FAIL  ' + name + (extra ? '  >> ' + extra : '')); }
}

// ---- mock Gemini ----
function makeRoute(opts) {
  const state = { gen: 0 };
  return async (route) => {
    const u = route.request().url();
    const key = route.request().headers()['x-goog-api-key'] || '';
    if (u.includes('/models') && !u.includes(':generateContent')) {
      if (opts.badKey || key === 'BADKEY') {
        return route.fulfill({ status: 400, contentType: 'application/json',
          body: JSON.stringify({ error: { message: 'API key not valid', status: 'INVALID_ARGUMENT',
            details: [{ reason: 'API_KEY_INVALID' }] } }) });
      }
      return route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ models: [
          { name: 'models/gemini-2.5-flash', supportedGenerationMethods: ['generateContent'] },
          { name: 'models/gemini-2.5-flash-lite', supportedGenerationMethods: ['generateContent'] },
          { name: 'models/gemini-2.5-flash-image', supportedGenerationMethods: ['generateContent'] },
          { name: 'models/gemini-2.5-pro', supportedGenerationMethods: ['generateContent'] },
          { name: 'models/text-embedding-004', supportedGenerationMethods: ['embedContent'] } ] }) });
    }
    if (u.includes(':generateContent')) {
      if (opts.rateLimit) {
        return route.fulfill({ status: 429, contentType: 'application/json',
          body: JSON.stringify({ error: { message: 'Quota exceeded' } }) });
      }
      const body = JSON.parse(route.request().postData() || '{}');
      const txt = opts.answers ? opts.answers[state.gen % opts.answers.length]
                               : 'MOCK-' + state.gen;
      state.gen++;
      opts.seen && opts.seen.push(body);
      return route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ candidates: [{ content: { parts: [{ text: txt }] },
          finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 11, candidatesTokenCount: 7 } }) });
    }
    return route.fulfill({ status: 404, body: '{}' });
  };
}

// ---- mock Anthropic ----
// Three active models and one deprecated. Opus 5.5 cannot switch thinking off
// (disabled: false) and takes effort; Sonnet 4.6 and Haiku 5.5 can. Only
// Sonnet 4.6 is 4.6-or-earlier, so it is the model the temperature panel
// must route to.
const CLAUDE_MODELS = [
  { id: 'claude-opus-5-5', display_name: 'Claude Opus 5.5', lifecycle: 'active', type: 'model',
    capabilities: { thinking: { supported: true, types: { adaptive: { supported: true }, disabled: { supported: false }, enabled: { supported: false } } },
                    effort: { supported: true, low: { supported: true }, medium: { supported: true }, high: { supported: true } } } },
  { id: 'claude-sonnet-4-6', display_name: 'Claude Sonnet 4.6', lifecycle: 'active', type: 'model',
    capabilities: { thinking: { supported: true, types: { adaptive: { supported: true }, disabled: { supported: true }, enabled: { supported: true } } },
                    effort: { supported: true, low: { supported: true } } } },
  { id: 'claude-haiku-5-5', display_name: 'Claude Haiku 5.5', lifecycle: 'active', type: 'model',
    capabilities: { thinking: { supported: true, types: { adaptive: { supported: true }, disabled: { supported: true }, enabled: { supported: false } } },
                    effort: { supported: true, low: { supported: true } } } },
  { id: 'claude-sonnet-4-5-20250929', display_name: 'Claude Sonnet 4.5', lifecycle: 'deprecated', type: 'model', capabilities: {} },
];
function makeRouteA(opts) {
  const state = { gen: 0 };
  return async (route) => {
    const u = route.request().url();
    const h = route.request().headers();
    const key = h['x-api-key'] || '';
    opts.headers && opts.headers.push(h);
    if (/\/v1\/models/.test(u)) {
      if (opts.badKey || key === 'sk-ant-BADKEY') {
        return route.fulfill({ status: 401, contentType: 'application/json',
          body: JSON.stringify({ type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } }) });
      }
      return route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ data: CLAUDE_MODELS, has_more: false, first_id: 'claude-opus-5-5', last_id: 'claude-sonnet-4-5-20250929' }) });
    }
    if (/\/v1\/messages/.test(u)) {
      if (opts.rateLimit) {
        return route.fulfill({ status: 429, contentType: 'application/json',
          body: JSON.stringify({ type: 'error', error: { type: 'rate_limit_error', message: 'Too many requests' } }) });
      }
      if (opts.empty) {
        return route.fulfill({ status: 402, contentType: 'application/json',
          body: JSON.stringify({ type: 'error', error: { type: 'billing_error', message: 'Your credit balance is too low to access the Anthropic API.' } }) });
      }
      const body = JSON.parse(route.request().postData() || '{}');
      opts.seen && opts.seen.push(body);
      if (opts.refuse) {
        return route.fulfill({ status: 200, contentType: 'application/json',
          body: JSON.stringify({ type: 'message', role: 'assistant', model: body.model, content: [], stop_reason: 'refusal',
            stop_details: { type: 'refusal', category: 'cyber' }, usage: { input_tokens: 13, output_tokens: 0 } }) });
      }
      const txt = opts.answers ? opts.answers[state.gen % opts.answers.length] : 'MOCK-' + state.gen;
      state.gen++;
      return route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ type: 'message', role: 'assistant', model: body.model,
          content: [{ type: 'thinking', thinking: '', signature: 'sig' }, { type: 'text', text: txt }],
          stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 13, output_tokens: 9 } }) });
    }
    return route.fulfill({ status: 404, body: '{}' });
  };
}
const A_KEY = 'sk-ant-api03-GOODKEY';

async function connect(page, key) {
  await page.click('#lmToggle');
  await page.fill('#lmKey', key || 'GOODKEY');
  await page.click('#lmConnect');
  await page.waitForTimeout(300);
}

(async () => {
  const browser = await chromium.launch();
  const blockFonts = p => p.route('**fonts.g**', r => r.abort());

  // =====================================================================
  console.log('\n--- A. session-1, NO KEY (the default student experience) ---');
  {
    const page = await browser.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await page.waitForTimeout(250);
    ok('no JS errors on load', errs.length === 0, errs.join('|'));
    ok('console present', await page.locator('#lmbox').count() === 1);
    ok('console collapsed by default', await page.locator('#lmBody').evaluate(n => n.classList.contains('hidden')));
    ok('status reads Not connected', (await page.locator('#lmStat').textContent()).trim() === 'Not connected');
    ok('live-only blocks hidden',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => n.classList.contains('hidden'))));

    for (let i = 0; i < 3; i++) { await page.click('#kalaiBtn'); await page.waitForTimeout(40); }
    const rows = await page.locator('#kalaiRuns .r').allTextContents();
    ok('3 captured attempts render', rows.length === 3, JSON.stringify(rows));
    ok('captured dates unchanged', rows.join(' ').includes('03-07') && rows.join(' ').includes('15-06') && rows.join(' ').includes('01-01'));
    ok('rows tagged captured', rows.every(r => /captured/.test(r)));
    const v = await page.locator('#kalaiOut').textContent();
    ok('captured verdict text preserved', v.includes('three different dates, all wrong'), v.slice(0, 70));
    ok('verdict labelled captured', v.includes('captured'));
    ok('button disabled after 3', await page.locator('#kalaiBtn').isDisabled());
    await page.close();
  }

  // =====================================================================
  console.log('\n--- C. bad key ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({ badKey: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'BADKEY');
    const msg = await page.locator('#lmMsg').textContent();
    ok('rejection message is readable', /rejected|whole string/i.test(msg), msg.slice(0, 80));
    ok('status stays Not connected', (await page.locator('#lmStat').textContent()).includes('Not connected'));
    ok('live blocks stay hidden',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => n.classList.contains('hidden'))));
    await page.click('#kalaiBtn'); await page.waitForTimeout(60);
    ok('captures still work after bad key', (await page.locator('#kalaiRuns .r').first().textContent()).includes('03-07'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- D. good key: connect behaviour ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({}));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    ok('status shows connected + model', (await page.locator('#lmStat').textContent()).includes('Connected'));
    ok('key field cleared after connect', (await page.locator('#lmKey').inputValue()) === '');
    const opts = await page.locator('#lmModel option').allTextContents();
    ok('model list filtered to flash, no image/embedding/pro',
      opts.includes('gemini-2.5-flash') && opts.includes('gemini-2.5-flash-lite')
      && !opts.includes('gemini-2.5-pro') && !opts.includes('gemini-2.5-flash-image'), JSON.stringify(opts));
    ok('default model is gemini-2.5-flash', (await page.locator('#lmModel').inputValue()) === 'gemini-2.5-flash');
    ok('live blocks revealed',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => !n.classList.contains('hidden'))));
    ok('kalai hint switched to live', (await page.locator('#kalaiMode').textContent()).includes('Live'));

    const store = await page.evaluate(() => {
      let ls = 0, ss = 0;
      try { ls = localStorage.length } catch (e) {}
      try { ss = sessionStorage.length } catch (e) {}
      return { ls, ss, cookie: document.cookie };
    });
    ok('nothing written to localStorage', store.ls === 0);
    ok('nothing written to sessionStorage', store.ss === 0);
    ok('no cookie set', store.cookie === '');
    const keyInDom = await page.evaluate(() => document.documentElement.outerHTML.indexOf('GOODKEY'));
    ok('key absent from the DOM', keyInDom === -1);
    await page.close();
  }

  // =====================================================================
  console.log('\n--- E. Kalai live, DIVERGENT answers ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['04-11', '22-03', '17-09'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    for (let i = 0; i < 3; i++) { await page.click('#kalaiBtn'); await page.waitForTimeout(220); }
    const rows = await page.locator('#kalaiRuns .r').allTextContents();
    ok('three live rows', rows.length === 3, JSON.stringify(rows));
    ok('live answers rendered', rows.join(' ').includes('04-11') && rows.join(' ').includes('17-09'));
    ok('rows tagged live', rows.every(r => /live/.test(r)));
    const v = await page.locator('#kalaiOut').textContent();
    ok('verdict reports 3 different answers', v.includes('3 different answers'), v.slice(0, 90));
    ok('verdict labelled live', v.includes('live'));
    const gen = seen.filter(b => b.contents);
    ok('temperature 1 sent', gen[0].generationConfig.temperature === 1);
    ok('maxOutputTokens capped at 64', gen[0].generationConfig.maxOutputTokens === 64);
    ok('prompt sent verbatim', gen[0].contents[0].parts[0].text.includes('Adam Tauman Kalai'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- F. Kalai live, CONVERGENT answers ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['09-04', '09-04', '09-04'] }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    for (let i = 0; i < 3; i++) { await page.click('#kalaiBtn'); await page.waitForTimeout(220); }
    const v = await page.locator('#kalaiOut').textContent();
    ok('verdict reports identical answers', v.includes('Three identical answers'), v.slice(0, 90));
    ok('teaches reproducibility != correctness', v.includes('Reproducibility is not correctness'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- G. rate limit (429) falls back to capture ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({ rateLimit: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    await page.click('#kalaiBtn'); await page.waitForTimeout(250);
    const row = await page.locator('#kalaiRuns .r').first().textContent();
    ok('falls back to the captured date', row.includes('03-07'), row);
    ok('row labelled as a failed live call', /live call failed/.test(row), row);
    const msg = await page.locator('#lmMsg').textContent();
    ok('429 explained in plain language', /quota|rate limit/i.test(msg), msg.slice(0, 80));
    ok('429 message reassures the lesson continues', /continues at full pace/.test(msg));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- H. free-form prompt box ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['A live answer from the model.'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    await page.fill('#lmPrompt', 'Explain a grantor trust in one sentence.');
    await page.click('#lmSend'); await page.waitForTimeout(250);
    ok('output rendered', (await page.locator('#lmFreeOut').textContent()).includes('A live answer'));
    ok('token usage shown', /in 11 tokens/.test(await page.locator('#lmFreeUse').textContent()));
    ok('call counter advanced', /1 \/ 40/.test(await page.locator('#lmCount').textContent()));
    const g = seen.filter(b => b.contents).pop();
    ok('free-form uses 700 token ceiling', g.generationConfig.maxOutputTokens === 700);
    await page.click('#lmClear'); await page.waitForTimeout(60);
    ok('clear resets the box', (await page.locator('#lmPrompt').inputValue()) === '');
    await page.close();
  }

  // =====================================================================
  console.log('\n--- I. forget the key ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({}));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    await page.click('#lmForget'); await page.waitForTimeout(120);
    ok('status back to Not connected', (await page.locator('#lmStat').textContent()).trim() === 'Not connected');
    ok('live blocks hidden again',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => n.classList.contains('hidden'))));
    await page.click('#kalaiBtn'); await page.waitForTimeout(80);
    ok('captures resume after forget', (await page.locator('#kalaiRuns .r').first().textContent()).includes('03-07'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- K. A5 live temperature (session-1) ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['Cold output.', 'Hot output.'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    // A5 is an appendix section: show every depth first, or the range is not visible
    await page.evaluate(() => { const b = document.querySelector('#tierbar [data-level="2"]'); if (b) b.click(); });
    await page.waitForTimeout(150);
    await page.locator('#lmTemp').fill('0');
    await page.click('#lmTempRun'); await page.waitForTimeout(250);
    await page.locator('#lmTemp').fill('1.8');
    await page.click('#lmTempRun'); await page.waitForTimeout(250);
    const rows = await page.locator('#lmTempRuns .r').allTextContents();
    ok('two temperature runs logged', rows.length === 2, JSON.stringify(rows));
    ok('temperatures labelled', rows.length===2 && rows[0].includes('temp 0.0') && rows[1].includes('temp 1.8'), JSON.stringify(rows));
    const gen = seen.filter(b => b.contents);
    ok('temperature 0 sent', gen[0].generationConfig.temperature === 0);
    ok('temperature 1.8 sent', gen[1].generationConfig.temperature === 1.8);
    ok('sampler simulator still present', await page.locator('#labDraws').count() === 1);
    await page.close();
  }

  // =====================================================================
  console.log('\n--- L. escaping and print ---');
  {
    const page = await browser.newPage();
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['<img src=x onerror="window.__pwned=1">'] }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    await page.fill('#lmPrompt', 'x');
    await page.click('#lmSend'); await page.waitForTimeout(250);
    ok('model output is not executed as HTML', await page.evaluate(() => !window.__pwned));
    ok('output shown literally', (await page.locator('#lmFreeOut').textContent()).includes('<img src=x'));
    await page.emulateMedia({ media: 'print' });
    ok('console hidden in print', await page.locator('#lmbox').isHidden());
    await page.emulateMedia({ media: 'screen' });
    await page.close();
  }

  // =====================================================================
  console.log('\n--- N. session-4, NO KEY: the request is readable, nothing is sent ---');
  {
    const page = await browser.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    const reqs = []; page.on('request', r => { if (/generativelanguage\.googleapis\.com/.test(r.url())) reqs.push(r.url()); });
    await blockFonts(page); await page.goto(url('session-4/index.html'), {waitUntil:'domcontentloaded'});
    await page.waitForTimeout(300);
    ok('s4: no JS errors on load', errs.length === 0, errs.join('|'));
    ok('s4: console present', await page.locator('#lmbox').count() === 1);
    ok('s4: collapsed by default', await page.locator('#lmBody').evaluate(n => n.classList.contains('hidden')));
    ok('s4: status reads Not connected', (await page.locator('#lmStat').textContent()).trim() === 'Not connected');
    ok('s4: live-only blocks hidden',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => n.classList.contains('hidden'))));
    await page.click('#lmToggle'); await page.waitForTimeout(80);
    const pre = await page.locator('#lmPrompt').inputValue();
    ok('s4: prompt starts as the clean Prompt D (no client name)', /the client/.test(pre) && !/Meg Cole/.test(pre), pre.slice(0, 60));
    await page.click('#lmShowReq'); await page.waitForTimeout(80);
    const req = await page.locator('#lmReq').textContent();
    ok('s4: the request names the one endpoint', /generativelanguage\.googleapis\.com\/v1beta\/models\/.+:generateContent/.test(req));
    ok('s4: the request says no key is connected', /no key connected/.test(req));
    ok('s4: the request carries the prompt as JSON', /"contents"/.test(req) && /the client/.test(req));
    ok('s4: nothing was sent to Google', reqs.length === 0, reqs.join('|'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- O. session-4 live: masked key, send, tokens, no key in the DOM ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({ answers: ['MOCK reply for the room'], seen }));
    await blockFonts(page); await page.goto(url('session-4/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    ok('s4: connected', (await page.locator('#lmStat').textContent()).includes('Connected'));
    await page.click('#lmShowReq'); await page.waitForTimeout(80);
    const req = await page.locator('#lmReq').textContent();
    ok('s4: the key is masked in the shown request', /\u2022{6,}/.test(req) && !/GOODKEY/.test(req));
    await page.click('#lmSend'); await page.waitForTimeout(300);
    ok('s4: reply rendered', (await page.locator('#lmFreeOut').textContent()).includes('MOCK reply'));
    ok('s4: the body sent is the prompt shown', seen.length === 1 && /the client/.test(seen[0].contents[0].parts[0].text));
    ok('s4: token counts shown', /in 11 tokens .* out 7 tokens/.test(await page.locator('#lmFreeUse').textContent()));
    ok('s4: the key never reaches the DOM', !(await page.content()).includes('GOODKEY'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- P. Claude key: connect behaviour (session-1) ---');
  {
    const page = await browser.newPage();
    const headers = [];
    const toGoogle = []; page.on('request', r => { if (/googleapis\.com/.test(r.url()) && !/fonts\./.test(r.url())) toGoogle.push(r.url()); });
    await page.route('**api.anthropic.com/**', makeRouteA({ headers }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    ok('claude: status shows connected + model', (await page.locator('#lmStat').textContent()).includes('Connected'));
    ok('claude: key field cleared after connect', (await page.locator('#lmKey').inputValue()) === '');
    const opts = await page.locator('#lmModel option').allTextContents();
    ok('claude: active models listed in API order, deprecated dropped',
      JSON.stringify(opts) === JSON.stringify(['claude-opus-5-5', 'claude-sonnet-4-6', 'claude-haiku-5-5']), JSON.stringify(opts));
    ok('claude: default model is claude-opus-5-5', (await page.locator('#lmModel').inputValue()) === 'claude-opus-5-5');
    ok('claude: the models call carried the browser-access header',
      headers.length === 1 && headers[0]['anthropic-dangerous-direct-browser-access'] === 'true' && headers[0]['anthropic-version'] === '2023-06-01', JSON.stringify(headers[0]));
    ok('claude: the key travelled as x-api-key, not in the address', headers[0]['x-api-key'] === A_KEY);
    ok('claude: the connect message names the vendor', /Live on Anthropic/.test(await page.locator('#lmMsg').textContent()));
    ok('claude: live blocks revealed',
      await page.locator('[data-lm-live]').evaluateAll(ns => ns.every(n => !n.classList.contains('hidden'))));
    ok('claude: nothing was sent to Google', toGoogle.length === 0, toGoogle.join('|'));
    const store = await page.evaluate(() => {
      let ls = 0, ss = 0;
      try { ls = localStorage.length } catch (e) {}
      try { ss = sessionStorage.length } catch (e) {}
      return { ls, ss, cookie: document.cookie };
    });
    ok('claude: nothing written to storage or cookies', store.ls === 0 && store.ss === 0 && store.cookie === '');
    ok('claude: key absent from the DOM', (await page.content()).indexOf(A_KEY) === -1);
    await page.close();
  }

  // =====================================================================
  console.log('\n--- Q. Claude key: Kalai live on Opus 5.5 (thinking cannot be switched off) ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**api.anthropic.com/**', makeRouteA({ answers: ['04-11', '22-03', '17-09'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    for (let i = 0; i < 3; i++) { await page.click('#kalaiBtn'); await page.waitForTimeout(220); }
    const rows = await page.locator('#kalaiRuns .r').allTextContents();
    ok('claude: three live rows', rows.length === 3 && rows.every(r => /live/.test(r)), JSON.stringify(rows));
    ok('claude: verdict reports 3 different answers', (await page.locator('#kalaiOut').textContent()).includes('3 different answers'));
    const b = seen[0];
    ok('claude: Messages API shape (model, messages, max_tokens)',
      b && b.model === 'claude-opus-5-5' && b.messages[0].role === 'user' && /Adam Tauman Kalai/.test(b.messages[0].content), JSON.stringify(b));
    ok('claude: no temperature sent to a model that rejects it', !('temperature' in b) && !('top_p' in b) && !('top_k' in b));
    ok('claude: no thinking:disabled on a model that cannot', !('thinking' in b));
    ok('claude: lowest effort requested instead', b.output_config && b.output_config.effort === 'low', JSON.stringify(b.output_config));
    ok('claude: ceiling raised to leave room for thinking tokens', b.max_tokens === 2048, String(b.max_tokens));
    ok('claude: no Gemini fields leak into the body', !('contents' in b) && !('generationConfig' in b));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- R. Claude key: temperature panel routes to a model that still takes one ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**api.anthropic.com/**', makeRouteA({ answers: ['Cold output.', 'Hot output.'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.evaluate(() => { const b = document.querySelector('#tierbar [data-level="2"]'); if (b) b.click(); });
    await page.waitForTimeout(150);
    await page.locator('#lmTemp').fill('0');
    await page.click('#lmTempRun'); await page.waitForTimeout(250);
    await page.locator('#lmTemp').fill('1.8');
    await page.click('#lmTempRun'); await page.waitForTimeout(250);
    const rows = await page.locator('#lmTempRuns .r').allTextContents();
    ok('claude: two temperature runs logged', rows.length === 2, JSON.stringify(rows));
    ok('claude: rows name the model actually used', rows.every(r => /claude-sonnet-4-6/.test(r)), JSON.stringify(rows));
    ok('claude: routed off Opus 5.5 to Sonnet 4.6', seen.length === 2 && seen.every(b => b.model === 'claude-sonnet-4-6'), JSON.stringify(seen.map(b => b.model)));
    ok('claude: temperature 0 and 1.8 sent', seen[0].temperature === 0 && seen[1].temperature === 1.8);
    ok('claude: thinking switched off where the model allows it', seen.every(b => b.thinking && b.thinking.type === 'disabled'));
    ok('claude: 160-token ceiling kept when thinking is off', seen.every(b => b.max_tokens === 160));
    ok('claude: the selector still shows the model the reader chose', (await page.locator('#lmModel').inputValue()) === 'claude-opus-5-5');
    ok('claude: usage line names the routed model', /claude-sonnet-4-6/.test(await page.locator('#lmTempUse').textContent()));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- S. Claude key: free-form on Haiku 5.5, and the chosen model is honoured ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**api.anthropic.com/**', makeRouteA({ answers: ['A live answer from Claude.'], seen }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.selectOption('#lmModel', 'claude-haiku-5-5');
    await page.fill('#lmPrompt', 'Explain a grantor trust in one sentence.');
    await page.click('#lmSend'); await page.waitForTimeout(250);
    ok('claude: output rendered', (await page.locator('#lmFreeOut').textContent()).includes('A live answer from Claude'));
    ok('claude: token usage normalised (in 13, out 9)', /in 13 tokens .* out 9 tokens .* claude-haiku-5-5/.test(await page.locator('#lmFreeUse').textContent()),
      await page.locator('#lmFreeUse').textContent());
    const b = seen[0];
    ok('claude: free-form uses the chosen model', b.model === 'claude-haiku-5-5');
    ok('claude: free-form keeps its 700 ceiling with thinking off', b.max_tokens === 700 && b.thinking && b.thinking.type === 'disabled');
    ok('claude: temperature 1 is the default and is not sent', !('temperature' in b));
    ok('claude: status reflects the chosen model', /claude-haiku-5-5/.test(await page.locator('#lmStat').textContent()));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- T. Claude key: bad key, rate limit, empty balance, refusal ---');
  {
    let page = await browser.newPage();
    await page.route('**api.anthropic.com/**', makeRouteA({ badKey: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'sk-ant-BADKEY');
    const msg = await page.locator('#lmMsg').textContent();
    ok('claude 401: rejection message is readable and names the prefix', /rejected/.test(msg) && /sk-ant-/.test(msg), msg.slice(0, 90));
    ok('claude 401: status stays Not connected', (await page.locator('#lmStat').textContent()).includes('Not connected'));
    await page.click('#kalaiBtn'); await page.waitForTimeout(60);
    ok('claude 401: captures still work', (await page.locator('#kalaiRuns .r').first().textContent()).includes('03-07'));
    await page.close();

    page = await browser.newPage();
    await page.route('**api.anthropic.com/**', makeRouteA({ rateLimit: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.click('#kalaiBtn'); await page.waitForTimeout(250);
    const row = await page.locator('#kalaiRuns .r').first().textContent();
    ok('claude 429: falls back to the captured date', row.includes('03-07') && /live call failed/.test(row), row);
    const m429 = await page.locator('#lmMsg').textContent();
    ok('claude 429: explained, and the lesson continues', /rate limit/i.test(m429) && /continues at full pace/.test(m429), m429.slice(0, 90));
    await page.close();

    page = await browser.newPage();
    await page.route('**api.anthropic.com/**', makeRouteA({ empty: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.click('#kalaiBtn'); await page.waitForTimeout(250);
    const m402 = await page.locator('#lmMsg').textContent();
    ok('claude 402: an empty balance is named and the capture is used', /balance/.test(m402) && /captured output is in use/.test(m402), m402.slice(0, 90));
    await page.close();

    page = await browser.newPage();
    await page.route('**api.anthropic.com/**', makeRouteA({ refuse: true }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.fill('#lmPrompt', 'x');
    await page.click('#lmSend'); await page.waitForTimeout(250);
    const out = await page.locator('#lmFreeOut').textContent();
    ok('claude refusal: stop_reason refusal is explained, not shown as an empty reply', /declined/.test(out) && /refusal/.test(out), out.slice(0, 90));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- U. Claude key: forget, then a Gemini key, in the same page ---');
  {
    const page = await browser.newPage();
    const toA = []; page.on('request', r => { if (/api\.anthropic\.com/.test(r.url())) toA.push(r.url()); });
    await page.route('**api.anthropic.com/**', makeRouteA({}));
    await page.route('**generativelanguage.googleapis.com/**', makeRoute({}));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.click('#lmForget'); await page.waitForTimeout(120);
    ok('claude: forget resets the status', (await page.locator('#lmStat').textContent()).trim() === 'Not connected');
    const before = toA.length;
    // the box is already open after the first connect, so no toggle here
    await page.fill('#lmKey', 'GOODKEY'); await page.click('#lmConnect'); await page.waitForTimeout(300);
    ok('gemini after claude: connects to Google', (await page.locator('#lmModel').inputValue()) === 'gemini-2.5-flash');
    await page.click('#kalaiBtn'); await page.waitForTimeout(220);
    ok('gemini after claude: no further request to Anthropic', toA.length === before, String(toA.length - before));
    ok('gemini after claude: live row from Google', /live/.test(await page.locator('#kalaiRuns .r').first().textContent()));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- V. session-4, Claude key: the request shown is the request sent ---');
  {
    const page = await browser.newPage();
    const seen = [], headers = [];
    await page.route('**api.anthropic.com/**', makeRouteA({ answers: ['MOCK reply for the room'], seen, headers }));
    await blockFonts(page); await page.goto(url('session-4/index.html'), {waitUntil:'domcontentloaded'});
    await page.click('#lmToggle'); await page.waitForTimeout(80);
    await page.click('#lmShowReq'); await page.waitForTimeout(80);
    const req0 = await page.locator('#lmReq').textContent();
    ok('s4 no key: the Gemini request is shown, and the Claude alternative is named',
      /generativelanguage\.googleapis\.com/.test(req0) && /api\.anthropic\.com\/v1\/messages/.test(req0) && /sk-ant-/.test(req0));
    await page.fill('#lmKey', A_KEY); await page.click('#lmConnect'); await page.waitForTimeout(300);
    ok('s4 claude: connected', (await page.locator('#lmStat').textContent()).includes('Connected'));
    const req = await page.locator('#lmReq').textContent();
    ok('s4 claude: the shown request names the Anthropic endpoint', /^POST https:\/\/api\.anthropic\.com\/v1\/messages/m.test(req));
    ok('s4 claude: the shown request carries the version and browser-access headers',
      /anthropic-version: 2023-06-01/.test(req) && /anthropic-dangerous-direct-browser-access: true/.test(req));
    ok('s4 claude: the key is masked in the shown request', /x-api-key: \u2022{6,}/.test(req) && !/GOODKEY/.test(req));
    ok('s4 claude: the body shown is a Messages body carrying the clean prompt', /"messages"/.test(req) && /the client/.test(req) && !/"contents"/.test(req));
    const shown = JSON.parse(req.slice(req.indexOf('{'), req.lastIndexOf('}') + 1));
    await page.click('#lmSend'); await page.waitForTimeout(300);
    ok('s4 claude: reply rendered', (await page.locator('#lmFreeOut').textContent()).includes('MOCK reply'));
    ok('s4 claude: the body sent is byte-for-byte the body shown', seen.length === 1 && JSON.stringify(seen[0]) === JSON.stringify(shown));
    const sent = headers[headers.length - 1];
    ok('s4 claude: the headers sent are the headers shown', sent['anthropic-version'] === '2023-06-01' && sent['anthropic-dangerous-direct-browser-access'] === 'true' && sent['x-api-key'] === A_KEY);
    ok('s4 claude: token counts shown', /in 13 tokens .* out 9 tokens/.test(await page.locator('#lmFreeUse').textContent()));
    const cost = await page.locator('#lmCost').textContent();
    ok('s4 claude: the cost line prices the tokens and names the Claude billing', /about \$/.test(cost) && /Claude key is billed/.test(cost), cost.slice(0, 120));
    // per-model pricing (DW-185): the default model is Opus 5.5, 13 in at $4 + 9 out at $20 per MTok = $0.00023
    ok('s4 claude: the cost line names the model that answered and its own rate', /Claude Opus 5\.5, at \$4 in and \$20 out/.test(cost) && /about \$0\.00023/.test(cost), cost.slice(0, 160));
    ok('s4 claude: a model that cannot switch thinking off says the out count holds its thinking tokens', /thinking tokens are billed as output and the out count of 9 includes them/.test(cost), cost.slice(0, 220));
    await page.selectOption('#lmModel', 'claude-haiku-5-5'); await page.click('#lmSend'); await page.waitForTimeout(300);
    const costH = await page.locator('#lmCost').textContent();
    ok('s4 claude: Haiku 5.5 prices at $0.10 / $0.50 with thinking off', /Claude Haiku 5\.5, at \$0\.10 in and \$0\.50 out/.test(costH) && /about \$0\.00001/.test(costH) && /Thinking is off/.test(costH), costH.slice(0, 160));
    await page.selectOption('#lmModel', 'claude-sonnet-4-6'); await page.click('#lmSend'); await page.waitForTimeout(300);
    const costU = await page.locator('#lmCost').textContent();
    ok('s4 claude: a model the table does not know falls back to the Haiku floor sentence', /smallest Claude model/.test(costU) && /this figure or higher/.test(costU), costU.slice(0, 160));
    ok('s4 claude: the key never reaches the DOM', !(await page.content()).includes(A_KEY));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- W. escaping holds for Claude output ---');
  {
    const page = await browser.newPage();
    await page.route('**api.anthropic.com/**', makeRouteA({ answers: ['<img src=x onerror="window.__pwned=1">'] }));
    await blockFonts(page); await page.goto(url('session-1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, A_KEY);
    await page.fill('#lmPrompt', 'x');
    await page.click('#lmSend'); await page.waitForTimeout(250);
    ok('claude: model output is not executed as HTML', await page.evaluate(() => !window.__pwned));
    ok('claude: output shown literally', (await page.locator('#lmFreeOut').textContent()).includes('<img src=x'));
    await page.close();
  }

  // =====================================================================
  console.log('\n--- M. rendered copy sanity (both lessons) ---');
  for (const lesson of ['session-1/index.html', 'session-4/index.html']) {
    const page = await browser.newPage();
    await blockFonts(page);
    await page.goto(url(lesson), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    // A \uXXXX escape is right inside a JS string and wrong in HTML copy, where
    // it renders literally. This caught a real one in the run 4 panel.
    const txt = await page.locator('body').innerText();
    const esc = txt.match(/\\u[0-9a-fA-F]{4}/g);
    ok(lesson + ': no literal unicode escapes in rendered copy', !esc, esc && esc.join(','));
    const ents = txt.match(/&(mdash|middot|rsquo|amp|lt|gt|nbsp);/g);
    ok(lesson + ': no unrendered HTML entities in copy', !ents, ents && ents.join(','));
    await page.close();
  }

  await browser.close();
  console.log('\n=====================================');
  console.log('  ' + pass + ' passed, ' + fail + ' failed');
  console.log('=====================================');
  process.exit(fail ? 1 : 0);
})();
