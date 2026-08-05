#!/usr/bin/env python3
"""Point every page at the downloaded local assets.
Run after download-assets.sh, from the folder that holds index.html."""
import csv, glob, sys

pairs = []
with open('assets-manifest.tsv', encoding='utf-8') as fh:
    for row in csv.DictReader(fh, delimiter='\t'):
        pairs.append((row['remote_url'], row['local_path']))
pairs = sorted(set(pairs), key=lambda p: -len(p[0]))

n = 0
for f in glob.glob('*.html'):
    s = open(f, encoding='utf-8').read()
    o = s
    for remote, local in pairs:
        s = s.replace(remote, local)
    if s != o:
        open(f, 'w', encoding='utf-8').write(s)
        n += 1
print('rewrote %d files' % n)
