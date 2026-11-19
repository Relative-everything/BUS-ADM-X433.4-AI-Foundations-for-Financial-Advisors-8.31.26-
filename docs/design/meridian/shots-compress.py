"""shots-compress.py <png-dir> <out-dir>: re-encodes style-snapshot's full-page PNGs as 64-colour
palette PNGs (text stays sharp, about a third of the bytes) so a before and an after set can be
committed beside a change."""
import sys, os, glob
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for f in sorted(glob.glob(os.path.join(src, '*.png'))):
    im = Image.open(f).convert('RGB').quantize(64, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    im.save(os.path.join(dst, os.path.basename(f)), optimize=True)
print(len(glob.glob(os.path.join(dst, '*.png'))), 'files in', dst)
