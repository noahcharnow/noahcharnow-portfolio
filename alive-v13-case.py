#!/usr/bin/env python3
"""Case pages: rebuild prev/next from the grid order, install the peek, wire the wipe.

The old pagers disagreed with each other: some pages pointed at '#', some
labels named a different project than their link, two pages had half a
pager. The homepage grid order is the one sequence Noah actually curated,
so every page's Previous and Next are rebuilt from it, wrapping at the ends.
"""
import re, glob

EASE = 'cubic-bezier(.77,0,.18,1)'
MARK = 'alive-v13'

VT_CSS = """
<style>
/* ---- cross-page transition: the black wipe, made real (alive-v13) ---- */
@view-transition{navigation:auto}
@media (prefers-reduced-motion:no-preference){
  ::view-transition-old(root){animation:none}
  ::view-transition-new(root){animation:vt-wipe .64s EASE both}
  @keyframes vt-wipe{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}
  ::view-transition-group(pf-hero){animation-duration:.64s;animation-timing-function:EASE;z-index:2}
  ::view-transition-old(pf-hero),::view-transition-new(pf-hero){height:100%;width:100%;object-fit:cover;overflow:hidden}
}
</style>
""".replace('EASE', EASE)

CASE_CSS = """
<style>
/* ---- end of a case study pulls you into the next one (alive-v13) ---- */
.pnav{border-top:1px solid rgba(240,236,228,.16);margin-top:clamp(50px,8vh,110px);padding:clamp(28px,4vh,56px) 0 0}
.pnav a{display:inline-flex;flex-direction:column;min-height:48px;justify-content:center}
.pnav a small{display:block;font-size:clamp(13px,.9vw,22px);font-weight:600;color:var(--accent);margin-bottom:8px}
.pnav a h3{font-weight:var(--w-display);font-size:clamp(20px,2vw,44px);line-height:.94;letter-spacing:-.045em;transition:color .4s var(--ease)}
.pnav a:hover h3{color:var(--accent)}
.peek{display:block;padding-top:clamp(44px,7vh,110px)}
.peek .wrap{margin-bottom:clamp(22px,3vh,44px)}
.peek-k{display:block;color:var(--accent);font-weight:600;font-size:clamp(13px,.9vw,22px);margin-bottom:clamp(10px,1vw,20px)}
.peek-t{font-weight:var(--w-display);font-size:clamp(44px,7.4vw,170px);line-height:.92;letter-spacing:-.055em;color:var(--cream);transition:color .4s var(--ease)}
.peek:hover .peek-t{color:var(--accent)}
.peek-media{height:min(58vh,640px);overflow:hidden;transform-origin:center bottom;will-change:transform}
.peek-media img{width:100%;height:100%;object-fit:cover;display:block}
@media (prefers-reduced-motion:reduce){.peek-media{transform:none!important;opacity:1!important}}
</style>
"""

CASE_JS = """
<script>
/* alive-v13: hero morph, next-project pull, arrow keys */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  if(!reduce){
    addEventListener('pagereveal',function(e){
      if(!e.viewTransition)return;
      var m=document.getElementById('heroMedia');
      if(!m)return;
      m.style.viewTransitionName='pf-hero';
      e.viewTransition.finished.finally(function(){m.style.viewTransitionName='none'});
    });
    addEventListener('pageswap',function(e){
      if(!e.viewTransition||!e.activation)return;
      var f;try{f=new URL(e.activation.entry.url).pathname.split('/').pop()}catch(err){return}
      if(f===''||f==='index.html'){
        var m=document.getElementById('heroMedia');
        if(m){var r=m.getBoundingClientRect();
          if(r.bottom>0&&r.top<innerHeight)m.style.viewTransitionName='pf-hero';}
      }else{
        var p=document.querySelector('.peek[href="'+f+'"] .peek-media');
        if(p){var pr=p.getBoundingClientRect();
          if(pr.bottom>0&&pr.top<innerHeight)p.style.viewTransitionName='pf-hero';}
      }
    });
  }

  var pk=document.querySelector('.peek-media');
  if(pk&&!reduce){
    var ticking=false;
    function upd(){
      ticking=false;
      var r=pk.getBoundingClientRect();
      var p=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight*.9)));
      pk.style.transform='scale('+(.94+.06*p).toFixed(4)+')';
      pk.style.opacity=(.55+.45*p).toFixed(3);
    }
    addEventListener('scroll',function(){
      if(!ticking){ticking=true;requestAnimationFrame(upd);}
    },{passive:true});
    addEventListener('resize',upd);
    upd();
  }

  addEventListener('keydown',function(e){
    if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;
    var t=e.target&&e.target.tagName;
    if(t==='INPUT'||t==='TEXTAREA')return;
    if(e.key==='ArrowLeft'){
      var a=document.querySelector('.pnav a');
      if(a)location.href=a.getAttribute('href');
    }
    if(e.key==='ArrowRight'){
      var n=document.querySelector('.peek');
      if(n)location.href=n.getAttribute('href');
    }
  });
})();
</script>
"""

# canonical chain = homepage grid order
idx = open('index.html', encoding='utf-8').read()
cards = re.findall(r'<a class="card card--eq" href="([^"]+)" aria-label="([^"]+)"'
                   r'[^>]*><div class="media rv"><img src="([^"]+)"', idx)
assert len(cards) == 13, f'expected 13 cards, found {len(cards)}'
order = [c[0] for c in cards]
title = {c[0]: c[1] for c in cards}
cover = {c[0]: c[2] for c in cards}

pager_div = re.compile(r'<div class="pager">.*?</div>', re.S)

for path in sorted(glob.glob('*-case-study.html')):
    s = open(path, encoding='utf-8').read()
    if MARK in s:
        print(f'{path}: already done, skipped')
        continue
    i = order.index(path)
    prev_h, next_h = order[i-1], order[(i+1) % len(order)]

    m = pager_div.search(s)
    assert m, f'no pager div in {path}'
    # the peek goes before the wrap that held the pager, so it can run full bleed
    w = s.rfind('<div class="wrap">', 0, m.start())
    assert w >= 0, f'no enclosing wrap in {path}'

    peek = f'''<div class="wrap"><div class="pnav">
  <a href="{prev_h}"><small>&larr; Previous</small><h3>{title[prev_h]}</h3></a>
</div></div>
<a class="peek" href="{next_h}" aria-label="Next project: {title[next_h]}">
  <div class="wrap">
    <small class="peek-k">Next project</small>
    <h2 class="peek-t">{title[next_h]}</h2>
  </div>
  <div class="peek-media"><img src="{cover[next_h]}" alt="{title[next_h]}" loading="lazy"></div>
</a>
'''
    s = s[:m.start()] + s[m.end():]          # drop the broken pager
    s = s[:w] + peek + s[w:]                 # peek lands before that wrap
    s = s.replace('</head>', VT_CSS + CASE_CSS + '</head>', 1)
    s = s.replace('</body>', CASE_JS + '</body>', 1)
    open(path, 'w', encoding='utf-8').write(s)
    print(f'{path}: prev={title[prev_h]}  peek={title[next_h]}')

# 404 wipes too
s = open('404.html', encoding='utf-8').read()
if MARK not in s:
    s = s.replace('</head>', VT_CSS + '</head>', 1)
    open('404.html', 'w', encoding='utf-8').write(s)
    print('404.html: wipe wired')

# tag bump
n = 0
for path in glob.glob('*.html'):
    s = open(path, encoding='utf-8').read()
    if '<!-- build: dates-fonts-v12 -->' in s:
        s = s.replace('<!-- build: dates-fonts-v12 -->', '<!-- build: alive-v13 -->')
        open(path, 'w', encoding='utf-8').write(s)
        n += 1
print(f'tag bumped on {n} pages')
