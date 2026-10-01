const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('#nav');
const navLinks=document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click',()=>{
  const isOpen=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(isOpen));
});

navLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  });
});

const sections=[...document.querySelectorAll('main section[id]')];
const sectionLinks=[...document.querySelectorAll('.nav-link[href^="#"]')];

const updateActiveLink=()=>{
  const scrollPosition=window.scrollY+180;
  let current='home';

  sections.forEach(section=>{
    if(scrollPosition>=section.offsetTop){
      current=section.id;
    }
  });

  sectionLinks.forEach(link=>{
    link.classList.toggle('active',link.getAttribute('href')===`#${current}`);
  });
};

window.addEventListener('scroll',updateActiveLink,{passive:true});
window.addEventListener('load',updateActiveLink);

const certificateButtons=document.querySelectorAll('.certificate-image-btn');
if(certificateButtons.length){
  const modal=document.createElement('div');
  modal.className='certificate-modal';
  modal.hidden=true;
  modal.innerHTML='<button class="certificate-modal-close" type="button" aria-label="Close certificate">×</button><img alt="Certificate preview">';
  document.body.appendChild(modal);
  const modalImage=modal.querySelector('img');
  const closeModal=()=>{modal.hidden=true;document.body.style.overflow='';};
  certificateButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      modalImage.src=button.dataset.certificate;
      modalImage.alt=button.querySelector('img')?.alt||'Certificate preview';
      modal.hidden=false;
      document.body.style.overflow='hidden';
    });
  });
  modal.querySelector('.certificate-modal-close').addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal) closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden) closeModal();});
}
