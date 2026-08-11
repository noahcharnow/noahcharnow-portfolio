#!/usr/bin/env python3
"""
Point the whole site at a different domain.

    python3 set-domain.py https://noahcharnow.com

Run it from the folder that holds index.html.

Why this exists: canonical URLs, Open Graph URLs, the sitemap, robots.txt and
the structured data all name the site's address in full. Right now that is the
netlify.app address, because that is where the site actually answers. Pointing
a canonical at a domain that does not yet serve the site tells search engines
the wrong page is the real one, which is worse than having no canonical.

So when the custom domain goes live, run this once, push, and everything
matches. Nothing else needs touching.
"""
import glob
import re
import sys

FILES = ['*.html', 'sitemap.xml', 'robots.txt', 'llms.txt']
# every address the site has answered on, so a re-run is always safe
KNOWN = [
    'https://noahcharnow-portfolio.netlify.app',
    'https://noahcharnow.com',
    'https://www.noahcharnow.com',
]


def main():
    if len(sys.argv) != 2:
        sys.exit('Usage: python3 set-domain.py https://your-domain.com')

    new = sys.argv[1].rstrip('/')
    if not new.startswith('http'):
        sys.exit('The domain needs to start with https://')

    olds = [d for d in KNOWN if d != new]
    changed = 0
    total = 0

    for pattern in FILES:
        for path in sorted(glob.glob(pattern)):
            s = open(path, encoding='utf-8').read()
            before = s
            for old in olds:
                s = s.replace(old, new)
            if s != before:
                open(path, 'w', encoding='utf-8').write(s)
                changed += 1
                total += sum(before.count(o) for o in olds)

    if not changed:
        print('Nothing to change. Everything already points at %s' % new)
    else:
        print('Updated %d files, %d addresses, all now pointing at %s'
              % (changed, total, new))
        print()
        print('Next:')
        print('  git add . && git commit -m "Point site at %s" && git push' % new)


if __name__ == '__main__':
    main()
