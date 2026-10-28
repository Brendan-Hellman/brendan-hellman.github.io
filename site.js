(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.nav-toggle');
  const closeMenu = () => { header.classList.remove('nav-open'); menu?.setAttribute('aria-expanded','false'); };
  menu?.addEventListener('click', () => {
    const open = !header.classList.contains('nav-open');
    header.classList.toggle('nav-open',open);
    menu.setAttribute('aria-expanded',String(open));
  });
  document.querySelectorAll('#site-nav a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => { if(e.key==='Escape') closeMenu(); });

  const cards = [...document.querySelectorAll('.project-card')];
  const search = document.querySelector('#project-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  let category = 'All';
  function filterProjects() {
    const query = search.value.trim().toLowerCase();
    let shown = 0;
    for(const card of cards) {
      const match = (category==='All'||card.dataset.category===category) && card.dataset.search.toLowerCase().includes(query);
      card.hidden = !match;
      if(match) shown++;
    }
    document.querySelector('#result-count').textContent = `${shown} of ${cards.length} projects${category==='All'?'':' · '+category}${query?' · “'+search.value.trim()+'”':''}`;
    document.querySelector('#empty-state').hidden = shown > 0;
  }
  if(search) {
    search.addEventListener('input',filterProjects);
    filters.forEach(button => button.addEventListener('click',()=>{
      category = button.dataset.filter;
      filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
      filterProjects();
    }));
    document.querySelector('#reset-search').addEventListener('click',()=>{search.value='';filters[0].click();search.focus();});
  }

  const imageDialog = document.querySelector('#image-dialog');
  document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
    const image = document.querySelector('#large-image');
    image.src = button.dataset.src;
    image.alt = button.dataset.caption;
    document.querySelector('#large-caption').textContent = button.dataset.caption;
    imageDialog.showModal();
    document.body.classList.add('modal-open');
  }));
  document.querySelector('.close-image')?.addEventListener('click',()=>imageDialog.close());
  imageDialog?.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  imageDialog?.addEventListener('click',e=>{
    if(e.target!==imageDialog)return;
    const r=imageDialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)imageDialog.close();
  });
})();
