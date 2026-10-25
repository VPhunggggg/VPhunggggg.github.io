const projects = {
  thinkmed: {
    demo:'https://www.youtube.com/watch?v=9Z_5Q1DSq1U',
    type:'MULTIMODAL EDGE AI · TEAM PROJECT', title:'ThinkMed',
    lead:'A multimodal AI kiosk for dermatology screening, contextual medical information, Vietnamese voice interaction, and patient queue management.',
    challenge:'Connect several AI and software components into a single kiosk experience while keeping the interaction understandable and medically cautious.',
    approach:'A vision pipeline and quality checks work alongside medical retrieval, speech interaction, and queue routing. Developed with the TechCool team. My contribution: team lead, computer vision, and Jetson optimization.',
    tags:['YOLOv11','PyTorch','RAG','ChromaDB','Jetson Orin Nano','Python'],
    url:'https://github.com/VPhunggggg/thinkmed-multimodal-dermatology-ai'
  },
  sheetreason: {
    type:'LANGUAGE & DATA REASONING', title:'SheetReason',
    lead:'Question answering for spreadsheet data with execution-backed evidence rather than unsupported text answers.',
    challenge:'Spreadsheet questions often need calculations and verifiable answers, not just plausible generated text.',
    approach:'Generate candidate analysis paths, execute Python to obtain evidence, validate answer formatting, and compare candidates before returning a response.',
    tags:['LLM','Excel','Python','Validation','Candidate voting'],
    url:'https://github.com/VPhunggggg/sheetreason-excel-qa'
  },
  examguard: {
    type:'VISION & MONITORING', title:'ExamGuard',
    lead:'A system for detecting phones and potential phone-use in exam monitoring workflows.',
    challenge:'Support multiple inputs — individual images, videos, and live cameras — while keeping decisions reviewable by people.',
    approach:'YOLO-based visual detection, a Flask API, and a React / TypeScript interface that connects results to a human review workflow.',
    tags:['YOLO','Flask','React','TypeScript','Video'],
    url:'https://github.com/VPhunggggg/examguard-phone-detection'
  },
  pigcounter: {
    type:'TRACKING & EVENT LOGIC', title:'PigCounter',
    lead:'Bidirectional counting from video streams, connecting object tracks to directional gate events.',
    challenge:'A detection per frame is not a reliable unique count. Object identity and crossing direction matter.',
    approach:'Combine YOLO detections, ByteTrack, and configurable dual-gate logic; expose outputs in a web interface and export CSV reports.',
    tags:['YOLO','ByteTrack','Video / RTSP','CSV','Tracking'],
    url:'https://github.com/VPhunggggg/pigcounter-yolo-tracking'
  },
  chess: {
    type:'SEARCH & STRATEGY', title:'Chess Edition',
    lead:'An offline desktop chess application with a custom computer opponent.',
    challenge:'Build a playable game experience while implementing and controlling a search-based chess opponent.',
    approach:'Python and Pygame power the interface; a Negamax search with alpha-beta pruning supports multiple difficulties, hints, and background computation.',
    tags:['Python','Pygame','Negamax','Alpha-beta pruning'],
    url:'https://github.com/VPhunggggg/chess-edition-ai'
  }
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const projectEase = 'cubic-bezier(.16,1,.3,1)';
motionPreference.addEventListener('change',({matches})=>{
  if(matches) document.getAnimations().filter(a=>/^(project-|portfolio-)/.test(a.id)).forEach(a=>a.cancel());
});
function playEntrance(element,frames,options={}){
  if(!element||motionPreference.matches) return;
  element.animate(frames,{id:'portfolio-entry',duration:500,easing:projectEase,...options});
}
function enterSection(element){
  element.classList.add('is-inview');
  if(element.matches('.hero')){
    playEntrance($('#hero-title'),[{clipPath:'inset(0 0 12% 0)',opacity:.7},{clipPath:'inset(0 0 0% 0)',opacity:1}],{duration:650});
    playEntrance($('.portrait-wrap'),[{transform:'translateY(18px) rotate(-1deg)'},{transform:'translateY(0) rotate(2.6deg)'}],{duration:700});
  }else if(element.matches('.project-feature')){
    playEntrance($('.feature-art img'),[{clipPath:'inset(0 100% 0 0)',opacity:.4},{clipPath:'inset(0 0% 0 0)',opacity:1}],{id:'project-cover',duration:650});
  }else if(element.matches('.skill-grid')){
    $$('.skill-card').forEach((card,index)=>playEntrance(card,[{transform:'translateY(16px)',opacity:.65},{transform:'translateY(0)',opacity:1}],{duration:450,delay:index*45,fill:'backwards'}));
  }else if(element.matches('.about-card')){
    playEntrance(element,[{transform:'translateY(16px) rotate(1deg)'},{transform:'translateY(0) rotate(0deg)'}]);
  }else if(element.matches('#contact-title')){
    playEntrance(element,[{clipPath:'inset(0 12% 0 0)',opacity:.75},{clipPath:'inset(0 0% 0 0)',opacity:1}],{duration:600});
    playEntrance($('.contact-spark'),[{transform:'translate(-10px,10px) rotate(-25deg)'},{transform:'translate(0,0) rotate(-8deg)'}],{duration:600});
  }
}
const dialog = $('#project-dialog');
let lastTrigger = null;
$$('[data-open-project]').forEach(button => {
  button.addEventListener('click', () => {
    const data = projects[button.dataset.openProject];
    if (!data) return;
    lastTrigger = button;
    $('#dialog-type').textContent = data.type;
    $('#dialog-title').textContent = data.title;
    $('#dialog-lead').textContent = data.lead;
    $('#dialog-challenge').textContent = data.challenge;
    $('#dialog-approach').textContent = data.approach;
    $('#dialog-tags').replaceChildren(...data.tags.map(t => { const s = document.createElement('span'); s.textContent=t; return s; }));
    $('#dialog-source').href = data.url;
    $('#dialog-demo').hidden = !data.demo;
    if(data.demo) $('#dialog-demo').href = data.demo;
    else $('#dialog-demo').removeAttribute('href');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('modal-open');
      $('#dialog-close').focus();
      if(!motionPreference.matches) dialog.animate([
        {opacity:0,transform:'translateY(10px) scale(.985)'},
        {opacity:1,transform:'translateY(0) scale(1)'}
      ],{id:'project-dialog',duration:240,easing:projectEase});
    }
    else window.open(data.url,'_blank','noopener');
  });
});
$('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event => {if(event.target===dialog) dialog.close();});
dialog.addEventListener('close',()=>{
  document.body.classList.remove('modal-open');
  lastTrigger?.focus({preventScroll:true});
});

const cards = $$('.project-card');
const filters = $$('.filter');
function animateProjects(){
  let index=0;
  cards.forEach(card=>{
    card.getAnimations().filter(a=>a.id==='project-filter').forEach(a=>a.cancel());
    if(card.hidden||motionPreference.matches) return;
    card.animate([
      {opacity:.45,transform:'translateY(12px)'},
      {opacity:1,transform:'translateY(0)'}
    ],{id:'project-filter',duration:300,delay:index++*35,easing:projectEase,fill:'backwards'});
  });
}
const entranceTargets=$$('.hero,.numbers-strip,.project-feature,.skill-grid,.process-list,.about-card,#contact-title');
if('IntersectionObserver' in window){
  const entranceObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      enterSection(entry.target);
      entranceObserver.unobserve(entry.target);
    });
  },{threshold:.12});
  entranceTargets.forEach(element=>entranceObserver.observe(element));
}
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(f => { f.classList.remove('active'); f.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed', 'true');
  const filter = button.dataset.filter;
  let count = 0;
  cards.forEach(card => {
    const match = filter==='all'||card.dataset.category.split(' ').includes(filter);
    card.hidden = !match;
    if (match) count++;
  });
  $('#project-count').textContent = String(count).padStart(2,'0');
  $('.projects-grid').dataset.count = String(count);
  syncProgress();
  animateProjects();
}));

const menu = $('.menu-toggle');
const menuLinks = $('#nav-links');
const closeMenu = () => {menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation menu');menuLinks.classList.remove('open');};
menu.addEventListener('click',()=>{
  const open = menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
  menuLinks.classList.toggle('open',open);
  if(open) menuLinks.querySelector('a').focus({preventScroll:true});
});
$$('.nav-links a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}
});

const progress = $('.scroll-progress');
const header = $('.site-header');
const navSections=$$('.nav-links a').map(link=>({link,section:$(link.getAttribute('href'))}));
const contactSection=$('#contact');
let currentSection='';
let ticking=false;
function syncProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const fraction=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
  progress.style.transform=`scaleX(${fraction})`;
  header.classList.toggle('is-scrolled',window.scrollY>24);
  let active='';
  navSections.forEach(({section})=>{if(section.getBoundingClientRect().top<=window.innerHeight*.35) active=section.id;});
  if(contactSection.getBoundingClientRect().top<=window.innerHeight*.35) active='';
  if(active!==currentSection){
    navSections.forEach(({link,section})=>{
      if(section.id===active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    currentSection=active;
  }
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(syncProgress);ticking=true;}},{passive:true});
window.addEventListener('resize',syncProgress);syncProgress();

$('#year').textContent = new Date().getFullYear();
let toastTimeout;
function toast(message){
  const el = $('.toast'); el.textContent=message; el.classList.add('show');
  clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>el.classList.remove('show'),2400);
}
$('#copy-email').addEventListener('click',async()=>{
  const email=$('#copy-email').dataset.email;
  try{
    if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(email);
    else{
      const temp=document.createElement('textarea'); temp.value=email; temp.style.position='fixed';temp.style.opacity='0';document.body.append(temp);temp.select();
      try{if(!document.execCommand('copy'))throw new Error('Copy unsupported');}
      finally{temp.remove();}
    }
    toast('Email address copied to clipboard');
  } catch {toast('Copy unavailable — select the email shown below');}
});
