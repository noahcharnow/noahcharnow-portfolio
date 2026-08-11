#!/usr/bin/env python3
"""alive-v15: scroll seamlessly into the next project.

Adds an auto-wipe that fires once the visitor scrolls ~75% into the peek
block, on desktop only, with every escape hatch intact:

  - only fires scrolling DOWN, never fights a scroll-up
  - only on fine-pointer, wide (>760px), no reduced-motion
  - fires once, then locks until you scroll back out (no thrashing)
  - "All work", Escape, browser back all still work untouched
  - back button returns you to the exact scroll spot, because the wipe
    is a same-document swap (View Transition + history), not a reload

Falls back to the plain click-and-wipe on any browser without the APIs.
"""
import glob
import re

MARK = 'alive-v15'

# The auto-pull script. Sits AFTER the existing v13 case script so its
# helpers exist. Guarded so it only augments pages that have a peek.
AUTOPULL_JS = """
<script>
/* alive-v15: scroll into the next project (desktop, escapable) */
(function(){
  var peek = document.querySelector('.peek');
  if(!peek) return;

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine   = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var wide   = function(){ return innerWidth > 760; };

  /* mobile / reduced-motion / touch: leave the peek as a plain tap target */
  if(reduce || !fine){ return; }

  var href = peek.getAttribute('href');
  if(!href) return;

  /* only same-document View-Transition navigations can restore scroll and
     avoid a reload flash. If the browser can't do it, do nothing here and
     let the normal click-and-wipe handle it. */
  var canSwap = ('startViewTransition' in document) &&
                (typeof navigation !== 'undefined') &&
                navigation.navigate;
  if(!canSwap) return;

  var lastY = scrollY;
  var armed = true;      /* becomes false after firing, until we scroll out */
  var firing = false;

  function progress(){
    /* how far the peek has entered: 0 when its top hits the bottom of the
       viewport, 1 when the peek fills the viewport */
    var r = peek.getBoundingClientRect();
    var entered = innerHeight - r.top;          /* px of peek past the fold */
    return Math.min(1, Math.max(0, entered / innerHeight));
  }

  function onScroll(){
    var y = scrollY;
    var down = y > lastY;
    lastY = y;

    if(!wide()){ return; }

    var p = progress();

    /* re-arm only after the visitor has clearly backed out of the peek,
       so a fired-then-hovering state never re-triggers */
    if(p < 0.35){ armed = true; }

    /* THE PULL: 75% in, moving down, armed, not already going */
    if(armed && !firing && down && p >= 0.75){
      armed = false;
      go();
    }
  }

  function go(){
    firing = true;
    /* tag the peek image so it morphs into the next hero, same as a click */
    var media = peek.querySelector('.peek-media');
    if(media) media.style.viewTransitionName = 'pf-hero';
    /* a real navigation keeps history intact -> back returns to this spot */
    try{
      navigation.navigate(href, {history:'push'});
    }catch(e){
      /* last-ditch fallback: normal navigation */
      location.href = href;
    }
  }

  addEventListener('scroll', function(){
    requestAnimationFrame(onScroll);
  }, {passive:true});
})();
</script>
"""


def patch(path):
    s = open(path, encoding='utf-8').read()
    if MARK in s:
        return 'skip'
    # insert right before the closing </body>, after the v13 script
    if '</body>' not in s:
        return 'nobody'
    s = s.replace('</body>', AUTOPULL_JS + '</body>', 1)
    # bump the tag
    s = re.sub(r'<!-- build: alive-v1[34] -->', '<!-- build: ' + MARK + ' -->', s)
    open(path, 'w', encoding='utf-8').write(s)
    return 'ok'


done = []
for p in sorted(glob.glob('*-case-study.html')):
    r = patch(p)
    done.append((p, r))
    print(f'{p}: {r}')

# bump tag on the non-case pages too so the whole site reads v15
for p in ['index.html', '404.html']:
    s = open(p, encoding='utf-8').read()
    if re.search(r'<!-- build: alive-v1[34] -->', s):
        s = re.sub(r'<!-- build: alive-v1[34] -->', '<!-- build: ' + MARK + ' -->', s)
        open(p, 'w', encoding='utf-8').write(s)
        print(f'{p}: tag bumped')
