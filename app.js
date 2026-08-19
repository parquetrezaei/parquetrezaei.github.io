
(() => {
  const body = document.body;
  const wrap = document.getElementById('drawerWrap');
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMenu');
  const overlay = document.getElementById('drawerOverlay');
  const lightBtn = document.getElementById('lightBtn');
  const darkBtn = document.getElementById('darkBtn');

  function openMenu(){
    wrap?.classList.add('open');
    wrap?.setAttribute('aria-hidden','false');
    body.style.overflow='hidden';
  }
  function closeMenu(){
    wrap?.classList.remove('open');
    wrap?.setAttribute('aria-hidden','true');
    body.style.overflow='';
  }
  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.drawer nav a').forEach(a => a.addEventListener('click', closeMenu));

  function setTheme(theme){
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    lightBtn?.classList.toggle('active', !dark);
    darkBtn?.classList.toggle('active', dark);
    try { localStorage.setItem('parquet-theme', theme); } catch(e){}
  }
  let saved = 'light';
  try { saved = localStorage.getItem('parquet-theme') || 'light'; } catch(e){}
  setTheme(saved);
  lightBtn?.addEventListener('click',()=>setTheme('light'));
  darkBtn?.addEventListener('click',()=>setTheme('dark'));

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImage');
  const lbClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.zoomable').forEach(img=>{
    img.addEventListener('click',()=>{
      lbImg.src=img.src; lbImg.alt=img.alt;
      lb.classList.add('open'); body.style.overflow='hidden';
    });
  });
  function closeLB(){lb?.classList.remove('open');body.style.overflow=''}
  lbClose?.addEventListener('click',closeLB);
  lb?.addEventListener('click',e=>{if(e.target===lb)closeLB()});

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();
