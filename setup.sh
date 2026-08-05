#!/usr/bin/env bash
#
# One command to set the site up, or to re-set it up after new pages arrive.
#
#   bash setup.sh
#
# It does three things in the right order:
#   1. downloads any asset it does not already have
#   2. points the pages at those local files
#   3. reports which images are still too low resolution
#
# Safe to run as many times as you like. It skips files already downloaded,
# and pages already pointing at local files are left alone.
#
set -uo pipefail

cd "$(dirname "$0")"

say()  { printf '\n\033[1m%s\033[0m\n' "$1"; }
warn() { printf '  \033[33m%s\033[0m\n' "$1"; }

# ---------------------------------------------------------------- sanity
missing=0
for f in assets-manifest.tsv localise-assets.py audit-resolution.py index.html; do
  if [ ! -f "$f" ]; then warn "missing: $f"; missing=1; fi
done
if [ "$missing" = "1" ]; then
  echo
  echo "Put every file from the chat in this folder, then run this again."
  exit 1
fi

# ---------------------------------------------------------------- 1. assets
say "1 of 3   Downloading images"

total=0; got=0; skip=0; fail=0
failed_list=""

# read the manifest: page, local_path, remote_url
while IFS=$'\t' read -r page local url; do
  [ "$page" = "page" ] && continue          # header
  [ -z "${url:-}" ] && continue
  total=$((total+1))

  # already have it, and it is not empty
  if [ -s "$local" ]; then
    skip=$((skip+1))
    continue
  fi

  mkdir -p "$(dirname "$local")"
  if curl -fsSL --retry 3 --max-time 120 -o "$local" "$url" 2>/dev/null; then
    got=$((got+1))
  else
    rm -f "$local"
    fail=$((fail+1))
    if [ "$fail" -le 10 ]; then failed_list="$failed_list
  $url"; fi
  fi
done < assets-manifest.tsv

echo "  $total assets: $got downloaded, $skip already here, $fail failed"
if [ "$fail" != "0" ]; then
  warn "first failures:$failed_list"
  if [ "$fail" -gt 10 ]; then warn "...and $((fail-10)) more"; fi
  warn "if everything failed, check your internet connection and run this again"
  warn "if only a few failed, those images no longer exist on Squarespace"
fi

# ---------------------------------------------------------------- 2. rewrite
say "2 of 3   Pointing the pages at the local files"
python3 localise-assets.py

# ---------------------------------------------------------------- 3. audit
say "3 of 3   Checking image resolution"
python3 audit-resolution.py

say "Version"
total=$(ls -1 *.html 2>/dev/null | wc -l | tr -d ' ')
tagged=$(grep -l '<!-- build: ' *.html 2>/dev/null | wc -l | tr -d ' ')
ids=$(grep -ho '<!-- build: [^ ]* -->' *.html 2>/dev/null | sed 's/<!-- build: //;s/ -->//' | sort -u)

if [ "$tagged" = "0" ]; then
  warn "none of these $total pages carry a build tag, so they all predate grid-v3"
  warn "re-download every file from the chat into this folder"
else
  for id in $ids; do
    echo "  $id   ($(grep -l "build: $id " *.html | wc -l | tr -d ' ') of $total pages)"
  done
  if [ "$tagged" != "$total" ]; then
    warn "$((total-tagged)) page(s) have no build tag and are older than the rest:"
    for f in *.html; do
      grep -q '<!-- build: ' "$f" || echo "    $f"
    done
    warn "re-download those from the chat"
  elif [ "$(echo "$ids" | wc -l | tr -d ' ')" != "1" ]; then
    warn "mixed versions in this folder, re-download every file from the chat"
  fi
fi

say "Done"
echo "  Open the site with:   open index.html"
