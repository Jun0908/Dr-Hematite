(() => {
  const english=window.HematiteI18n?.lang==='en';
  const maps={water:{file:english?'bedd0b24-2984-4dc2-99c1-6721455981d7.png':'01_water_oxygen_food.png',label:english?'Water, Oxygen & Food Roadmap':'水・酸素・食料の道筋'},materials:{file:english?'835dad7c-2097-4791-90b2-c0071f51a236.png':'02_materials_3dprinting.png',label:english?'Materials & 3D Printing Roadmap':'素材・3Dプリントの道筋'},phb:{file:'03_bioplastics_phb.png',label:english?'PHB Research Roadmap (image in Japanese)':'PHBの研究構想'}};
  const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),key=maps[params.get('map')]?params.get('map'):'water',item=maps[key];
  const focus={
    water:{ice:[.43,.13,.18,.12],water:[.20,.31,.40,.31],electrolysis:[.22,.70,.23,.10],moxie:[.46,.32,.22,.30],farming:[.70,.34,.27,.28],sabatier:[.67,.67,.25,.15],storage:[.37,.23,.27,.09],closedLoop:[.20,.31,.40,.48],hopper:[.67,.67,.25,.15]},
    materials:{mineral:[.18,.34,.19,.46],ceramics:[.37,.34,.18,.46],glass:[.37,.34,.18,.46],smelting:[.55,.34,.21,.46],metalwork:[.55,.63,.21,.17],beam:[.55,.63,.21,.17],recycling:[.77,.34,.21,.29],printing:[.77,.34,.21,.46],automation:[.77,.56,.21,.24]},
    phb:{regolith:[.01,.31,.14,.45],ceramics:[.15,.31,.16,.45],metalwork:[.31,.31,.14,.45],printing:[.45,.31,.16,.45],recycling:[.62,.38,.36,.17],phb:[.62,.54,.36,.22]}
  };
  const stepNames={ice:'地下氷',water:'融解・浄化',electrolysis:'水の電解',moxie:'大気から酸素',farming:'栽培',sabatier:'メタン合成',storage:'電力',closedLoop:'水の循環',hopper:'燃料の構想',mineral:'レゴリス分析',ceramics:'ガラス・建材',glass:'ガラス',smelting:'鉄の還元',metalwork:'金属部品',beam:'金属架台',recycling:'樹脂を再利用',printing:'3Dプリント',automation:'印刷部品の応用',regolith:'レゴリス',phb:'PHBの構想'};
  let zoom=1,pinch=null;const scroller=$('atlas-scroll'),canvas=$('atlas-canvas'),img=$('atlas-image'),highlight=$('atlas-highlight');
  img.src=`../../assets/roadmaps/${item.file}`;img.alt=item.label;$('atlas-caption').textContent=item.label;
  const lessonTech=params.get('tech')||{water:'electrolysis',materials:'smelting',phb:'phb'}[key];$('atlas-lesson').href=`lesson.html?tech=${lessonTech}&lang=${english?'en':'ja'}`;$('atlas-lesson').textContent=`${stepNames[lessonTech]||'この発明'}を学ぶ ↗`;
  document.querySelector(`[data-map="${key}"]`).setAttribute('aria-current','page');
  function size(keep=true){const old=canvas.getBoundingClientRect().width||1,cx=(scroller.scrollLeft+scroller.clientWidth/2)/old,cy=(scroller.scrollTop+scroller.clientHeight/2)/old;const ratio=img.naturalWidth&&img.naturalHeight?img.naturalWidth/img.naturalHeight:1.8;const width=Math.max(1,Math.min(scroller.clientWidth,scroller.clientHeight*ratio)*zoom);canvas.style.width=`${width}px`;if(keep){scroller.scrollLeft=cx*width-scroller.clientWidth/2;scroller.scrollTop=cy*width-scroller.clientHeight/2;}}
  function focusStep(id){const box=focus[key][id];if(!box)return;highlight.hidden=false;highlight.style.left=`${box[0]*100}%`;highlight.style.top=`${box[1]*100}%`;highlight.style.width=`${box[2]*100}%`;highlight.style.height=`${box[3]*100}%`;zoom=1.75;size(false);scroller.scrollLeft=(box[0]+box[2]/2)*canvas.clientWidth-scroller.clientWidth/2;scroller.scrollTop=(box[1]+box[3]/2)*canvas.clientHeight-scroller.clientHeight/2;$('atlas-caption').textContent=`${item.label} · ${stepNames[id]}`;document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.step===id?'true':'false'));window.HematiteI18n?.apply(document.body);}
  $('atlas-steps').innerHTML=Object.keys(focus[key]).map(id=>`<button data-step="${id}" aria-pressed="false">${stepNames[id]}</button>`).join('');
  for(const link of document.querySelectorAll('[data-map]'))link.href=`?map=${link.dataset.map}&lang=${english?'en':'ja'}`;
  document.querySelector('header a').href=`../index.html?lang=${english?'en':'ja'}#lab`;
  $('language-toggle').onclick=()=>{const url=new URL(location.href);url.searchParams.set('lang',english?'ja':'en');window.HematiteI18n.set(english?'ja':'en');location.href=url.href;};
  $('atlas-steps').onclick=e=>{const b=e.target.closest('[data-step]');if(b)focusStep(b.dataset.step);};
  $('atlas-in').onclick=()=>{zoom=Math.min(4,zoom+.35);size();};$('atlas-out').onclick=()=>{zoom=Math.max(1,zoom-.35);size();};$('atlas-fit').onclick=()=>{zoom=1;highlight.hidden=true;size();scroller.scrollLeft=0;scroller.scrollTop=0;document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed','false'));$('atlas-caption').textContent=item.label;};
  scroller.addEventListener('touchstart',e=>{if(e.touches.length===2)pinch={distance:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),zoom};},{passive:true});
  scroller.addEventListener('touchmove',e=>{if(e.touches.length===2&&pinch){e.preventDefault();const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);zoom=Math.max(1,Math.min(4,pinch.zoom*d/pinch.distance));size();}},{passive:false});
  scroller.addEventListener('touchend',e=>{if(e.touches.length<2)pinch=null;},{passive:true});
  window.addEventListener('resize',()=>size());img.onload=()=>{size(false);if(focus[key][params.get('tech')])focusStep(params.get('tech'));};
  window.HematiteI18n?.apply(document.body);
  document.querySelector('header a').onclick=e=>{if(window.opener&&!window.opener.closed){e.preventDefault();window.opener.focus();window.close();}};
})();
