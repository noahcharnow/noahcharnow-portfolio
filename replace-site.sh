#!/usr/bin/env bash
#
# Replace the contents of the existing portfolio repo with the new static site.
#
#   bash replace-site.sh ~/Desktop/noahcharnow-portfolio
#
# Run it from the folder that holds index.html.
#
# The old Next.js site is not thrown away. Before anything is removed, a branch
# called archive-old-site is created pointing at the current state, so it stays
# in the repo and can be looked at or restored later.
#
# Nothing is pushed. The script stops after committing so the change can be
# checked first.
#
set -uo pipefail

say()  { printf '\n\033[1m%s\033[0m\n' "$1"; }
warn() { printf '  \033[33m%s\033[0m\n' "$1"; }
die()  { printf '\n  \033[31m%s\033[0m\n\n' "$1"; exit 1; }

SRC="$(cd "$(dirname "$0")" && pwd)"
REPO="${1:-}"

# ---------------------------------------------------------------- checks
[ -n "$REPO" ] || die "Give me the repo folder: bash replace-site.sh ~/Desktop/noahcharnow-portfolio"
[ -d "$REPO" ] || die "That folder does not exist: $REPO"
[ -d "$REPO/.git" ] || die "That folder is not a git repository: $REPO"
[ -f "$SRC/index.html" ] || die "Run this from the folder that holds index.html"

if [ ! -d "$SRC/images" ]; then
  warn "no images/ folder here yet"
  warn "run 'bash setup.sh' first, or the new site will have no pictures"
  printf '  continue anyway? [y/N] '
  read -r reply
  case "$reply" in [yY]*) ;; *) die "Stopped." ;; esac
fi

BRANCH="$(git -C "$REPO" rev-parse --abbrev-ref HEAD)"
say "Repo: $REPO   (branch: $BRANCH)"

if ! git -C "$REPO" diff --quiet || ! git -C "$REPO" diff --cached --quiet; then
  die "That repo has uncommitted changes. Commit or discard them first."
fi

# ---------------------------------------------------------------- archive
say "1 of 4   Keeping a copy of the old site"
if git -C "$REPO" show-ref --verify --quiet refs/heads/archive-old-site; then
  echo "  branch archive-old-site already exists, leaving it alone"
else
  git -C "$REPO" branch archive-old-site
  echo "  old site saved on branch: archive-old-site"
fi

# ---------------------------------------------------------------- clear
say "2 of 4   Removing the old Next.js files"
git -C "$REPO" rm -r --quiet --ignore-unmatch . >/dev/null 2>&1 || true
# untracked build output would otherwise be copied to the live site
for junk in node_modules .next out dist .vercel; do
  [ -e "$REPO/$junk" ] && rm -rf "${REPO:?}/$junk" && echo "  removed $junk"
done
echo "  old files cleared"

# ---------------------------------------------------------------- copy
say "3 of 4   Copying the new site in"
copied=0
for f in "$SRC"/*.html; do
  [ -e "$f" ] || continue
  case "$(basename "$f")" in noah-portfolio-v*) continue ;; esac
  cp "$f" "$REPO/" && copied=$((copied+1))
done
echo "  $copied pages"

if [ -d "$SRC/images" ]; then
  cp -R "$SRC/images" "$REPO/"
  echo "  $(find "$SRC/images" -type f | wc -l | tr -d ' ') images"
fi

cp "$SRC/netlify.toml" "$REPO/" 2>/dev/null && echo "  netlify.toml"

# favicons, robots, sitemap, llms.txt, 404 and anything else the site serves
site=0
for f in favicon.svg favicon-32.png apple-touch-icon.png robots.txt sitemap.xml llms.txt 404.html; do
  [ -f "$SRC/$f" ] && cp "$SRC/$f" "$REPO/" && site=$((site+1))
done
[ "$site" != "0" ] && echo "  $site site file(s)"

# vendored javascript, currently lenis.min.js for smooth scrolling
js=0
for f in "$SRC"/*.js; do
  [ -e "$f" ] || continue
  case "$(basename "$f")" in localise-assets*|audit-*) continue ;; esac
  cp "$f" "$REPO/" && js=$((js+1))
done
[ "$js" != "0" ] && echo "  $js javascript file(s)"

# the ignore file travels as gitignore.txt because a leading dot hides it
if   [ -f "$SRC/.gitignore" ];      then cp "$SRC/.gitignore"     "$REPO/.gitignore"; echo "  .gitignore"
elif [ -f "$SRC/gitignore.txt" ];   then cp "$SRC/gitignore.txt"  "$REPO/.gitignore"; echo "  .gitignore"
fi

for helper in setup.sh download-assets.sh localise-assets.py audit-resolution.py \
              assets-manifest.tsv display-widths.tsv DEPLOY.md; do
  [ -f "$SRC/$helper" ] && cp "$SRC/$helper" "$REPO/"
done
echo "  helper scripts"

# ---------------------------------------------------------------- commit
say "4 of 4   Committing"
git -C "$REPO" add -A
if git -C "$REPO" diff --cached --quiet; then
  warn "nothing changed, the repo already matches this folder"
  exit 0
fi
git -C "$REPO" commit -q -m "Replace Next.js site with new static portfolio"
echo "  committed"

BUILD="$(grep -ho '<!-- build: [^ ]* -->' "$REPO"/*.html 2>/dev/null | head -1 | sed 's/<!-- build: //;s/ -->//')"
[ -n "$BUILD" ] && echo "  build: $BUILD"

say "Done. Nothing has been pushed yet."
cat <<EOF

  Check it looks right:

    cd $REPO
    open index.html

  When you are happy, put it live:

    git push

  Then in Netlify, open Project configuration and check two things:
    1. Build command is empty or matches netlify.toml
    2. No Next.js build plugin is still installed

  The old site is still here on the branch archive-old-site.

EOF
