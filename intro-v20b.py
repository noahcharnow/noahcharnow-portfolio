#!/usr/bin/env python3
"""v20 (take 2): the scribble intro, now legible.

Black screen. In an orange handwriting font, "Award-winning thought leader"
writes itself on, left to right, like a hand scrawling it. Just as it lands,
an orange line scribbles the whole thing out in a tangle, the black curtain
lifts, and the real hero shows: "Brands that refuse to blend in."

The words are real text in a self-hosted handwriting font (Caveat), revealed
with a left-to-right wipe so it reads as being written. The scribble-out is
an SVG path drawn over the top. Legible joke, hand-drawn feel.

Guardrails: ~1.8s total, any click/scroll/key skips, once per session,
reduced-motion skips entirely, hard 4s safety removal.
"""
import re

s = open('index.html', encoding='utf-8').read()

# ------------------------------------------------------------------ font + CSS
INTRO_CSS = """
<style>
/* v20: handwriting font for the intro */
@font-face{font-family:'Caveat';font-weight:600;font-style:normal;font-display:block;src:url('fonts/caveat-600.woff2') format('woff2')}

/* v20: scribble intro */
#intro{position:fixed;inset:0;z-index:9999;background:var(--dark,#0B0907);
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  transition:transform .7s var(--ease);transform-origin:top;will-change:transform}
#intro.lift{transform:scaleY(0)}
#intro .stage{position:relative;width:min(88vw,900px);text-align:center}
#intro .said{font-family:'Caveat',cursive;font-weight:600;color:var(--accent,#EE4D1B);
  font-size:clamp(40px,7.5vw,104px);line-height:1.05;white-space:nowrap;
  /* write-on: reveal left to right by animating a clip */
  clip-path:inset(0 100% 0 0);will-change:clip-path}
#intro .said.write{animation:intro-write .9s cubic-bezier(.4,0,.2,1) .15s forwards}
@keyframes intro-write{to{clip-path:inset(0 0 0 0)}}
#intro .scratch{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
#intro .scratch path{fill:none;stroke:var(--accent,#EE4D1B);stroke-width:9;
  stroke-linecap:round;stroke-linejoin:round}
#intro .skip{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);
  color:#fff;opacity:.35;font-weight:600;font-size:13px;letter-spacing:.02em;font-family:'General Sans',sans-serif}
html.intro-on,html.intro-on body{overflow:hidden}
@media (prefers-reduced-motion:reduce){#intro{display:none!important}}
</style>
"""
s = s.replace('</head>', INTRO_CSS + '</head>', 1)

# ------------------------------------------------------------------ markup
INTRO_HTML = r"""
<div id="intro" role="presentation" aria-hidden="true">
  <div class="stage">
    <div class="said" id="introSaid">Award-winning thought leader</div>
    <svg class="scratch" id="introScratch" viewBox="0 0 900 160" preserveAspectRatio="none" aria-hidden="true">
      <path id="introScratchPath" d="M20,90 q120,-70 240,-8 q120,62 250,-2 q130,-64 250,6 q90,50 120,-10 q40,-80 -80,-52 q-150,36 -60,96 q70,46 180,10" />
    </svg>
  </div>
  <div class="skip">click anywhere to skip</div>
</div>
"""
s = re.sub(r'(<body[^>]*>)', r'\1\n' + INTRO_HTML, s, count=1)
s = s.replace('<html', '<html class="intro-on"', 1)

# ------------------------------------------------------------------ JS
INTRO_JS = r"""
<script>
/* v20: scribble intro controller */
(function(){
  var intro = document.getElementById('intro');
  if(!intro) return;

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch(e){}

  function clearLock(){ document.documentElement.classList.remove('intro-on'); }
  function remove(){ if(intro && intro.parentNode) intro.parentNode.removeChild(intro); clearLock(); }

  if(reduce || seen){ remove(); return; }
  try { sessionStorage.setItem('introSeen','1'); } catch(e){}

  var said = document.getElementById('introSaid');
  var path = document.getElementById('introScratchPath');
  var done = false;

  // prep the scratch-out stroke draw
  var len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  path.getBoundingClientRect();

  function finish(){
    if(done) return; done = true;
    intro.classList.add('lift');
    var gone = false; function go(){ if(gone)return; gone=true; remove(); }
    intro.addEventListener('transitionend', go, {once:true});
    setTimeout(go, 900);
  }

  ['click','wheel','touchstart','keydown'].forEach(function(ev){
    addEventListener(ev, finish, {once:true, passive:true});
  });

  // sequence: write the line on, then scratch it out, then lift
  requestAnimationFrame(function(){
    said.classList.add('write');               // 0.15s delay + 0.9s write
    setTimeout(function(){                      // once written, scratch it out
      path.style.transition = 'stroke-dashoffset .55s cubic-bezier(.5,0,.4,1)';
      path.style.strokeDashoffset = '0';
    }, 1050);
    setTimeout(finish, 1650);                   // lift to the real site
  });

  setTimeout(remove, 4000);                     // absolute safety net
})();
</script>
"""
s = s.replace('</body>', INTRO_JS + '</body>', 1)

s = s.replace('<!-- build: menu-mail-v19 -->', '<!-- build: intro-v20 -->')
open('index.html', 'w', encoding='utf-8').write(s)
print('intro rebuilt with legible handwriting.')
