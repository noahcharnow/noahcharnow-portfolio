#!/usr/bin/env bash
#
# Self-host General Sans.
#
#   bash fetch-fonts.sh
#
# What it does, in order:
#   1. asks Fontshare (the official source) for its General Sans stylesheet
#   2. downloads the four weight files the site uses into fonts/
#   3. rewrites every page to load those local files instead of Fontshare
#
# Why this exists: the site currently borrows its typeface from Fontshare's
# servers on every visit. If Fontshare is slow, the site is slow. If Fontshare
# changes a URL, the site loses its typeface. Self-hosting removes the last
# outside dependency.
#
# Safe to run again. If the fonts are already local and the pages already
# point at them, it says so and stops.
#
set -euo pipefail
cd "$(dirname "$0")"

say()  { printf '\n\033[1m%s\033[0m\n' "$1"; }
warn() { printf '  \033[33m%s\033[0m\n' "$1"; }

CSS_URL='https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap'

# ---------------------------------------------------------------- 1. fetch css
say "1 of 3   Asking Fontshare where the font files live"

css=$(curl -fsSL --max-time 30 -A "Mozilla/5.0" "$CSS_URL") || {
  warn "could not reach Fontshare, check your internet connection"
  exit 1
}

# ---------------------------------------------------------------- 2. download
say "2 of 3   Downloading the four weights into fonts/"
mkdir -p fonts

python3 - "$css" <<'PY'
import re, sys, subprocess, os

css = sys.argv[1]

# Fontshare's css is a series of @font-face blocks. Each block names a
# font-weight and a list of src urls. We want the woff2 url for each of the
# four weights the site uses.
blocks = re.findall(r'@font-face\s*{[^}]*}', css)
want = {'400', '500', '600', '700'}
found = {}

for b in blocks:
    wm = re.search(r'font-weight:\s*(\d+)', b)
    um = re.search(r"url\(['\"]?(https://[^'\")]+\.woff2)", b)
    if wm and um and wm.group(1) in want:
        found[wm.group(1)] = um.group(1)

missing = sorted(want - set(found))
if missing:
    print(f"  could not find weights {missing} in Fontshare's stylesheet")
    sys.exit(1)

for w in sorted(found):
    out = f'fonts/general-sans-{w}.woff2'
    if os.path.exists(out) and os.path.getsize(out) > 1000:
        print(f'  {out}  already here')
        continue
    subprocess.run(['curl', '-fsSL', '--max-time', '45',
                    '-o', out, found[w]], check=True)
    kb = os.path.getsize(out) // 1024
    print(f'  {out}  {kb} KB')
PY

# ---------------------------------------------------------------- 3. rewrite
say "3 of 3   Pointing the pages at the local files"

python3 - <<'PY'
import glob, re

FONTFACE = """<style>
/* General Sans, self-hosted. Fetched from Fontshare by fetch-fonts.sh */
@font-face{font-family:'General Sans';font-weight:400;font-style:normal;font-display:swap;src:url('fonts/general-sans-400.woff2') format('woff2')}
@font-face{font-family:'General Sans';font-weight:500;font-style:normal;font-display:swap;src:url('fonts/general-sans-500.woff2') format('woff2')}
@font-face{font-family:'General Sans';font-weight:600;font-style:normal;font-display:swap;src:url('fonts/general-sans-600.woff2') format('woff2')}
@font-face{font-family:'General Sans';font-weight:700;font-style:normal;font-display:swap;src:url('fonts/general-sans-700.woff2') format('woff2')}
</style>"""

link_re = re.compile(
    r'<link[^>]*api\.fontshare\.com[^>]*>\s*', re.I)

changed = 0
already = 0
for path in sorted(glob.glob('*.html')):
    s = open(path, encoding='utf-8').read()
    if 'general-sans-400.woff2' in s:
        already += 1
        continue
    if not link_re.search(s):
        continue
    block = FONTFACE
    # Netlify serves 404.html at whatever address failed, so its font paths
    # must start from the site root or they break on nested addresses.
    if path == '404.html':
        block = block.replace("url('fonts/", "url('/fonts/")
    # remove every fontshare link and preconnect, then add the font-face block
    s = link_re.sub('', s, count=0)
    s = s.replace('</title>', '</title>\n' + block, 1)
    open(path, 'w', encoding='utf-8').write(s)
    changed += 1

if changed:
    print(f'  {changed} pages now load the local fonts')
if already:
    print(f'  {already} pages already pointed at the local fonts')
if not changed and not already:
    print('  no pages mention Fontshare, nothing to do')
PY

say "Done"
echo "  Open index.html, then check the Network tab:"
echo "  you should see fonts/general-sans-*.woff2 and no fontshare.com"
echo
echo "  Then:  git add . && git commit -m \"Self-host General Sans\" && git push"
