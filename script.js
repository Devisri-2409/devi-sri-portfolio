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
