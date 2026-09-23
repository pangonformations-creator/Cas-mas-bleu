document.getElementById('print')?.addEventListener('click',()=>window.print());
let coursePrintState=[];
window.addEventListener('beforeprint',()=>{
  if(coursePrintState.length)return;
  coursePrintState=Array.from(document.querySelectorAll('.course-accordion'),element=>({element,open:element.open}));
  coursePrintState.forEach(({element})=>{element.open=true;});
});
window.addEventListener('afterprint',()=>{
  coursePrintState.forEach(({element,open})=>{element.open=open;});
  coursePrintState=[];
});

const stops=Array.from(document.querySelectorAll('[data-stop]:not([disabled])'));
if(stops.length){
  const key='mission-mas-bleu-progress-v1';
  let saved={};
  const storageNotice=()=>{document.getElementById('map-storage').textContent='La sauvegarde est indisponible dans ce navigateur. La progression reste visible pendant cette visite.';};
  try{const value=JSON.parse(localStorage.getItem(key)||'{}');if(value&&typeof value==='object')saved=value;}catch{storageNotice();}
  const render=()=>{const count=stops.filter(s=>s.checked).length;document.getElementById('map-progress').textContent=`${count} étape${count>1?'s':''} terminée${count>1?'s':''} sur 3.`;stops.forEach(s=>s.closest('li').classList.toggle('is-complete',s.checked));};
  stops.forEach(s=>{s.checked=saved[s.dataset.stop]===true;s.addEventListener('change',()=>{render();try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(stops.map(s=>[s.dataset.stop,s.checked]))));}catch{storageNotice();}});});
  render();
}

