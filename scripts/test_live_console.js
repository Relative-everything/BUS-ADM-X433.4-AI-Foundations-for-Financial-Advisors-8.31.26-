/* Browser acceptance suite for the live model console in Sessions 0.1 and 1.
 *
 *   NODE_PATH=$(npm root -g) node scripts/test_live_console.js
 *
 * Needs playwright and a Chromium. Google's endpoint is mocked throughout, so
 * the suite runs offline and consumes no API quota. Google Fonts is aborted
 * because the load event would otherwise never fire on an air-gapped runner.
 *
 * The two cases that matter most are A and B: with no key connected, both
 * lessons must behave exactly as they did before the console existed. If those
 * regress, the console has broken the lesson for every student who never
 * pastes a key, which is most of them.
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
  console.log('\n--- B. session-0.1, NO KEY ---');
  {
    const page = await browser.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await blockFonts(page); await page.goto(url('session-0.1/index.html'), {waitUntil:'domcontentloaded'});
    await page.waitForTimeout(250);
    ok('no JS errors on load', errs.length === 0, errs.join('|'));
    ok('run 4 hidden without key', await page.locator('#lmRun4').isHidden());
    ok('capture buttons still present', await page.locator('#capOpen1').count() === 1);
    await page.click('#capOpen1'); await page.waitForTimeout(80);
    ok('capture 1 still opens', !(await page.locator('#cap1').evaluate(n => n.classList.contains('hidden'))));
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
  console.log('\n--- J. session-0.1 run 4 live ---');
  {
    const page = await browser.newPage();
    const seen = [];
    await page.route('**generativelanguage.googleapis.com/**',
      makeRoute({ answers: ['I cannot verify the current rate.'], seen }));
    await blockFonts(page); await page.goto(url('session-0.1/index.html'), {waitUntil:'domcontentloaded'});
    await connect(page, 'GOODKEY');
    ok('run 4 visible once connected', await page.locator('#lmRun4').isVisible());
    ok('hint switched to live', (await page.locator('#lmHint08').textContent()).includes('Live'));
    await page.click('#lmRun4'); await page.waitForTimeout(250);
    ok('run 4 output rendered', (await page.locator('#lmOut4').textContent()).includes('cannot verify'));
    const g = seen.filter(b => b.contents).pop();
    ok('run 4 sends the probe-captures P1 prompt',
      g.contents[0].parts[0].text.includes('Section 7520 rate and Applicable Federal Rate'));
    const rb = await page.locator('#s8 table.dt').first().textContent();
    ok('runbook table untouched', rb.includes('Sonnet 5') && rb.includes('Opus 5') && rb.includes('search off'), rb.slice(0,60));
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
  console.log('\n--- M. rendered copy sanity (both lessons) ---');
  for (const lesson of ['session-0.1/index.html', 'session-1/index.html']) {
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
