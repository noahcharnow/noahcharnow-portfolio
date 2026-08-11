#!/usr/bin/env python3
"""
Turn on visitor counting for the whole site.

    python3 set-analytics.py noahcharnow

Run it from the folder that holds index.html, after making a free account
at goatcounter.com. The word you pass is the site code you picked when
signing up. If your dashboard lives at noahcharnow.goatcounter.com, then
your code is noahcharnow.

Why GoatCounter: it is free, it sets no cookies, it needs no consent
banner, and the whole tracker is one small script tag. You get visitor
counts, referrers, and which pages get read, without surveilling anyone.

Safe to run again. Pages that already carry the tag are left alone, and
running it with a new code replaces the old one everywhere.
"""
import glob
import re
import sys

SNIPPET = ('<script data-goatcounter="https://%s.goatcounter.com/count" '
           'async src="//gc.zgo.at/count.js"></script>')

TAG_RE = re.compile(
    r'<script data-goatcounter="https://[^"]+/count" '
    r'async src="//gc\.zgo\.at/count\.js"></script>\n?')


def main():
    if len(sys.argv) != 2 or not re.fullmatch(r'[a-z0-9-]+', sys.argv[1]):
        sys.exit('Usage: python3 set-analytics.py your-goatcounter-code\n'
                 'The code is lowercase letters, numbers and dashes only.')

    snippet = SNIPPET % sys.argv[1]
    added = 0
    replaced = 0
    same = 0

    for path in sorted(glob.glob('*.html')):
        s = open(path, encoding='utf-8').read()
        if snippet in s:
            same += 1
            continue
        if TAG_RE.search(s):
            s = TAG_RE.sub(snippet + '\n', s, count=1)
            replaced += 1
        elif '</body>' in s:
            s = s.replace('</body>', snippet + '\n</body>', 1)
            added += 1
        else:
            print('  skipped %s, no </body> found' % path)
            continue
        open(path, 'w', encoding='utf-8').write(s)

    if added:
        print('Added the counter to %d pages' % added)
    if replaced:
        print('Replaced the old code on %d pages' % replaced)
    if same:
        print('%d pages already had this exact tag' % same)
    if added or replaced:
        print()
        print('Next:')
        print('  git add . && git commit -m "Add visitor counting" && git push')
        print('  then watch the numbers at https://%s.goatcounter.com'
              % sys.argv[1])


if __name__ == '__main__':
    main()
