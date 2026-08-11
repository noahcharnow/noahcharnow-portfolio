#!/usr/bin/env python3
"""One pass: wipe transitions, grid hover motion, next-project peek, motion guards."""
import re, glob, sys

EASE = 'cubic-bezier(.77,0,.18,1)'

# ------------------------------------------------------------------ shared CSS
VT_CSS = """
<style>
/* ---- cross-page transition: the black wipe, made real (alive-v13) ----
   The signature move of the site is white home / black case studies.
   Until now that flip happened during a blank browser load. With the
   View Transitions API the new page wipes up over the old one, and the
   cover you clicked morphs into the case study hero. Browsers without
   support simply navigate normally. */
@view-transition{navigation:auto}
@media (prefers-reduced-motion:no-preference){
  ::view-transition-old(root){animation:none}
  ::view-transition-new(root){animation:vt-wipe .64s %EASE% both}
  @keyframes vt-wipe{from{clip-path:inset(100%% 0 0 0)}to{clip-path:inset(0 0 0 0)}}
  ::view-transition-group(pf-hero){animation-duration:.64s;animation-timing-function:%EASE%;z-index:2}
  ::view-transition-old(pf-hero),::view-transition-new(pf-hero){height:100%%;width:100%%;object-fit:cover;overflow:hidden}
}
</style>
""".replace('%EASE%', EASE).replace('%%', '%')

# ------------------------------------------------------------------ index bits
INDEX_CSS = """
<style>
/* ---- work grid comes alive on hover (alive-v13) ----
   The old zoom rule targeted `.media i`, an element the cards never had,
   so hover has been dead since grid-v3. These rules target what is
   actually there. Three cards also carry a muted film that plays on
   hover; it loads nothing until the cursor arrives. */
.card .media img,.card .media video{transition:transform 1.1s var(--ease)}
.card:hover .media img,.card:hover .media video{transform:scale(1.045)}
.card .media .hovervid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s var(--ease),transform 1.1s var(--ease)}
.card .media .hovervid.on{opacity:1}
@media (prefers-reduced-motion:reduce),(hover:none){
  .card:hover .media img,.card:hover .media video{transform:none}
  .card .media .hovervid{display:none}
}
</style>
"""

INDEX_JS = """
<script>
/* alive-v13: hover films + the wipe, home side */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* films play only for a real cursor, never for touch or reduced motion */
  if(!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.card .hovervid').forEach(function(v){
      var card=v.closest('.card');
      card.addEventListener('mouseenter',function(){
        v.classList.add('on');
        var p=v.play(); if(p&&p.catch)p.catch(function(){});
      });
      card.addEventListener('mouseleave',function(){
        v.classList.remove('on'); v.pause();
      });
    });
  }

  /* the clicked cover morphs into the case study hero. If the card is
     offscreen (back-navigation after scrolling) we skip the morph and
     let the wipe carry the change alone. */
  function cardFor(url){
    try{
      var f=new URL(url,location.href).pathname.split('/').pop();
      return document.querySelector('.card[href="'+f+'"]');
    }catch(e){return null}
  }
  function arm(a){
    if(!a)return null;
    var r=a.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)return null;
    var m=a.querySelector('.media');
    if(m)m.style.viewTransitionName='pf-hero';
    return m;
  }
  if(!reduce){
    addEventListener('pageswap',function(e){
      if(e.viewTransition&&e.activation)arm(cardFor(e.activation.entry.url));
    });
    addEventListener('pagereveal',function(e){
      if(!e.viewTransition)return;
      if(typeof navigation==='undefined'||!navigation.activation||!navigation.activation.from)return;
      var m=arm(cardFor(navigation.activation.from.url));
      if(m)e.viewTransition.finished.finally(function(){m.style.viewTransitionName='none'});
    });
  }
})();
</script>
"""

# ------------------------------------------------------------- case page bits
CASE_CSS = """
<style>
/* ---- end of a case study pulls you into the next one (alive-v13) ----
   The old pager was an exit. This is a pull: the next project's cover
   sits at the foot of the page, grows as you reach it, and the whole
   block is one link that wipes straight into that case study. */
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
    /* arriving: the cover that was clicked lands as this hero */
    addEventListener('pagereveal',function(e){
      if(!e.viewTransition)return;
      var m=document.getElementById('heroMedia');
      if(!m)return;
      m.style.viewTransitionName='pf-hero';
      e.viewTransition.finished.finally(function(){m.style.viewTransitionName='none'});
    });
    /* leaving: back to home the hero morphs to its card, onward the
       peek cover morphs into the next hero */
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

  /* the peek grows and brightens as it enters the viewport */
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

  /* arrow keys move between projects */
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

HOVERVIDS = {
    'mclaren-case-study.html':   'images/index/mclaren-hero-890639.mp4',
    'pride-2024-case-study.html':'images/pride-2024/welcome-all-4d8638.mp4',
    'huckberry-case-study.html': 'images/huckberry/inline-film.mp4',
}

# ---------------------------------------------------------------- do the work
def inject(s, css, js):
    s = s.replace('</head>', css + '</head>', 1)
    s = s.replace('</body>', js + '</body>', 1)
    return s

# card map from index: href -> (cover, aria-label)
idx = open('index.html', encoding='utf-8').read()
cards = dict(
    (h, (img, label)) for h, label, img in
    re.findall(r'<a class="card card--eq" href="([^"]+)" aria-label="([^"]+)"'
               r'[^>]*><div class="media rv"><img src="([^"]+)"', idx)
)
assert len(cards) == 13, f'expected 13 cards, found {len(cards)}'

# 1. index: hover videos into the three film cards, then CSS + JS
for href, vid in HOVERVIDS.items():
    cover = cards[href][0]
    old = f'<a class="card card--eq" href="{href}"'
    i = idx.find(old)
    assert i >= 0, href
    j = idx.find('</div><div class="cap">', i)
    tag = (f'<video class="hovervid" muted loop playsinline preload="none" '
           f'src="{vid}" poster="{cover}" aria-hidden="true" tabindex="-1"></video>')
    idx = idx[:j] + tag + idx[j:]
idx = inject(idx, VT_CSS + INDEX_CSS, INDEX_JS)
open('index.html', 'w', encoding='utf-8').write(idx)
print('index.html: 3 hover films, wipe wired')

# 2. case pages: peek replaces pager, then CSS + JS
pager_re = re.compile(
    r'<div class="wrap"><div class="pager">\s*'
    r'<a href="([^"]+)"><small>Previous</small><h3>([^<]+)</h3></a>\s*'
    r'<a class="r" href="([^"]+)"><small>Next</small><h3>([^<]+)</h3></a>\s*'
    r'</div></div>', re.S)

for path in sorted(glob.glob('*-case-study.html')):
    s = open(path, encoding='utf-8').read()
    m = pager_re.search(s)
    assert m, f'no pager found in {path}'
    prev_href, prev_t, next_href, next_t = m.groups()
    cover = cards[next_href][0]
    peek = f'''<div class="wrap"><div class="pnav">
  <a href="{prev_href}"><small>Previous</small><h3>{prev_t}</h3></a>
</div></div>
<a class="peek" href="{next_href}" aria-label="Next project: {next_t}">
  <div class="wrap">
    <small class="peek-k">Next project</small>
    <h2 class="peek-t">{next_t}</h2>
  </div>
  <div class="peek-media"><img src="{cover}" alt="{next_t}" loading="lazy"></div>
</a>'''
    s = s[:m.start()] + peek + s[m.end():]
    s = inject(s, VT_CSS + CASE_CSS, CASE_JS)
    open(path, 'w', encoding='utf-8').write(s)
    print(f'{path}: peek -> {next_t}')

# 3. 404 gets the transition CSS so wiping out of it works too
s = open('404.html', encoding='utf-8').read()
s = s.replace('</head>', VT_CSS + '</head>', 1)
open('404.html', 'w', encoding='utf-8').write(s)

# 4. tag bump
n = 0
for path in glob.glob('*.html'):
    s = open(path, encoding='utf-8').read()
    if '<!-- build: dates-fonts-v12 -->' in s:
        s = s.replace('<!-- build: dates-fonts-v12 -->', '<!-- build: alive-v13 -->')
        open(path, 'w', encoding='utf-8').write(s)
        n += 1
print(f'tag bumped on {n} pages')
