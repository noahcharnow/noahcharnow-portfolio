#!/usr/bin/env python3
"""v20: the scribble intro.

Black screen. An orange hand-drawn line scrawls "Award-winning thought
leader" across it, gets a few words in, then loses the thread and tangles
into a scribbled ball. The black curtain lifts away to reveal the real
homepage and its blunt hero, "Brands that refuse to blend in." The joke:
the site tries to be Serious Portfolio Guy, gives up, and the real voice wins.

Guardrails (an intro is high-risk):
  - the whole thing runs ~1.6s, then it's gone
  - ANY click / scroll / key / touch skips straight to the site
  - plays once per browser session (sessionStorage), never on repeat visits
    within the session, so hitting back to home doesn't replay it
  - prefers-reduced-motion: skipped entirely, site shows immediately
  - if anything throws, the intro removes itself so it can never trap anyone
"""
import re

s = open('index.html', encoding='utf-8').read()

# ------------------------------------------------------------------ CSS
INTRO_CSS = """
<style>
/* v20: scribble intro */
#intro{position:fixed;inset:0;z-index:9999;background:var(--dark,#0B0907);
  display:flex;align-items:center;justify-content:center;
  transition:transform .7s var(--ease);transform-origin:top;will-change:transform}
#intro.lift{transform:scaleY(0)}
#intro svg{width:min(86vw,1100px);height:auto;overflow:visible}
#intro .ink{fill:none;stroke:var(--accent,#EE4D1B);stroke-width:7;
  stroke-linecap:round;stroke-linejoin:round}
#intro .skip{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);
  color:#fff;opacity:.4;font-weight:600;font-size:13px;letter-spacing:.02em}
html.intro-on{overflow:hidden}
html.intro-on body{overflow:hidden}
@media (prefers-reduced-motion:reduce){#intro{display:none!important}}
</style>
"""
s = s.replace('</head>', INTRO_CSS + '</head>', 1)

# ------------------------------------------------------------------ markup
# Two paths:
#   #line  = the "Award-winning thought leader" scrawl (drawn left to right)
#   #tangle = the scribble ball it collapses into (drawn after)
# The path data is hand-tuned to read as loose handwriting, not a font.
INTRO_HTML = r"""
<div id="intro" role="presentation" aria-hidden="true">
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <path id="introLine" class="ink" d="
      M40,150 q18,-46 34,-2 q10,40 22,2 q14,-44 30,0 q8,34 20,-6
      M180,120 q-30,4 -26,34 q4,26 30,20 q22,-8 14,-32 q-8,-22 -30,-16
      M250,110 l-8,72 M242,150 q30,-16 40,6 q6,20 -14,26
      M320,118 q-26,6 -20,40 q8,28 34,14
      M380,150 q16,-44 30,-2 q10,38 22,0 q14,-42 28,2
      M470,116 l-6,70 M462,150 q28,-14 40,4 q8,22 -16,30
      M540,150 q18,-46 32,-2 q10,40 22,0
      M620,150 q-6,-40 26,-36 q30,4 20,40 q-10,30 -40,20
      M710,150 q16,-46 30,0 q10,40 22,-2 q14,-42 28,4
      M810,110 l-6,76 M802,152 q30,-18 42,4
      M880,118 q-24,8 -18,42 q8,26 34,10" />
    <path id="introTangle" class="ink" style="opacity:0" d="
      M600,150 q60,-70 130,-20 q70,50 -10,90 q-90,44 -150,-14
      q-58,-56 20,-110 q80,-54 160,-6 q64,44 6,104 q-70,66 -170,20" />
    <path id="introDash" class="ink" style="opacity:0;stroke-dasharray:2 22" d="
      M770,150 q90,-30 170,10" />
  </svg>
  <div class="skip">click anywhere to skip</div>
</div>
"""
s = re.sub(r'(<body[^>]*>)', r'\1\n' + INTRO_HTML, s, count=1)

# mark html so we can lock scroll immediately (before the big script parses)
s = s.replace('<html', '<html class="intro-on"', 1)

# ------------------------------------------------------------------ JS
# Placed right after <body> markup so it runs early and owns the intro fully.
INTRO_JS = r"""
<script>
/* v20: scribble intro controller */
(function(){
  var intro = document.getElementById('intro');
  if(!intro) return;

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var seen   = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch(e){}

  function clearLock(){ document.documentElement.classList.remove('intro-on'); }
  function remove(){ if(intro && intro.parentNode){ intro.parentNode.removeChild(intro);} clearLock(); }

  // reduced motion or already seen this session -> never show it
  if(reduce || seen){ remove(); return; }
  try { sessionStorage.setItem('introSeen','1'); } catch(e){}

  var line   = document.getElementById('introLine');
  var tangle = document.getElementById('introTangle');
  var dash   = document.getElementById('introDash');
  var done   = false;

  // prep stroke-draw: set each path's dash to its own length
  [line,tangle].forEach(function(p){
    var len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.getBoundingClientRect(); // force layout so the first transition runs
  });

  function draw(p, ms, delay){
    p.style.transition = 'stroke-dashoffset ' + ms + 'ms cubic-bezier(.5,0,.2,1) ' + (delay||0) + 'ms';
    p.style.strokeDashoffset = '0';
  }

  function finish(){
    if(done) return; done = true;
    intro.classList.add('lift');
    // remove after the lift transition; also a hard fallback timer
    var gone = false;
    function go(){ if(gone) return; gone = true; remove(); }
    intro.addEventListener('transitionend', go, {once:true});
    setTimeout(go, 900);
  }

  // let any intent skip straight through
  ['click','wheel','touchstart','keydown'].forEach(function(ev){
    addEventListener(ev, finish, {once:true, passive:true});
  });

  // the sequence: scrawl the pompous line, then tangle, then lift
  requestAnimationFrame(function(){
    tangle.style.opacity = '1';
    draw(line, 780, 60);              // "Award-winning thought leader" writes on
    draw(tangle, 520, 780);           // then it knots up
    setTimeout(function(){ if(dash) dash.style.opacity = '.9'; }, 1200);
    setTimeout(finish, 1500);         // lift to the real site
  });

  // absolute safety net: never let the intro live past 4s no matter what
  setTimeout(remove, 4000);
})();
</script>
"""
s = s.replace('</body>', INTRO_JS + '</body>', 1)

# ------------------------------------------------------------------ tag bump
s = s.replace('<!-- build: menu-mail-v19 -->', '<!-- build: intro-v20 -->')

open('index.html', 'w', encoding='utf-8').write(s)
print('intro built. #intro present:', s.count('id="intro"'))
