#!/usr/bin/env python3
"""
Which images are actually blurry, and why.

Run this from the folder that holds index.html, AFTER download-assets.sh.

There are two different causes of a soft image and they need different fixes:

  ASKED TOO SMALL   The page requested a small render from the CDN. Free to
                    fix in code. Already done, every request now asks 2500w.

  SOURCE TOO SMALL  The original file uploaded to Squarespace was small. No
                    URL parameter and no code change can fix this. It needs a
                    new asset exported from the original artwork.

This script measures the second one. It reads the real pixel dimensions of
every downloaded file and compares them to how large that image is actually
displayed, at 2x for a retina screen.

    needed = displayed CSS width x 2

Output is a table sorted worst first, so you can work down it and stop when
the numbers stop mattering.

Usage:
    python3 audit-resolution.py
    python3 audit-resolution.py --display-widths display-widths.tsv
"""
import csv, glob, os, struct, sys


# ---------------------------------------------------------------- dimensions
def dims(path):
    """Real pixel size of a jpg, png, gif or webp, without any dependencies."""
    try:
        with open(path, 'rb') as fh:
            head = fh.read(32)
            if len(head) < 24:
                return None

            # PNG
            if head[:8] == b'\x89PNG\r\n\x1a\n':
                w, h = struct.unpack('>II', head[16:24])
                return w, h

            # GIF
            if head[:6] in (b'GIF87a', b'GIF89a'):
                w, h = struct.unpack('<HH', head[6:10])
                return w, h

            # WEBP
            if head[:4] == b'RIFF' and head[8:12] == b'WEBP':
                if head[12:16] == b'VP8X':
                    w = struct.unpack('<I', head[24:27] + b'\x00')[0] + 1
                    h = struct.unpack('<I', head[27:30] + b'\x00')[0] + 1
                    return w, h
                fh.seek(0); blob = fh.read()
                i = blob.find(b'VP8 ')
                if i > 0:
                    w = struct.unpack('<H', blob[i + 14:i + 16])[0] & 0x3FFF
                    h = struct.unpack('<H', blob[i + 16:i + 18])[0] & 0x3FFF
                    return w, h
                return None

            # JPEG: walk the segment markers to the frame header
            if head[:2] == b'\xff\xd8':
                fh.seek(2)
                while True:
                    b = fh.read(1)
                    while b and b != b'\xff':
                        b = fh.read(1)
                    if not b:
                        return None
                    marker = fh.read(1)
                    while marker == b'\xff':
                        marker = fh.read(1)
                    if not marker:
                        return None
                    m = marker[0]
                    if 0xC0 <= m <= 0xCF and m not in (0xC4, 0xC8, 0xCC):
                        fh.read(3)
                        h, w = struct.unpack('>HH', fh.read(4))
                        return w, h
                    seg = fh.read(2)
                    if len(seg) < 2:
                        return None
                    fh.seek(struct.unpack('>H', seg)[0] - 2, 1)
    except Exception:
        return None
    return None


# ------------------------------------------------------------ displayed size
# How wide each image is actually drawn, measured in the browser at a 1728px
# window. Falls back to a conservative default when a file is not listed.
DEFAULT_CSS_WIDTH = 745

widths = {}
arg = sys.argv[sys.argv.index('--display-widths') + 1] if '--display-widths' in sys.argv else 'display-widths.tsv'
if os.path.exists(arg):
    with open(arg, encoding='utf-8') as fh:
        for row in csv.DictReader(fh, delimiter='\t'):
            widths[row['local_path']] = int(row['css_width'])

manifest = {}
if os.path.exists('assets-manifest.tsv'):
    with open('assets-manifest.tsv', encoding='utf-8') as fh:
        for row in csv.DictReader(fh, delimiter='\t'):
            manifest.setdefault(row['local_path'], row['page'])

files = sorted(glob.glob('images/**/*.*', recursive=True))
if not files:
    sys.exit('No images/ folder found. Run download-assets.sh first.')

# The pages now cap how wide a large frame is allowed to render, so a small
# file is never blown up past what it can carry. The recorded widths below were
# measured with oversized stand-in images, which means they show the slot at
# full size rather than the capped size. Mirror the same cap here so the
# verdict matches what actually appears on screen.
#
#   target 1.5x, and never below 55% of the slot
# Matches the sharpness cap in the pages. Only large frames are capped there,
# which in practice means anything rendering at 1400 CSS px or more.
TARGET, FLOOR, LARGE = 1.5, 0.55, 1400


def effective(css, real_w):
    if css < LARGE:
        return css
    return min(css, max(real_w / TARGET, css * FLOOR))


rows = []
for f in files:
    d = dims(f)
    if not d:
        continue
    w, h = d
    slot = widths.get(f, DEFAULT_CSS_WIDTH)
    css = round(effective(slot, w))
    need = css * 2
    rows.append((w / need, f, w, h, css, need, manifest.get(f, '?')))

rows.sort()

# Verdicts against what the pages actually target, which is 1.5x. Above that an
# image is doing its job. Below 1.0x it is being stretched and will look bad.
print('%-46s %-11s %7s %7s  %s' % ('file', 'real px', 'shown', 'want', 'verdict'))
print('-' * 96)
replace = soft = fine = 0
for ratio, f, w, h, css, need, page in rows:
    sharp = w / css if css else 0
    want = int(css * TARGET)
    if sharp >= TARGET - 0.01:
        fine += 1
        continue
    if sharp < 1.0:
        replace += 1
        verdict = 'REPLACE   stretched, only %.1fx' % sharp
    else:
        soft += 1
        verdict = 'soft      %.1fx' % sharp
    print('%-46s %5dx%-5d %7d %7d  %s' % (f[-46:], w, h, css, want, verdict))

print('-' * 96)
print('%d images are fine. %d are soft. %d need replacing.' % (fine, soft, replace))
print()
print('REPLACE means the file is being stretched beyond its real size. These are')
print('the ones worth fixing, and they need a fresh export from the source art.')
print('soft means it is under the 1.5x target but not stretched. Low priority.')
print()
print('"shown" is already the capped width, so it reflects the pages shrinking')
print('large frames to protect sharpness. "want" is the file width that would')
print('let that frame render at full size again. Drop in a bigger file and the')
print('frame grows back on its own, no code change needed.')
