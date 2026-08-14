#!/usr/bin/env python3
"""v19: build the missing menu overlay, make the email copy-to-clipboard.

Two homepage bugs:
  1. the Menu pill links to #menuOv, which never existed -> click did nothing.
     Build a real full-screen overlay with links to Work, About, Contact and
     the socials, opened/closed with no dependency on a mail app or anything else.
  2. the footer email is a bare mailto: -> does nothing for visitors with no
     mail app set up (most Gmail-in-browser users). Keep the mailto for those
     who have mail, but also copy the address to the clipboard on click and
     show a quick "Copied" confirmation, so the click always does something.
"""
import re

s = open('index.html', encoding='utf-8').read()

# ---------------------------------------------------------------- 1. menu CSS
MENU_CSS = """
<style>
/* v19: menu overlay */
.menu-ov{position:fixed;inset:0;z-index:200;background:var(--ink);color:var(--white);
  display:flex;flex-direction:column;justify-content:center;padding:0 var(--gutter,6vw);
  opacity:0;visibility:hidden;transition:opacity .5s var(--ease),visibility .5s var(--ease)}
.menu-ov.open{opacity:1;visibility:visible}
.menu-ov ul{list-style:none;margin:0;padding:0}
.menu-ov li{overflow:hidden}
.menu-ov a{display:inline-block;color:var(--white);text-decoration:none;
  font-weight:var(--w-display,600);font-size:clamp(44px,9vw,150px);line-height:1.02;
  letter-spacing:-.04em;transition:color .35s var(--ease),transform .6s var(--ease);
  transform:translateY(110%)}
.menu-ov.open a{transform:translateY(0)}
.menu-ov li:nth-child(1) a{transition-delay:.06s}
.menu-ov li:nth-child(2) a{transition-delay:.12s}
.menu-ov li:nth-child(3) a{transition-delay:.18s}
.menu-ov a:hover{color:var(--accent)}
.menu-ov .menu-foot{margin-top:clamp(34px,6vh,70px);display:flex;gap:28px;flex-wrap:wrap;
  opacity:0;transition:opacity .5s var(--ease) .28s}
.menu-ov.open .menu-foot{opacity:1}
.menu-ov .menu-foot a{font-size:clamp(15px,1vw,20px);font-weight:600;letter-spacing:0;
  transform:none;color:var(--white);opacity:.7}
.menu-ov .menu-foot a:hover{opacity:1;color:var(--accent)}
.menu-close{position:absolute;top:clamp(20px,3vh,40px);right:var(--gutter,6vw);
  background:none;border:0;cursor:pointer;color:var(--white);
  font-weight:600;font-size:clamp(15px,1vw,20px);padding:12px;min-height:44px}
.menu-close:hover{color:var(--accent)}
@media (prefers-reduced-motion:reduce){
  .menu-ov,.menu-ov a,.menu-ov .menu-foot{transition-duration:.001ms}
  .menu-ov a{transform:none}
}
/* v19: copied toast */
.copied-toast{position:fixed;left:50%;bottom:36px;transform:translate(-50%,20px);
  background:var(--ink);color:var(--white);padding:12px 22px;border-radius:100px;
  font-weight:600;font-size:15px;z-index:300;opacity:0;pointer-events:none;
  transition:opacity .3s var(--ease),transform .3s var(--ease)}
.copied-toast.show{opacity:1;transform:translate(-50%,0)}
</style>
"""
s = s.replace('</head>', MENU_CSS + '</head>', 1)

# ---------------------------------------------------------------- 2. overlay markup
OVERLAY = """
<div class="menu-ov" id="menuOv" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
  <button class="menu-close" id="menuClose" aria-label="Close menu">Close</button>
  <ul>
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="menu-foot">
    <a href="https://www.linkedin.com/in/noahcharnow">LinkedIn</a>
    <a href="https://www.etsy.com/shop/ipfreelyart">Etsy</a>
    <a href="mailto:noahcharnow@gmail.com" class="mail-copy" data-email="noahcharnow@gmail.com">noahcharnow@gmail.com</a>
  </div>
</div>
<div class="copied-toast" id="copiedToast" role="status" aria-live="polite">Copied to clipboard</div>
"""
# put it right after <body ...>
s = re.sub(r'(<body[^>]*>)', r'\1\n' + OVERLAY, s, count=1)

# ---------------------------------------------------------------- 3. tag the footer email so JS can enhance it
s = s.replace(
  '<a class="mail rv" href="mailto:noahcharnow@gmail.com">noahcharnow@gmail.com</a>',
  '<a class="mail rv mail-copy" href="mailto:noahcharnow@gmail.com" data-email="noahcharnow@gmail.com">noahcharnow@gmail.com</a>',
  1)

# ---------------------------------------------------------------- 4. JS
MENU_JS = """
<script>
/* v19: menu open/close + copy-email */
(function(){
  var ov = document.getElementById('menuOv');
  var btn = document.querySelector('.pill.menu');
  var closeBtn = document.getElementById('menuClose');
  var toast = document.getElementById('copiedToast');

  function openMenu(e){ if(e)e.preventDefault(); ov.classList.add('open');
    ov.setAttribute('aria-hidden','false'); if(btn)btn.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden'; }
  function closeMenu(){ ov.classList.remove('open');
    ov.setAttribute('aria-hidden','true'); if(btn)btn.setAttribute('aria-expanded','false');
    document.body.style.overflow=''; }

  if(btn) btn.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  // click any menu link -> close, let the anchor jump happen
  ov.querySelectorAll('ul a').forEach(function(a){
    a.addEventListener('click', function(){ setTimeout(closeMenu, 10); });
  });
  // Escape closes
  addEventListener('keydown', function(e){ if(e.key==='Escape' && ov.classList.contains('open')) closeMenu(); });

  /* copy-email: keep the mailto working for those who have mail, but ALSO
     copy the address and confirm, so the click always does something */
  var toastTimer;
  function showToast(){ if(!toast)return; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(function(){toast.classList.remove('show');},1800); }
  document.querySelectorAll('.mail-copy').forEach(function(a){
    a.addEventListener('click', function(e){
      var email = a.getAttribute('data-email');
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(email).then(showToast, function(){});
      }
      /* we do NOT preventDefault: if they have a mail app, it still opens.
         if they don't, the copy + toast is the useful fallback. */
    });
  });
})();
</script>
"""
s = s.replace('</body>', MENU_JS + '</body>', 1)

# ---------------------------------------------------------------- 5. tag bump
s = s.replace('<!-- build: fonts-live-v18 -->', '<!-- build: menu-mail-v19 -->')

open('index.html', 'w', encoding='utf-8').write(s)
print('index.html: menu overlay + copy-email added')
print('menuOv present:', s.count('id="menuOv"'))
print('mail-copy links:', s.count('mail-copy'))
