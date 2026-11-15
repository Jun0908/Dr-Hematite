/* Dr. Hematite: two-team playable design study. Tile yields and rules are fictional. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const SIZE = 11, KEY = 'hematite-arcadia-civilization-v5';
  const starterTech = ['ice','water','electrolysis','farming','storage'];
  const starterDevices = ['waterPlant','oxygenPlant','greenhouse','solar','solar','battery'];
  const icon = (id,cls='') => window.HematiteIcons.icon(id,cls);
  const resourceIcon = {ice:'ice',iron:'ore',regolith:'regolith'};
  const resourceName = {ice:'地下氷の候補',iron:'鉄を含む原料の候補',regolith:'レゴリスの候補'};
  const names = {ice:'氷',water:'水',oxygen:'酸素',food:'食料',hydrogen:'水素',ore:'鉄を含む原料',metal:'鉄系材料',regolith:'レゴリス',ceramic:'建材',scrap:'廃樹脂',resin:'再生樹脂',parts:'部品'};
  const teams = ['アレス','ベガ'];
  const techs = [
    {id:'climbing',name:'登坂技術',art:'△',deps:[],cost:4,chain:'地形を調べる → 車輪・履帯と経路を整える → 山を通る',use:'山マスに機体が入り、山越えの補給路を使える。',fact:'特定地点で通れるかは地盤、傾斜、機体と経路に依存する。ゲームでは一マスの障害にまとめている。'},
    {id:'ice',name:'氷の採取',art:'❄',deps:[],cost:4,chain:'地下氷の候補 → 現地調査 → 掘削 → 氷',use:'氷採取場を置き、水と酸素の材料を得る。',fact:'SWIMは広域の候補を示す。個々の採掘量は現地で確かめる。'},
    {id:'water',name:'融解・浄化',art:'💧',deps:['ice'],cost:5,chain:'氷 ＋ 熱 → 融解 → 水質処理 → 水',use:'採水設備を動かし、基地と次の化学工程を支える。',fact:'溶かしただけの氷を飲用水とみなさない。'},
    {id:'electrolysis',name:'水の電気分解',art:'⚗',deps:['water'],cost:6,chain:'2H₂O ＋ 電力 → 2H₂ ＋ O₂',use:'酸素と水素を生み、生命維持と金属製造へ分ける。',fact:'電解には電力と装置が必要。式は分子の数の関係を示す。'},
    {id:'moxie',name:'大気から酸素',art:'☁',deps:['water'],cost:6,chain:'火星大気CO₂ ＋ 電力 → O₂ ＋ CO',use:'水を使わない酸素ルート。電力が必要。',fact:'MOXIEは火星で酸素製造を小規模実証した。ゲームの設備出力は仮定。'},
    {id:'storage',name:'蓄電と配分',art:'ϟ',deps:[],cost:4,chain:'太陽光 → 余剰電力 → 蓄電 → 砂嵐中に利用',use:'蓄電設備を置き、嵐の間も重要な装置を動かす。',fact:'蓄電池は電力を貯める装置で、単独では発電しない。'},
    {id:'mineral',name:'鉱物分析',art:'◇',deps:[],cost:4,chain:'観測候補 → 試料を分析 → 原料を確認',use:'鉄を含む原料の採取場を作る。',fact:'鉄元素の信号と使える鉱床は同じ情報ではない。'},
    {id:'smelting',name:'鉄の還元',art:'♨',deps:['mineral','electrolysis'],cost:7,chain:'鉄酸化物 ＋ 水素 ＋ 熱 → 鉄系材料',use:'原料と水素から金属を得る。',fact:'還元には原料の分析、熱、反応装置、分離・加工が必要。'},
    {id:'metalwork',name:'金属加工',art:'⚒',deps:['smelting'],cost:6,chain:'鉄系材料 → 加工 → フレーム・装甲',use:'金属部品で工作機体と防護を強化する。',fact:'鉄を得ても用途に適した部品には加工が必要。'},
    {id:'recycling',name:'樹脂の再利用',art:'♻',deps:[],cost:4,chain:'廃樹脂 → 選別・洗浄 → 再生材',use:'予備部品と修理の材料を増やす。',fact:'違う樹脂を無条件に混ぜられず、再生時に劣化も起こる。'},
    {id:'printing',name:'3Dプリント部品',art:'▣',deps:['recycling'],cost:6,chain:'再生材 ＋ 持参プリンタ → 用途別の部品',use:'交換部品を作り、機体や設備を修理する。',fact:'機械本体や電子部品まで自給できるという意味ではない。'},
    {id:'farming',name:'水耕栽培',art:'♧',deps:['water'],cost:6,chain:'水 ＋ 種・養分 ＋ 光 → 食料',use:'有人拠点の拡張に必要な食料を補う。',fact:'水だけでは植物は育たず、養分や環境制御が必要。'},
    {id:'ceramics',name:'焼成建材',art:'▥',deps:[],cost:5,chain:'レゴリス → 選別・成形・焼成 → 建材',use:'焼成材で中枢基地を補強する。',fact:'レゴリスの組成に合わせた選別と焼成条件が必要。'},
    {id:'beam',name:'ビーム・セントリー',art:'✦',deps:['storage','metalwork'],cost:7,chain:'持参した光学装置 ＋ 電力 ＋ 金属架台 → セントリー',use:'射程2の防衛機体。照射後は冷却が必要。',fact:'ゲーム上の架空戦闘機。火星で実証済みの機体ではない。'},
    {id:'automation',name:'作業の自動化',art:'⌘',deps:['printing'],cost:99,future:true,chain:'センサー ＋ 制御 ＋ 交換部品 → 自動運転',use:'将来の工場自動化の研究枝。',fact:'自動化にも点検と保守が必要。'},
    {id:'glass',name:'現地ガラス',art:'◈',deps:['ceramics'],cost:99,future:true,chain:'分析済みのシリカ原料 → 精製・溶融 → ガラス',use:'将来の素材枝。透明部材や保護窓へ広がる。',fact:'レゴリスをそのまま光学用ガラスにできるわけではない。'},
    {id:'sabatier',name:'メタン合成',art:'♨',deps:['electrolysis'],cost:99,future:true,chain:'CO₂ ＋ 水素 → サバティエ反応 → メタン ＋ 水',use:'将来の燃料枝。水の再利用ともつながる。',fact:'火星での大規模運用は装置・熱・電力・回収系の設計が必要。'},
    {id:'phb',name:'バイオプラスチック',art:'♧',deps:['farming','printing'],cost:99,future:true,chain:'炭素源 ＋ 微生物の培養 → PHB → 用途別材料',use:'将来の生体素材枝。製造と循環の選択肢を広げる。',fact:'火星の現地資源からPHBを直接量産できると実証したものではない。'},
    {id:'closedLoop',name:'水と空気の循環',art:'◌',deps:['water','farming'],cost:99,future:true,chain:'使用済み水・空気 → 分離・浄化 → 再利用',use:'将来の生命維持枝。消費する資源を減らす。',fact:'完全な閉鎖循環ではなく、損失や補給が必要。'},
    {id:'hopper',name:'推進ホッパー',art:'◇',deps:['sabatier','moxie'],cost:99,future:true,chain:'メタン ＋ 別途確保した酸素 → 推進剤',use:'将来の発明案。現在の対戦では使えない。',fact:'火星での運用は研究構想とゲーム上の想像。'}
  ];
  const buildings = {
    iceMine:{name:'氷採取場',icon:'❄',tech:'ice',resource:'ice',dp:3,cost:{parts:1},power:1,out:{ice:2}},
    waterPlant:{name:'採水設備',icon:'💧',tech:'water',dp:4,cost:{parts:1},power:2,input:{ice:1},out:{water:3}},
    oxygenPlant:{name:'電解設備',icon:'⚗',tech:'electrolysis',dp:4,cost:{parts:1},power:2,input:{water:1},out:{oxygen:2,hydrogen:1}},
    moxie:{name:'大気酸素設備',icon:'☁',tech:'moxie',dp:5,cost:{parts:1},power:3,out:{oxygen:2}},
    solar:{name:'太陽電池',icon:'☀',dp:3,cost:{parts:1},power:0,generator:3},
    battery:{name:'蓄電設備',icon:'ϟ',tech:'storage',dp:3,cost:{parts:1},power:0,capacity:5},
    mine:{name:'鉱物採取場',icon:'◆',tech:'mineral',resource:'iron',dp:3,cost:{parts:1},power:1,out:{ore:2}},
    smelter:{name:'還元炉',icon:'♨',tech:'smelting',dp:5,cost:{parts:1},power:3,input:{ore:1,hydrogen:1},out:{metal:1}},
    recycler:{name:'樹脂再生設備',icon:'♻',tech:'recycling',dp:3,cost:{parts:1},power:1,input:{scrap:1},out:{resin:1}},
    workshop:{name:'印刷工房',icon:'▣',tech:'printing',dp:4,cost:{parts:1},power:1,input:{resin:1},out:{parts:2}},
    greenhouse:{name:'温室',icon:'♧',tech:'farming',dp:4,cost:{parts:1},power:2,input:{water:1},out:{food:2}},
    kiln:{name:'遮蔽材工房',icon:'▥',tech:'ceramics',dp:4,cost:{parts:1},power:2,input:{regolith:1},out:{ceramic:1}},
    regolithPit:{name:'レゴリス採取場',icon:'▦',resource:'regolith',dp:2,cost:{parts:1},power:1,out:{regolith:2}},
    depot:{name:'補給中継所',icon:'◈',dp:4,cost:{parts:1},power:1},
    shelter:{name:'遮蔽避難所',icon:'⌂',tech:'ceramics',dp:4,cost:{ceramic:1,parts:1},power:0}
  };
  const unitKinds = {
    scout:{name:'観測ローバー',icon:'◎',hp:2,move:2,range:1,damage:1,dp:3,cost:{parts:1}},
    worker:{name:'工作クローラー',icon:'⚒',hp:3,move:1,range:1,damage:1,dp:4,cost:{parts:1}},
    sentry:{name:'ビーム・セントリー',icon:'✦',hp:3,move:1,range:2,damage:2,dp:6,cost:{parts:2,metal:1},tech:'beam'}
  };
  const unitMaxHp=u=>unitKinds[u.kind].hp+(u.armored?1:0);
  const terrainData=window.HematiteTerrain;
  if(!terrainData?.elevation||terrainData.elevation.length!==SIZE)throw new Error('Measured terrain is missing');
  // The measured DEM remains the map source; only isolated marked tiles obstruct travel.
  const mountainSites=new Set(terrainData.gameMountainTiles.map(([x,y])=>`${x},${y}`));
  const terrainAt=(x,y)=>mountainSites.has(`${x},${y}`)?'mountain':'plain';
  const deposits = {'3,7':'ice','7,3':'ice','5,5':'ice','3,5':'iron','7,5':'iron','2,4':'regolith','8,6':'regolith'};
  const idx=(x,y)=>y*SIZE+x, inBounds=(x,y)=>x>=0&&y>=0&&x<SIZE&&y<SIZE, distance=(a,b)=>Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y));
  let state, selected={x:3,y:7}, selectedUnitId=null, pendingAttack=null, selectedTech='electrolysis', page='map', labView='route', mapZoom=2.3, lessonPlaying=true, mode=null, sheetExpanded=false, buildPicker=false, recruitPicker=false, techOpen=false, turnBusy=false, roundProcessing=false, turnHighlights=[], roundAttacks=[], toastTimer, loadWarning='', ignoreTileClick=false, techZoom=1, cameraLeft=0, cameraTop=0, treeLeft=0, treeTop=0;

  function fresh(){
    const tiles=Array.from({length:SIZE*SIZE},(_,i)=>{const x=i%SIZE,y=Math.floor(i/SIZE);return{x,y,elevation:terrainData.elevation[y][x],terrain:terrainAt(x,y),resource:deposits[`${x},${y}`]||null,surveyed:[false,false],facility:null,outpost:false};});
    tileIn(tiles,5,3).outpost=true;tileIn(tiles,5,7).outpost=true;
    // The expedition arrives with a commissioned life-support kit and a surveyed ice source.
    for(const i of [0,1]){const q=tileIn(tiles,i?7:3,i?3:7);q.surveyed[i]=true;q.facility={type:'iceMine',owner:i,hp:3,broken:false,blocked:'',starter:true};}
    const stock=()=>({ice:0,water:12,oxygen:12,food:12,hydrogen:0,ore:0,metal:0,regolith:0,ceramic:0,scrap:3,resin:2,parts:8});
    return{version:5,terrainRules:2,round:1,rng:123456789,event:null,warning:null,nextEventRound:9,outcome:null,tutorial:true,logs:[],tiles,
      teams:[0,1].map(i=>({name:teams[i],dp:16,battery:7,policy:'oxygen',stock:stock(),tech:['survey','power',...starterTech],shortage:0,lastNet:{water:0,oxygen:1,food:1},lastEnergy:{supply:12,demand:9},facilities:starterDevices.map(type=>({type,broken:false,blocked:'',upgraded:false,starter:true})),bases:[{x:i?9:1,y:i?1:9,kind:'core',hp:5,siegeBy:null,siegeRound:null}],units:[{id:i+1,kind:'scout',x:i?8:2,y:i?2:8,hp:2,moved:false,acted:false,unsupplied:0,cooldown:0,deployed:false,localSurveys:[]},{id:i+3,kind:'worker',x:i?9:1,y:i?2:8,hp:3,moved:false,acted:false,unsupplied:0,cooldown:0,deployed:false,localSurveys:[]}]})),nextUnitId:5};
  }
  function tileIn(tiles,x,y){return tiles[idx(x,y)];}
  function tile(x,y){return inBounds(x,y)?state.tiles[idx(x,y)]:null;}
  function team(i){return state.teams[i];}
  function allBases(){return state.teams.flatMap((t,i)=>t.bases.map(b=>({...b,owner:i})));}
  function unitAt(x,y){for(let i=0;i<2;i++){const u=team(i).units.find(v=>v.x===x&&v.y===y);if(u)return{unit:u,owner:i};}return null;}
  function baseAt(x,y){return allBases().find(b=>b.x===x&&b.y===y);}
  function facilityAt(x,y){const f=tile(x,y)?.facility;return f?f:null;}
  function addLog(title,body,owner=null){const [key,...subject]=title.split('：');state.logs.unshift({round:state.round,title,body,owner,key,args:{owner,subject:subject.join('：')||null}});state.logs=state.logs.slice(0,80);}
  function rng(){state.rng=(Math.imul(1664525,state.rng)+1013904223)>>>0;return state.rng/4294967296;}
  function canPay(t,dp,cost={}){return t.dp>=dp&&Object.entries(cost).every(([k,v])=>(t.stock[k]||0)>=v);}
  function pay(t,dp,cost={}){if(!canPay(t,dp,cost))return false;t.dp-=dp;for(const[k,v]of Object.entries(cost))t.stock[k]-=v;return true;}
  function areaOwner(x,y){const candidates=allBases().filter(b=>distance(b,{x,y})<=(b.kind==='core'?2:2)).sort((a,b)=>distance(a,{x,y})-distance(b,{x,y})||a.owner-b.owner);return candidates[0]||null;}
  function ownsArea(i,x,y){return areaOwner(x,y)?.owner===i;}
  function connectedNodes(i){const core=team(i).bases.find(b=>b.kind==='core');if(!core)return[];const all=team(i).bases;const seen=[core];let changed=true;while(changed){changed=false;for(const n of all)if(!seen.includes(n)&&seen.some(s=>distance(s,n)<=4)){seen.push(n);changed=true;}}return seen;}
  function resourceConnected(i,q){const owner=areaOwner(q.x,q.y);return !!(owner?.owner===i&&connectedNodes(i).some(n=>n.x===owner.x&&n.y===owner.y));}
  function supplyPath(i,start,x,y){
    if(distance(start,{x,y})>2)return false;
    const queue=[{x:start.x,y:start.y,steps:0}],seen=new Set([idx(start.x,start.y)]);
    for(let head=0;head<queue.length;head++){
      const current=queue[head];if(current.x===x&&current.y===y)return true;
      if(current.steps===2)continue;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
        if(!dx&&!dy)continue;const nx=current.x+dx,ny=current.y+dy;if(!inBounds(nx,ny)||seen.has(idx(nx,ny)))continue;
        const to=tile(nx,ny);
        if(to.terrain==='mountain'&&!team(i).tech.includes('climbing'))continue;
        seen.add(idx(nx,ny));queue.push({x:nx,y:ny,steps:current.steps+1});
      }
    }
    return false;
  }
  function inSupply(i,x,y){return connectedNodes(i).some(n=>supplyPath(i,n,x,y));}
  function inComms(i,x,y){return connectedNodes(i).some(n=>distance(n,{x,y})<=(n.kind==='core'?4:3)&&lineClear(n,x,y));}
  function visible(i,x,y){const storm=state.event?.type==='storm';return !!baseAt(x,y)||connectedNodes(i).some(b=>distance(b,{x,y})<=(storm?2:3))||team(i).units.some(u=>distance(u,{x,y})<=(inComms(i,u.x,u.y)?storm?1:2:1));}
  function scienceReady(i,id){const tech=techs.find(v=>v.id===id);return tech&&!tech.future&&tech.deps.every(d=>team(i).tech.includes(d));}
  function research(i,id){const t=team(i),tech=techs.find(v=>v.id===id);if(state.outcome||!tech||t.tech.includes(id)||!scienceReady(i,id)||!canPay(t,tech.cost)||!canWork(i))return false;pay(t,tech.cost);t.tech.push(id);addLog('発明：'+tech.name,`${teams[i]}が${tech.chain}を研究した。`,i);save();render();return true;}
  function canWork(){return true;}
  function survey(i,x,y){const t=tile(x,y),scout=team(i).units.find(u=>u.kind==='scout'&&!u.acted&&distance(u,{x,y})<=1);if(state.outcome||!t||!t.resource||t.surveyed[i]||!scout||scout.localSurveys?.includes(idx(x,y))||!canWork(i))return false;if(inComms(i,scout.x,scout.y))t.surveyed[i]=true;else{scout.localSurveys??=[];scout.localSurveys.push(idx(x,y));}scout.acted=true;addLog('現地調査',`${teams[i]}が${resourceName[t.resource]}を調査。${inComms(i,scout.x,scout.y)?'観測を基地へ共有した。':'通信圏外のため、再接続まで観測を機体に保存。'}`,i);save();render();return true;}
  function build(i,type,x,y){const t=tile(x,y),b=buildings[type],owner=baseAt(x,y);if(state.outcome||!t||!b?.resource||t.facility||t.outpost||owner||unitAt(x,y)||!resourceConnected(i,t)||!canWork(i)||t.terrain==='mountain'&&!team(i).tech.includes('climbing')||b.tech&&!team(i).tech.includes(b.tech)||t.resource!==b.resource||!t.surveyed[i]||!pay(team(i),b.dp,b.cost))return false;
    t.facility={type,owner:i,hp:3,broken:false,blocked:''};addLog('建設：'+b.name,`${teams[i]}の基地で${b.name}が完成。`,i);save();render();return true;
  }
  function canBuildBase(i,type){const b=buildings[type],t=team(i);return !!(!state.outcome&&b&&!b.resource&&!['depot','shelter'].includes(type)&&(!b.tech||t.tech.includes(b.tech))&&canPay(t,b.dp,b.cost));}
  function buildBase(i,type){if(!canBuildBase(i,type))return false;const b=buildings[type],t=team(i);pay(t,b.dp,b.cost);t.facilities.push({type,broken:false,blocked:'',upgraded:false});addLog('建設：'+b.name,`${teams[i]}の本拠地で${b.name}が完成。`,i);save();render();return true;}
  function repairBase(i,index){const f=team(i).facilities[index];if(!f?.broken||!pay(team(i),2,{parts:1}))return false;f.broken=false;f.blocked='';addLog('設備を修理',`${teams[i]}が${buildings[f.type].name}を修理。`,i);save();render();return true;}
  function reinforceCore(i){const t=team(i),core=t.bases.find(v=>v.kind==='core');if(state.outcome||!core||core.reinforced||!t.tech.includes('ceramics')||!pay(t,3,{ceramic:1,parts:1}))return false;core.reinforced=true;core.maxHp=7;core.hp+=2;addLog('中枢基地を補強',`${teams[i]}が焼成建材で中枢基地を補強。`,i);save();render();return true;}
  function recruit(i,kind){const def=unitKinds[kind],t=team(i),core=t.bases.find(b=>b.kind==='core');if(state.outcome||!def||!core||def.tech&&!t.tech.includes(def.tech)||unitAt(core.x,core.y)||!inSupply(i,core.x,core.y)||!canWork(i)||!pay(t,def.dp,def.cost))return false;t.units.push({id:state.nextUnitId++,kind,x:core.x,y:core.y,hp:def.hp,moved:true,acted:true,unsupplied:0,cooldown:0,deployed:false,localSurveys:[]});addLog('製作：'+def.name,`${teams[i]}が素材と開発力を使って機体を組み立てた。`,i);save();render();return true;}
  function canMove(i,id,x,y){const t=tile(x,y),u=team(i).units.find(v=>v.id===id);if(state.outcome||!u||!t||u.moved||u.deployed||unitAt(x,y)||baseAt(x,y)||distance(u,{x,y})>unitKinds[u.kind].move||distance(u,{x,y})===0)return false;const route=routeTo(i,u,t,0);return route.length>0&&route.length<=unitKinds[u.kind].move;}
  function move(i,id,x,y){if(!canMove(i,id,x,y))return false;const u=team(i).units.find(v=>v.id===id);u.x=x;u.y=y;u.moved=true;save();render();return true;}
  function stepAllowed(i,to){return !!to&&(to.terrain!=='mountain'||team(i).tech.includes('climbing'));}
  function routeTo(i,u,goal,radius){const start=idx(u.x,u.y),queue=[start],prev=new Map([[start,null]]);for(let head=0;head<queue.length;head++){const current=queue[head],q=state.tiles[current];if(current!==start&&distance(q,goal)<=radius){const route=[];for(let p=current;p!==start;p=prev.get(p))route.unshift(state.tiles[p]);return route;}for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const x=q.x+dx,y=q.y+dy;if(!inBounds(x,y))continue;const next=idx(x,y),t=tile(x,y);if(prev.has(next)||unitAt(x,y)||baseAt(x,y)||!stepAllowed(i,t))continue;prev.set(next,current);queue.push(next);}}return[];}
  function deploy(i,id){const u=team(i).units.find(v=>v.id===id);if(state.outcome||!u||u.kind!=='sentry'||u.acted||!inSupply(i,u.x,u.y))return false;u.deployed=!u.deployed;u.acted=true;addLog(u.deployed?'セントリーを展開':'セントリーを撤収',`${teams[i]}が電力路と放熱面を確認した。`,i);save();render();return true;}
  function lineClear(a,x,y){const n=distance(a,{x,y});if(n<2)return true;for(let step=1;step<n;step++){const f=step/n,mid=tile(Math.round(a.x+(x-a.x)*f),Math.round(a.y+(y-a.y)*f));if(!mid||mid.terrain==='mountain')return false;}return true;}
  function canAttack(i,id,x,y){const u=team(i).units.find(v=>v.id===id),target=unitAt(x,y),base=baseAt(x,y);return !!(!state.outcome&&u&&!u.acted&&u.cooldown<=0&&visible(i,x,y)&&distance(u,{x,y})<=unitKinds[u.kind].range&&distance(u,{x,y})>0&&((target&&target.owner!==i)||(base&&base.owner!==i&&base.hp>0))&&(u.kind!=='sentry'||u.deployed&&inSupply(i,u.x,u.y)&&team(i).battery>=1&&lineClear(u,x,y)));}
  function attack(i,id,x,y){if(!canAttack(i,id,x,y))return false;const u=team(i).units.find(v=>v.id===id),target=unitAt(x,y),base=baseAt(x,y);
    const amount=u.kind==='sentry'&&state.event?.type==='storm'?1:unitKinds[u.kind].damage;u.acted=true;if(u.kind==='sentry'){u.cooldown=2;team(i).battery-=1;}
    if(target&&target.owner!==i){if(roundProcessing&&i===1&&target.owner===0)roundAttacks.push(idx(x,y));target.unit.hp-=amount;addLog('機体が交戦',`${teams[i]}の${unitKinds[u.kind].name}が${unitKinds[target.unit.kind].name}へ${amount}損傷。`,i);if(target.unit.hp<=0)team(target.owner).units=team(target.owner).units.filter(v=>v!==target.unit);}
    else if(base&&base.owner!==i){if(roundProcessing&&i===1&&base.owner===0)roundAttacks.push(idx(x,y));const real=team(base.owner).bases.find(b=>b.x===x&&b.y===y);real.hp=Math.max(0,real.hp-amount);addLog('拠点へ攻撃',`${teams[i]}が${teams[base.owner]}の${base.kind==='core'?'中枢基地':'前哨基地'}を攻撃。`,i);if(real.hp===0){real.siegeBy=i;real.siegeRound=state.round;addLog('中枢基地を攻略',`${teams[i]}が拠点を制圧。次のラウンドまで保持する必要がある。`,i);}}
    save();render();return true;
  }
  function repair(i,x,y){if(state.outcome)return false;const base=baseAt(x,y);if(base&&base.owner===i&&base.hp<(base.maxHp||5)&&team(i).units.some(u=>u.kind==='worker'&&!u.acted&&distance(u,{x,y})<=1)&&pay(team(i),2,{parts:1})){const b=team(i).bases.find(q=>q.x===x&&q.y===y);b.hp=Math.min(b.maxHp||5,b.hp+2);b.siegeBy=null;b.siegeRound=null;team(i).units.find(u=>u.kind==='worker'&&!u.acted&&distance(u,{x,y})<=1).acted=true;addLog('拠点を修復',`${teams[i]}が部品を使って防備を回復。`,i);save();render();return true;}
    const t=tile(x,y);if(t?.facility?.owner===i&&t.facility.broken&&pay(team(i),2,{parts:1})){t.facility.broken=false;addLog('設備を修復',`${teams[i]}が交換部品を使った。`,i);save();render();return true;}return false;}
  function canUpgradeWorkshop(i){const f=team(i).facilities.find(v=>v.type==='workshop');return !!(f&&!f.upgraded&&team(i).tech.includes('metalwork')&&canPay(team(i),3,{metal:1,parts:1}));}
  function upgradeWorkshop(i){if(state.outcome||!canUpgradeWorkshop(i))return false;pay(team(i),3,{metal:1,parts:1});team(i).facilities.find(v=>v.type==='workshop').upgraded=true;addLog('工房を強化',`${teams[i]}が鉄系材料と部品で印刷工房を強化。部品の生産が毎ラウンド1増える。`,i);save();render();return true;}
  function canUpgradeUnit(i,id){const u=team(i).units.find(v=>v.id===id);return !!(u?.kind==='worker'&&!u.armored&&!u.acted&&team(i).tech.includes('metalwork')&&inSupply(i,u.x,u.y)&&canWork(i)&&canPay(team(i),3,{metal:1,parts:1}));}
  function upgradeUnit(i,id){if(state.outcome||!canUpgradeUnit(i,id))return false;const u=team(i).units.find(v=>v.id===id);pay(team(i),3,{metal:1,parts:1});u.armored=true;u.hp++;u.acted=true;addLog('工作クローラーを強化',`${teams[i]}が鉄系材料と部品で装甲を追加。最大耐久と現在の耐久が1増えた。`,i);save();render();return true;}
  function capture(i,x,y){const t=tile(x,y),u=team(i).units.find(v=>v.kind==='worker'&&!v.acted&&distance(v,{x,y})<=1),former=baseAt(x,y);if(state.outcome||!t||(!t.outpost&&former?.kind!=='relay')||former?.owner===i||former&&former.hp>0||unitAt(x,y)||!u||!pay(team(i),3,{parts:1}))return false;t.outpost=false;u.acted=true;if(former){const seized=state.tiles.filter(q=>q.facility?.owner===former.owner&&areaOwner(q.x,q.y)?.x===x&&areaOwner(q.x,q.y)?.y===y);team(former.owner).bases=team(former.owner).bases.filter(b=>!(b.x===x&&b.y===y));for(const q of seized)q.facility=null;}team(i).bases.push({x,y,kind:'relay',hp:3,siegeBy:null,siegeRound:null});addLog('前哨基地を確保',`${teams[i]}が資源の搬入路と補給拠点を確保。`,i);save();render();return true;}
  function supplyEstimate(i){const t=team(i);let best={name:'安定',turns:99};for(const k of ['water','oxygen','food']){const net=t.lastNet[k]??-1;if(net<0){const turns=Math.floor(t.stock[k]/-net);if(turns<best.turns)best={name:names[k],turns};}}return best;}
  function forecast(i){const actual=state;try{state=JSON.parse(JSON.stringify(actual));state.round++;eventBoundary();production(i);const t=team(i);return{round:state.round,event:state.event?.type||null,net:t.lastNet,netAll:t.lastNetAll,balance:t.lastBalance,flows:t.lastFlows,stock:t.stock,energy:t.lastEnergy,battery:t.battery,extractors:state.tiles.filter(q=>q.facility?.owner===i).map(q=>({x:q.x,y:q.y,blocked:q.facility.blocked})),facilities:t.facilities.map(q=>({name:buildings[q.type].name,blocked:q.blocked}))};}finally{state=actual;}}
  function previewBaseBuild(i,type){if(!canBuildBase(i,type))return null;const before=forecast(i),actual=state;try{state=JSON.parse(JSON.stringify(actual));const b=buildings[type];pay(team(i),b.dp,b.cost);team(i).facilities.push({type,broken:false,blocked:'',upgraded:false});const after=forecast(i);return{before,after,blocked:after.facilities.at(-1)?.blocked||''};}finally{state=actual;}}
  function buildPreview(i,type,x,y){if(!canBuild(i,type,x,y))return '';const before=forecast(i),original=state;let after;try{state=JSON.parse(JSON.stringify(original));tile(x,y).facility={type,owner:i,hp:3,broken:false,blocked:''};after=forecast(i);}finally{state=original;}const en=window.HematiteI18n?.lang==='en',changes=Object.keys(names).filter(k=>after.stock[k]!==before.stock[k]).map(k=>`${en?window.HematiteI18n.translate(names[k]):names[k]} ${after.stock[k]-before.stock[k]>0?'+':''}${Math.round((after.stock[k]-before.stock[k])*10)/10}`),power=after.energy.supply-before.energy.supply,demand=after.energy.demand-before.energy.demand;if(power)changes.push(`${en?'Power':'発電'} ${power>0?'+':''}${power}`);if(demand)changes.push(`${en?'Demand':'需要'} +${demand}`);if(type==='battery')changes.push(en?'Battery capacity +5':'蓄電容量 +5');const blocked=after.facilities.find(q=>q.x===x&&q.y===y)?.blocked;if(blocked)changes.push(en?window.HematiteI18n.translate(blocked):blocked);return `${en?'Next turn':'次ターン'}: ${changes.join(' · ')|| (en?'no immediate change':'即時の変化なし')}`;}
  function production(i){
    const t=team(i),before={...t.stock};
    t.lastBalance=Object.fromEntries(Object.keys(names).map(k=>[k,{produced:0,processing:0,life:0,maintenance:0,unmet:0}]));
    t.lastFlows=[];
    const mines=state.tiles.filter(q=>q.facility?.owner===i).map(q=>({ref:q.facility,type:q.facility.type,tile:q}));
    const plants=t.facilities.map((q,index)=>({ref:q,type:q.type,index})),fs=[...mines,...plants];
    const storm=state.event?.type==='storm',generation=Math.floor((6+plants.filter(f=>f.type==='solar'&&!f.ref.broken).length*3)*(storm?.45:1));
    const capacity=2+plants.filter(f=>f.type==='battery'&&!f.ref.broken).length*5;
    const podPower=connectedNodes(i).filter(b=>b.kind==='relay').length,baseDemand=2+podPower;
    const batteryStart=Math.min(t.battery,capacity),baseBattery=Math.min(batteryStart,Math.max(0,baseDemand-generation));
    let energy=Math.max(0,generation-baseDemand),battery=batteryStart-baseBattery,used=Math.min(baseDemand,generation+baseBattery);
    // Keep essential ice / water / life support ahead of industrial extraction and processing.
    const foodFirst=t.policy==='food',order={iceMine:0,waterPlant:1,oxygenPlant:foodFirst?3:2,moxie:2,greenhouse:foodFirst?2:3,mine:4,regolithPit:4,recycler:5,workshop:6,smelter:6,kiln:6};
    fs.sort((a,b)=>(order[a.type]??7)-(order[b.type]??7));
    for(const f of fs){
      const record=f.ref,b=buildings[f.type];record.blocked='';
      const flow={type:f.type,index:f.index,x:f.tile?.x,y:f.tile?.y,input:{},output:{},power:0,blocked:'',missing:[]};
      const stop=reason=>{record.blocked=reason;flow.blocked=reason;};
      if(record.broken)stop('故障');
      else if(f.tile&&!resourceConnected(i,f.tile))stop('Podの接続なし');
      if(f.type==='solar'||f.type==='battery')continue;
      if(!flow.blocked){
        flow.missing=Object.entries(b.input||{}).filter(([k,n])=>t.stock[k]<n).map(([k,n])=>({resource:k,amount:n-t.stock[k]}));
        if(flow.missing.length)stop('材料不足');
        else if(Math.max(0,b.power-energy)>battery)stop('電力不足');
      }
      if(!flow.blocked){
        const need=Math.max(0,b.power-energy);energy=Math.max(0,energy-b.power);battery-=need;used+=b.power;flow.power=b.power;
        for(const[k,n]of Object.entries(b.input||{})){t.stock[k]-=n;t.lastBalance[k].processing+=n;flow.input[k]=n;}
        for(const[k,n]of Object.entries(b.out||{})){const amount=n+(f.type==='workshop'&&record.upgraded&&k==='parts'?1:0);t.stock[k]+=amount;t.lastBalance[k].produced+=amount;flow.output[k]=amount;}
        if(!record.firstProducedRound&&Object.keys(b.out||{}).length){record.firstProducedRound=state.round;addLog('初生産：'+b.name,teams[i]+'の'+b.name+'が最初の資源を作った。',i);}
      }
      t.lastFlows.push(flow);
    }
    const charged=Math.min(capacity-battery,energy);
    t.battery=Math.round((battery+charged)*10)/10;
    t.lastEnergy={supply:generation,demand:used,requested:baseDemand+fs.reduce((n,f)=>n+buildings[f.type].power,0),pods:podPower,capacity,charged,discharged:batteryStart-battery,curtailed:energy-charged};
    // Relay Pods are unmanned. They use power, not a hidden extra ration of food, water and oxygen.
    const consumption=1;
    for(const k of ['water','oxygen','food']){const available=t.stock[k];t.stock[k]=Math.max(0,Math.round((available-consumption)*10)/10);t.lastBalance[k].life=Math.round((available-t.stock[k])*10)/10;t.lastBalance[k].unmet=Math.max(0,Math.round((consumption-available)*10)/10);}
    const empty=['water','oxygen','food'].filter(k=>t.lastBalance[k].unmet>0);
    if(empty.length){t.shortage++;addLog('補給が不足',teams[i]+'の'+empty.map(k=>names[k]).join('・')+'が不足。あと'+Math.max(0,3-t.shortage)+'ラウンドで退避。',i);}else t.shortage=0;
    if(!empty.length)t.dp+=4;
    for(const u of t.units){
      u.moved=false;u.acted=false;u.cooldown=Math.max(0,u.cooldown-1);
      if(inComms(i,u.x,u.y)&&u.localSurveys?.length){for(const index of u.localSurveys)state.tiles[index].surveyed[i]=true;u.localSurveys=[];addLog('観測を共有',teams[i]+'のローバーが基地へ調査結果を送信。',i);}
      if(inSupply(i,u.x,u.y)){u.unsupplied=0;if(u.hp<unitMaxHp(u)&&t.stock.parts>=1){t.stock.parts--;t.lastBalance.parts.maintenance++;u.hp++;}}
      else{u.unsupplied++;if(u.unsupplied>=3)u.hp=Math.max(1,u.hp-1);}
    }
    t.lastNetAll=Object.fromEntries(Object.keys(names).map(k=>[k,Math.round((t.stock[k]-before[k])*10)/10]));
    t.lastNet=Object.fromEntries(['water','oxygen','food'].map(k=>[k,t.lastNetAll[k]]));
  }
  function eventBoundary(){if(state.round===4){state.warning='storm';addLog('砂嵐の予報','次のラウンドから2ラウンド、太陽光発電が低下する。');}if(state.round===5){state.event={type:'storm',remaining:2};state.warning=null;addLog('砂嵐が到来','蓄電と設備の優先順位が試される。');}else if(state.event){state.event.remaining--;if(state.event.remaining<=0){addLog('空が晴れた','設備の発電量が回復。');state.event=null;}}
    if(state.round>=8&&state.round===state.nextEventRound-1&&!state.event){const pool=['storm','fault'];state.warning=pool[Math.floor(rng()*pool.length)];addLog('環境警報',`${eventName(state.warning)}の予報。次のラウンドに備えよう。`);}
    if(state.round>=9&&state.round===state.nextEventRound&&!state.event){state.event={type:state.warning||'storm',remaining:state.warning==='storm'?2:1};state.warning=null;state.nextEventRound=state.round+4+Math.floor(rng()*3);addLog(eventName(state.event.type)+'が発生',eventDescription(state.event.type));if(state.event.type==='fault')for(let i=0;i<2;i++){const options=[...team(i).facilities,...state.tiles.filter(q=>q.facility?.owner===i).map(q=>q.facility)].filter(q=>!q.broken&&q.type!=='solar');if(options.length){const chosen=options[Math.floor(rng()*options.length)];chosen.broken=true;addLog('設備が故障',`${teams[i]}の${buildings[chosen.type].name}に修理が必要。`,i);}}}
  }
  function eventName(type){return{storm:'砂嵐',radiation:'太陽高エネルギー粒子',fault:'設備故障'}[type]||'環境変化';}
  function eventDescription(type){return{storm:'太陽光発電と観測が低下。',radiation:'有人作業を制限。避難所か自動化が役に立つ。',fault:'両陣営の設備に修理が必要。'}[type]||'';}
  function siegeCheck(){for(let i=0;i<2;i++){const core=team(i).bases.find(b=>b.kind==='core');if(core?.siegeBy!=null&&state.round>core.siegeRound+1){state.outcome=core.siegeBy===0?'victory':'defeat';addLog('中枢基地を占領',`${teams[core.siegeBy]}が${teams[i]}の中枢基地を保持した。`,core.siegeBy);}}}
  function endRound(){
    if(state.outcome||roundProcessing)return false;
    const checkpoint=JSON.stringify(state);
    roundProcessing=true;
    try{
      aiTurn();state.round++;eventBoundary();
      for(let i=0;i<2;i++)production(i);
      const lost=state.teams.map(t=>t.shortage>=3);
      if(lost.some(Boolean)){state.outcome=lost.every(Boolean)?'draw':lost[0]?'defeat':'victory';addLog('基地から退避',lost.every(Boolean)?'両陣営の補給が途絶えた。':`${teams[lost[0]?0:1]}の補給が続かず対戦終了。`);}
      if(!state.outcome)siegeCheck();
      roundProcessing=false;save();render();return true;
    }catch(error){
      state=JSON.parse(checkpoint);roundProcessing=false;save();render();console.error('Round rolled back',error);
      toast(window.HematiteI18n?.lang==='en'?'Turn processing was restored. Please try again.':'ターン処理を戻しました。もう一度試してください。');return false;
    }
  }
  function aiTurn(){const i=1,t=team(i);if(state.outcome)return;
    // All AI spending and movement goes through the same public rules as the player.
    for(const [type,resource] of [['greenhouse','food'],['oxygenPlant','oxygen'],['waterPlant','water']])if(t.stock[resource]<8&&!t.facilities.some(q=>q.type===type)&&canBuildBase(i,type)){buildBase(i,type);break;}
    for(const q of state.tiles)if((q.outpost||baseAt(q.x,q.y)?.kind==='relay'&&baseAt(q.x,q.y)?.owner!==i&&baseAt(q.x,q.y)?.hp===0)&&t.units.some(u=>u.kind==='worker'&&!u.acted&&distance(u,q)<=1)&&canPay(t,3,{parts:1})){capture(i,q.x,q.y);break;}
    const plan=['ice','water','electrolysis','farming','storage','climbing','mineral','moxie','recycling','printing','smelting','metalwork','beam','ceramics'];
    for(const id of plan)if(!t.tech.includes(id)&&scienceReady(i,id)){research(i,id);break;}
    for(const q of state.tiles)if(q.resource&&!q.surveyed[i]&&t.units.some(u=>u.kind==='scout'&&!u.acted&&distance(u,q)<=1)){survey(i,q.x,q.y);break;}
    const want=['iceMine','waterPlant','oxygenPlant','greenhouse','solar','battery','moxie','mine','recycler','workshop','smelter','regolithPit','kiln'];
    for(const type of want){if((buildings[type].resource?state.tiles.some(q=>q.facility?.owner===i&&q.facility.type===type):t.facilities.some(q=>q.type===type)))continue;if(buildings[type].resource){const q=state.tiles.find(v=>canBuild(i,type,v.x,v.y));if(q&&build(i,type,q.x,q.y))break;}else if(canBuildBase(i,type)){buildBase(i,type);break;}}
    const core=team(0).bases[0];for(const u of [...t.units]){if(state.outcome)break;const enemy=team(0).units.find(v=>visible(i,v.x,v.y)&&distance(u,v)<=unitKinds[u.kind].range),b=distance(u,core)<=unitKinds[u.kind].range?core:null;const out=state.tiles.filter(q=>q.outpost||baseAt(q.x,q.y)?.kind==='relay'&&baseAt(q.x,q.y)?.owner!==i).sort((a,b)=>distance(u,a)-distance(u,b))[0];const hostilePod=out&&!out.outpost?baseAt(out.x,out.y):null;if(u.kind==='sentry'&&!u.deployed&&(enemy||b||hostilePod&&distance(u,out)<=unitKinds[u.kind].range)){deploy(i,u.id);continue;}if(enemy&&attack(i,u.id,enemy.x,enemy.y))continue;if(b&&attack(i,u.id,b.x,b.y))continue;if(hostilePod?.hp>0&&attack(i,u.id,out.x,out.y))continue;if(u.kind==='worker'&&out&&distance(u,out)<=1&&canPay(t,3,{parts:1})&&(!hostilePod||hostilePod.hp===0)){capture(i,out.x,out.y);continue;}const goal=(u.kind==='worker'||u.kind==='scout')&&out&&(u.kind!=='worker'||canPay(t,3,{parts:1}))?out:core;if(u.kind==='sentry'&&u.deployed&&distance(u,goal)>2){deploy(i,u.id);continue;}const route=routeTo(i,u,goal,goal===core?unitKinds[u.kind].range:1);if(route.length){const dest=route[Math.min(unitKinds[u.kind].move,route.length)-1];move(i,u.id,dest.x,dest.y);}}
    const ownCore=t.bases.find(b=>b.kind==='core');if(ownCore.siegeBy!=null)repair(i,ownCore.x,ownCore.y);const broken=t.facilities.findIndex(q=>q.broken);if(broken>=0&&canPay(t,2,{parts:1}))repairBase(i,broken);if(!ownCore.reinforced&&t.stock.ceramic>=1&&t.dp>=5)reinforceCore(i);
    const kinds=t.tech.includes('beam')&&t.stock.metal>=1?['sentry','worker','scout']:['worker','scout'];const lifeReady=['iceMine','waterPlant','oxygenPlant','greenhouse'].every(type=>buildings[type].resource?state.tiles.some(q=>q.facility?.owner===i&&q.facility.type===type):t.facilities.some(q=>q.type===type));if(lifeReady&&t.units.length<5&&t.dp>=9&&t.stock.parts>=3)for(const kind of kinds)if(recruit(i,kind))break;
  }
  function canBuild(i,type,x,y){const t=tile(x,y),b=buildings[type];return !!(!state.outcome&&t&&b?.resource&&!t.facility&&!t.outpost&&!baseAt(x,y)&&!unitAt(x,y)&&resourceConnected(i,t)&&(t.terrain!=='mountain'||team(i).tech.includes('climbing'))&&(!b.tech||team(i).tech.includes(b.tech))&&t.resource===b.resource&&t.surveyed[i]&&canPay(team(i),b.dp,b.cost));}
  function save(){if(roundProcessing)return;try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
  function load(){const data=localStorage.getItem(KEY);if(!data){if(localStorage.getItem('hematite-arcadia-civilization-v4')||localStorage.getItem('hematite-arcadia-crater-v2'))loadWarning=window.HematiteI18n?.lang==='en'?'New match: life support is installed. Your earlier save is preserved.':'生命維持設備つきの新しい対戦を開始しました。以前の保存は残しています。';return null;}try{const raw=JSON.parse(data);if(raw?.version===5&&raw.teams?.length===2&&raw.tiles?.length===121&&raw.teams.every(t=>t.stock&&Array.isArray(t.units)&&Array.isArray(t.facilities))&&raw.tiles.every(q=>Number.isFinite(q.elevation)))return raw;loadWarning='保存データの形式が合わないため、新しい対戦を開始しました。';}catch{loadWarning='保存データを読み取れなかったため、新しい対戦を開始しました。';}return null;}
  function reset(){if($('result-dialog').open)$('result-dialog').close();if($('turn-dialog').open)$('turn-dialog').close();turnBusy=false;turnHighlights=[];roundAttacks=[];state=fresh();selected={x:3,y:7};selectedUnitId=null;pendingAttack=null;selectedTech='electrolysis';mapZoom=document.documentElement.classList.contains('desktop-game')?1:2.3;mode=null;sheetExpanded=document.documentElement.classList.contains('desktop-game');buildPicker=false;recruitPicker=false;page='map';addLog('Arcadia Planitiaに着陸','二つの開拓団が、同じ火星の地形を調べ、文明を育てる。');save();showPage('map');focusTile(2,8);}
  function toast(msg){$('toast').textContent=window.HematiteI18n?.lang==='en'?window.HematiteI18n.translate(msg):msg;$('toast').classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.add('hidden'),3000);}
  function saveUi(){try{if(!$('map-page').classList.contains('hidden')){cameraLeft=$('map-scroller').scrollLeft;cameraTop=$('map-scroller').scrollTop;}if(!$('lab-page').classList.contains('hidden')){treeLeft=$('tree-window').scrollLeft;treeTop=$('tree-window').scrollTop;}sessionStorage.setItem('hematite-ui-v2',JSON.stringify({uiVersion:2,selected,selectedUnitId,selectedTech,mapZoom,techZoom,page,scrollLeft:cameraLeft,scrollTop:cameraTop,techLeft:treeLeft,techTop:treeTop}));}catch{}}
  function loadUi(){try{const v=JSON.parse(sessionStorage.getItem('hematite-ui-v2')||'null');if(v&&inBounds(v.selected?.x,v.selected?.y)){selected=v.selected;selectedUnitId=v.selectedUnitId;selectedTech=v.selectedTech||selectedTech;mapZoom=Math.max(1,Math.min(3,Number(v.mapZoom)||2.3));techZoom=Math.max(.7,Math.min(1.5,Number(v.techZoom)||1));cameraLeft=v.scrollLeft||0;cameraTop=v.scrollTop||0;treeLeft=v.techLeft||0;treeTop=v.techTop||0;return v;}}catch{}return null;}
  function showPage(id){saveUi();page=id;$('menu-popup').classList.add('hidden');$('menu-toggle').setAttribute('aria-expanded','false');document.querySelector('.app').classList.toggle('map-active',id==='map');document.querySelector('.app').classList.toggle('lab-active',id==='lab');document.querySelector('.app').classList.toggle('base-active',id==='base');for(const name of ['map','base','lab','log','observe'])$(`${name}-page`).classList.toggle('hidden',name!==id);document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));render();if(id==='map'){updateCamera(false);$('map-scroller').scrollLeft=cameraLeft;$('map-scroller').scrollTop=cameraTop;}if(id==='lab'){$('tree-window').scrollLeft=treeLeft;$('tree-window').scrollTop=treeTop;}saveUi();}
  function locateTech(id){const type=Object.keys(buildings).find(k=>buildings[k].tech===id);if(!type)return false;const b=buildings[type];if(!b.resource){baseTab=['solar','battery'].includes(type)?'power':['greenhouse','waterPlant','oxygenPlant','moxie'].includes(type)?'life':'materials';showPage('base');return true;}const target=state.tiles.find(q=>canBuild(0,type,q.x,q.y))||state.tiles.find(q=>q.resource===b.resource&&visible(0,q.x,q.y));if(!target)return false;selected={x:target.x,y:target.y};selectedUnitId=null;sheetExpanded=true;showPage('map');focusTile(target.x,target.y);return true;}
  function choose(x,y){
    const own=unitAt(x,y),q=tile(x,y),attacker=team(0).units.find(u=>u.id===selectedUnitId);
    if(mode){const ok=mode.type==='move'?move(0,mode.id,x,y):attack(0,mode.id,x,y);if(ok){mode=null;selected={x,y};selectedUnitId=own?.owner===0?own.unit.id:mode?.id;sheetExpanded=false;render();saveUi();return;}toast('ここには行動できません。');return;}
    if(own?.owner===0){selected={x,y};selectedUnitId=own.unit.id;pendingAttack=null;buildPicker=false;recruitPicker=false;sheetExpanded=document.documentElement.classList.contains('desktop-game');render();saveUi();return;}
    if(q?.resource&&!q.surveyed[0]&&team(0).units.some(u=>u.kind==='scout'&&!u.acted&&distance(u,q)<=1)){selected={x,y};selectedUnitId=null;pendingAttack=null;buildPicker=false;recruitPicker=false;sheetExpanded=true;render();saveUi();return;}
    if(attacker&&canMove(0,attacker.id,x,y)){move(0,attacker.id,x,y);selected={x,y};pendingAttack=null;sheetExpanded=!!tile(x,y).resource||document.documentElement.classList.contains('desktop-game');render();saveUi();return;}
    if(attacker&&canAttack(0,attacker.id,x,y)){selected={x,y};pendingAttack={id:attacker.id,x,y};sheetExpanded=true;render();saveUi();return;}
    selected={x,y};selectedUnitId=null;pendingAttack=null;buildPicker=false;recruitPicker=false;sheetExpanded=true;render();saveUi();
  }
  function action(label,command,sub='',disabled=false,primary=false){return `<button class="action ${primary?'primary':''}" data-action="${command}" ${disabled?'disabled':''}>${label}${sub?`<small>${sub}</small>`:''}</button>`;}
  function focusSite(x,y){
    if($('detail-dialog').open)$('detail-dialog').close();
    selected={x,y};selectedUnitId=null;pendingAttack=null;sheetExpanded=true;
    showPage('map');focusTile(x,y);
  }
  function resourceOwnerLabel(q){
    const en=window.HematiteI18n?.lang==='en',owner=areaOwner(q.x,q.y)?.owner;
    return owner===0?(en?'Yours':'自軍'):owner===1?(en?'Rival':'敵軍'):(en?'Neutral':'中立');
  }
  function resourceRoute(q){
    if(!q.resource||!visible(0,q.x,q.y))return {html:'',buttons:''};
    const en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x,t=team(0),f=q.facility;
    const type={ice:'iceMine',iron:'mine',regolith:'regolithPit'}[q.resource],b=buildings[type],area=areaOwner(q.x,q.y),connected=resourceConnected(0,q);
    const target=area||state.tiles.filter(v=>v.outpost&&distance(v,q)<=2).sort((a,b)=>distance(a,q)-distance(b,q))[0];
    const surveyed=q.surveyed[0],equipped=f?.owner===0,readyTech=!b.tech||t.tech.includes(b.tech);
    const stopped=equipped?forecast(0).extractors.find(v=>v.x===q.x&&v.y===q.y)?.blocked:'';
    const steps=[
      [connected,en?'Control + connect':'確保・接続'],[surveyed,en?'Survey':'調査'],[equipped,en?'Equip extractor':'採取装備'],[equipped&&connected&&!stopped,en?'Deliver to HQ':'本拠地へ搬入']
    ];
    let message='',buttons='';
    if(!connected){
      message=area?.owner===1?(en?'Capture the rival base controlling this source.':'この資源を担当する敵拠点を奪おう。'):area?.owner===0?(en?'Reconnect this Pod to HQ to resume deliveries.':'担当Podを本拠地につなぎ直すと搬入が再開する。'):(en?'Capture the nearby Pod to claim this source.':'近くのPodを確保すると、この資源が自軍の担当になる。');
      if(target)buttons+=action(en?'Show controlling base':'担当拠点を見る',`focus-site:${target.x},${target.y}`,'',false,true);
    }else if(!surveyed){
      const scout=t.units.find(v=>v.kind==='scout'&&!v.acted&&distance(v,q)<=1);
      const local=t.units.find(v=>v.localSurveys?.includes(idx(q.x,q.y)));
      message=local?(en?'Survey stored on rover. Return it to communications range.':'調査結果はローバーに保存中。通信圏へ戻して共有しよう。'):en?'Move a rover next to the source, then survey it.':'観測ローバーを隣へ動かし、現地で調べよう。';
      buttons+=local?action(en?'Select rover':'ローバーを選ぶ',`select-unit:${local.id}`):scout?action(en?'Survey site':'現地で調べる','survey','',false,true):action(en?'Select rover':'ローバーを選ぶ','select-kind:scout','',!t.units.some(v=>v.kind==='scout'),true);
    }else if(!readyTech){
      message=en?'Research the extraction method, then equip this site.':'採取技術を研究してから、この地点に装備を置こう。';
      buttons+=action(en?'Research extraction':'採取技術を研究',`base-research:${b.tech}`,`${en?'Industry':'開発力'} ${techs.find(v=>v.id===b.tech).cost}`,false,true);
    }else if(!equipped){
      message=en?'Pay once for an extractor. Raw material arrives after each turn.':'採取装備を一度配備すると、ターン終了ごとに原料が届く。';
      const reason=buildReason(0,type,q.x,q.y);
      buttons+=action(en?'Start extraction':'採取を開始',`build:${type}`,reason||`${en?'Industry':'開発力'} ${b.dp} · ${n(costText(b.cost))}`,!canBuild(0,type,q.x,q.y),true);
      const occupant=unitAt(q.x,q.y);if(occupant?.owner===0)buttons+=action(en?'Select unit to clear site':'機体を選んで移動',`select-unit:${occupant.unit.id}`);
    }else if(f.broken){message=en?'Extractor broken. Repair it to resume deliveries.':'採取装備が故障。修理すると搬入が再開する。';buttons+=action(en?'Repair extractor':'採取装備を修理','repair',`${en?'Industry':'開発力'} 2 · ${en?'Parts':'部品'} 1`,!canPay(t,2,{parts:1}),true);}
    else if(stopped){message=(en?'Next turn: delivery stopped — ':'次ターンの搬入停止：')+n(stopped);buttons+=action(en?'Check power at HQ':'本拠地の電力を見る','base-system:power','',false,true);}
    else{message=en?'Automatic delivery at turn end. Keep the source and its connection safe.':'ターン終了時に自動搬入。資源地点と接続拠点を守ろう。';buttons+=action(en?'See production at HQ':'本拠地で生産を見る','open-base','',false,true);}
    const raw=Object.keys(b.out)[0],chain=q.resource==='ice'?['ice','water','oxygen','food']:q.resource==='iron'?['ore','metal']:['regolith','ceramic'];
    const output=en?`${n(names[raw])} +${b.out[raw]} / turn when powered`:`稼働時 ${n(names[raw])} +${b.out[raw]}／ターン`;
    return {buttons,html:`<div class="resource-route"><b>${resourceOwnerLabel(q)} · ${output}</b><ol>${steps.map(([done,label])=>`<li class="${done?'done':''}">${done?'✓ ':''}${label}</li>`).join('')}</ol><p>${message}</p><div class="resource-chain">${chain.map((id,j)=>`${j?`<span>${q.resource==='ice'&&j===3?'+':'→'}</span>`:''}${icon(id)}<span>${n(names[id])}</span>`).join('')}</div></div>`};
  }
  function resourceTargets(){
    const en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x;
    const sites=state.tiles.filter(q=>q.resource&&visible(0,q.x,q.y));
    const pods=state.tiles.filter(q=>q.outpost||baseAt(q.x,q.y)?.kind==='relay');
    const row=q=>{const pod=baseAt(q.x,q.y),isPod=q.outpost||pod?.kind==='relay',label=isPod?'Pod':n(resourceName[q.resource]);return `<button data-action="focus-site:${q.x},${q.y}">${icon(isPod?'outpost':resourceIcon[q.resource])}<span><b>${label} · ${q.x+1},${q.y+1}</b><small>${isPod?(pod?.owner===0?en?'Yours':'自軍':pod?.owner===1?en?'Rival':'敵軍':en?'Neutral':'中立'):resourceOwnerLabel(q)} · ${isPod?en?'Control nearby sources':'周囲の資源を確保':q.facility?.owner===0?en?'Extractor installed':'採取装備あり':en?'Select for next step':'選ぶと入手手順へ'}</small></span><span>→</span></button>`;};
    return `<p>${en?'Capture Pods to control nearby sources. Survey → equip → automatic delivery. HQ turns ice into water, oxygen and food.':'Podを奪って周囲の資源を確保。調査 → 採取装備 → 自動搬入。本拠地で氷から水・酸素・食料を作る。'}</p><div class="resource-targets">${sites.map(row).join('')}<h3>${en?'Pods to contest':'奪い合うPod'}</h3>${pods.map(row).join('')}</div><p>${en?'Explore with a rover to reveal more sources.':'観測ローバーで探索すると、ほかの資源候補も見つかる。'}</p>`;
  }
  function renderMap(){const map=$('map');let html='';for(const q of state.tiles){const unit=unitAt(q.x,q.y),base=baseAt(q.x,q.y),f=q.facility,known=visible(0,q.x,q.y),sel=selected.x===q.x&&selected.y===q.y,moveTarget=selectedUnitId!=null&&canMove(0,selectedUnitId,q.x,q.y),attackTarget=selectedUnitId!=null&&canAttack(0,selectedUnitId,q.x,q.y),owner=areaOwner(q.x,q.y);let entity='';if(base){const count=team(base.owner).facilities.length,stage=base.kind==='core'?(count>=6?'core3':count>=3?'core2':'core'):'outpost';entity=`<span class="entity base ${base.owner?'ai':'me'} ${base.hp<5?'damaged':''}" title="${teams[base.owner]}の基地">${icon(stage)}</span><span class="hp">${base.hp}</span>`;}else if(unit&&known)entity=`<span class="entity ${unit.owner?'ai':'me'} ${unit.unit.deployed?'deployed':''} ${unit.unit.moved&&unit.unit.acted?'spent':''} ${unit.unit.hp<unitMaxHp(unit.unit)?'damaged':''}" title="${teams[unit.owner]}の${unitKinds[unit.unit.kind].name}">${icon(unit.unit.kind)}</span><span class="hp">${unit.unit.hp}</span>`;else if(f&&known)entity=`<span class="entity facility ${f.owner?'ai':'me'} ${f.type} ${f.broken?'broken':''} ${f.hp<3?'damaged':''}" title="${teams[f.owner]}の${buildings[f.type].name}">${icon(f.type)}</span>`;else if(q.outpost)entity=`<span class="entity outpost">${icon('outpost')}</span>`;else if(q.terrain==='mountain'&&known)entity=`<span class="entity mountain-art">${icon('mountain')}</span>`;
       html+=`<button class="tile ${sel?'selected':''} ${moveTarget?'move-target':''} ${attackTarget?'attack-target':''} ${q.terrain==='mountain'?'mountain':''} ${state.tutorial&&q.x===3&&q.y===7&&!q.surveyed[0]?'first-goal':''} ${turnHighlights.includes(idx(q.x,q.y))?'enemy-step':''}" data-x="${q.x}" data-y="${q.y}" data-area="${owner?.owner??""}" data-connected="${owner?resourceConnected(owner.owner,q):false}" aria-label="${q.x+1},${q.y+1} ${base?`${teams[base.owner]}の基地`:unit&&known?`${teams[unit.owner]}の${unitKinds[unit.unit.kind].name}`:f&&known?`${teams[f.owner]}の${buildings[f.type].name}`:q.resource&&known?resourceName[q.resource]:q.terrain==='mountain'?'山':'地表'}${moveTarget?'、移動可能':''}${attackTarget?'、攻撃可能':''}${f?.blocked?`、${f.blocked}`:''}${f?.upgraded||unit?.unit.armored?'、強化済み':''}">${base?.kind==="relay"?`<span class="pod-mark">Pod</span>`:""}${q.resource&&known?`<span class="source-owner ${owner?.owner===0?'ours':owner?.owner===1?'rival':'neutral'}">${resourceOwnerLabel(q)}</span>`:''}${q.outpost?'<span class="pod-mark">Pod</span>':''}${q.resource&&known?`<span class="resource ${q.surveyed[0]?'surveyed':''}">${icon(resourceIcon[q.resource])}${q.surveyed[0]?'':'<b>?</b>'}</span>`:''}${entity}${f?.blocked&&known?`<span class="status-mark" title="${f.blocked}">!</span>`:''}${f?.firstProducedRound===state.round&&known?'<span class="production-mark" title="初生産">+</span>':''}${(f?.upgraded||unit?.unit.armored)&&known?`<span class="upgrade-mark" title="金属で強化済み">${icon('metal')}</span>`:''}${!known?'<span class="fog"></span>':''}</button>`;}
    map.innerHTML=html;
    const focus=tile(selected.x,selected.y),showLinks=!!(focus.resource||baseAt(focus.x,focus.y)?.kind==='relay');
    if(showLinks){const lines=[];for(let i=0;i<2;i++){const core=team(i).bases.find(b=>b.kind==='core');for(const pod of team(i).bases.filter(b=>b.kind==='relay')){const possible=team(i).bases.filter(b=>b!==pod&&distance(b,pod)<=4).sort((a,b)=>distance(a,pod)-distance(b,pod));const parent=possible[0]||core;lines.push(`<line x1="${(parent.x+.5)*100/SIZE}%" y1="${(parent.y+.5)*100/SIZE}%" x2="${(pod.x+.5)*100/SIZE}%" y2="${(pod.y+.5)*100/SIZE}%" class="${connectedNodes(i).includes(pod)?'connected':'disconnected'} team-${i}"/>`);}}map.insertAdjacentHTML('beforeend',`<svg class="pod-links" aria-hidden="true">${lines.join('')}</svg>`);}
  }
  function buildReason(i,type,x,y){const q=tile(x,y),b=buildings[type],t=team(i);if(q.terrain==='mountain'&&!t.tech.includes('climbing'))return '研究：登坂技術';if(b.tech&&!t.tech.includes(b.tech))return `研究：${techs.find(v=>v.id===b.tech)?.name}`;if(b.resource&&(q.resource!==b.resource||!q.surveyed[i]))return '先に現地調査';if(b.resource&&!ownsArea(i,x,y))return '担当Podを確保';if(b.resource&&!resourceConnected(i,q))return 'Podを本拠地へ接続';if(t.dp<b.dp)return `開発力が${b.dp-t.dp}不足`;for(const[k,n]of Object.entries(b.cost))if((t.stock[k]||0)<n)return `${names[k]}が${n-t.stock[k]}不足`;if(unitAt(x,y))return '機体がいる';return '';
  }
  let baseTab='life',baseFocus='waterPlant';
  const baseGroups={life:['waterPlant','oxygenPlant','moxie','greenhouse'],power:['solar','battery'],materials:['recycler','workshop','smelter','kiln']};
  function renderBase(){
    const t=team(0),en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x;
    if(!baseGroups[baseTab].includes(baseFocus))baseFocus=baseGroups[baseTab][0];
    const tabs=[['life',en?'Life support':'生命維持'],['power',en?'Power':'電力'],['materials',en?'Materials':'素材']];
    const f=forecast(0),scienceFor={waterPlant:'water',oxygenPlant:'electrolysis',moxie:'moxie',greenhouse:'farming',solar:'storage',battery:'storage',recycler:'recycling',workshop:'printing',smelter:'smelting',kiln:'ceramics'};
    const cell=id=>`<span>${icon(id)}${n(buildings[id]?.name||names[id]||id)}</span>`;
    const row=ids=>`<div class="base-flow-row">${ids.map((id,j)=>`${cell(id)}${j<ids.length-1?'<b>→</b>':''}`).join('')}</div>`;
    const flow=baseTab==='life'?row(['ice','waterPlant','water','oxygenPlant','oxygen'])+row(['water','greenhouse','food'])+row(['moxie','oxygen']):baseTab==='power'?row(['solar','battery','oxygenPlant']):row(['ore','smelter','metal'])+row(['recycler','workshop','parts']);
    const recipe=(type,b)=>{let input=Object.entries(b.input||{}).map(([k,v])=>`${n(names[k])} ${v}`).join(' + ');if(type==='moxie')input='CO₂ ('+(en?'air':'大気')+')';if(type==='greenhouse')input+=' + '+(en?'seeds · nutrients · light':'種・養分・光');if(type==='solar')input=en?'Sunlight':'日光';if(type==='battery')input=en?'Surplus power':'余剰電力';return `${input}${b.power?` + ⚡${b.power}`:''} → ${Object.entries(b.out||{}).map(([k,v])=>`${n(names[k])} ${v}`).join(' + ')|| (b.generator?`⚡${b.generator}`:b.capacity?`${en?'Stored power':'蓄電容量'} +${b.capacity}`:'')}`;};
    const cards=baseGroups[baseTab].map(type=>{const b=buildings[type],built=t.facilities.filter(v=>v.type===type),ready=canBuildBase(0,type),missingTech=b.tech&&!t.tech.includes(b.tech),missingMaterials=Object.entries(b.cost||{}).filter(([k,v])=>t.stock[k]<v).map(([k,v])=>`${n(names[k])} ${v-t.stock[k]}`).join(' + '),missing=missingTech?`${en?'Research':'研究'} ${n(techs.find(x=>x.id===b.tech)?.name)}`:missingMaterials?`${en?'Need':'不足'} ${missingMaterials}`:t.dp<b.dp?`${en?'Need Industry':'開発力不足'} ${b.dp-t.dp}`:'',index=t.facilities.findIndex(v=>v.type===type),status=index>=0?n(f.facilities[index]?.blocked||'稼働見込み'):missing||`${en?'Industry':'開発力'} ${b.dp} · ${n(costText(b.cost))}`,lesson=scienceFor[type];return `<article class="base-device ${baseFocus===type?'focused':''}" data-device="${type}"><button class="base-device-choice" data-action="base-select:${type}" aria-label="${en?'Details of':'詳細'} ${n(b.name)}">${icon(type)}</button><div class="base-device-info"><button class="base-name-button" data-action="base-select:${type}"><b>${n(b.name)} ${built.length?`×${built.length}`:''}</b></button><small>${status}${built.some(v=>v.starter)?` · ${en?'Initial equipment':'初期装備'}`:''}</small><small class="base-recipe">${recipe(type,b)}</small>${missingTech?`<button class="base-tech-link" data-action="base-research:${b.tech}">${en?'Go to research ↗':'研究へ ↗'}</button>`:''}${lesson?`<a href="learn/lesson.html?tech=${lesson}&lang=${en?'en':'ja'}" target="_blank" rel="noopener">${en?'How it works ↗':'仕組みを学ぶ（英語）↗'}</a>`:''}</div><button data-action="base-build:${type}" ${ready?'':'disabled'}>${built.length?en?'Expand':'増設':en?'Build':'建設'}</button></article>`;}).join('');
    const focused=buildings[baseFocus],preview=previewBaseBuild(0,baseFocus),shown=t.facilities.filter(v=>v.type===baseFocus),diff=preview?Object.keys(names).map(k=>{const change=Math.round((preview.after.netAll[k]-preview.before.netAll[k])*10)/10;return change?`${icon(k)} ${n(names[k])} ${change>0?'+':''}${change}`:'';}).filter(Boolean).join(' · '):'',focusLesson=scienceFor[baseFocus];
    const detail=`<aside class="base-device-detail"><h3>${icon(baseFocus)} ${n(focused.name)}</h3><p>${recipe(baseFocus,focused)}</p><p>${en?'Built':'建設済み'}: ${shown.length} · ${en?'Cost':'建設費'}: ${en?'Industry':'開発力'} ${focused.dp}, ${n(costText(focused.cost))}</p>${preview?`<p>${en?'Change in next-turn production balance':'増設による次ターンの収支変化'}: ${diff|| (en?'No material increase; check inputs and power.':'物資の増加なし。原料・電力を確認。')} · ⚡ ${preview.before.energy.supply}→${preview.after.energy.supply} ${en?'made':'発電'} / ${preview.before.energy.demand}→${preview.after.energy.demand} ${en?'used':'使用'}</p><p>${preview.blocked?`${en?'Will stop':'停止見込み'}: ${n(preview.blocked)}`:en?'Expected to run':'稼働見込み'}</p>`:''}${baseFocus==='solar'?`<p>${en?'Power supports more machines. Extra power alone cannot make water or food; unused power charges the battery until full.':'電力は装置を動かすためのもの。発電だけでは水や食料は増えません。余剰電力は満充電まで蓄電されます。'}</p>`:''}${focusLesson?`<a href="learn/lesson.html?tech=${focusLesson}&lang=${en?'en':'ja'}" target="_blank" rel="noopener">${en?'Explore the science ↗':'仕組みを学ぶ（英語）↗'}</a>`:''}</aside>`;
    const modules=t.facilities.filter((v,j,all)=>all.findIndex(q=>q.type===v.type)===j).map(v=>`<span class="base-module ${v.type}">${icon(v.type)}<small>${n(buildings[v.type].name)}${t.facilities.filter(q=>q.type===v.type).length>1?' ×'+t.facilities.filter(q=>q.type===v.type).length:''}</small></span>`).join('');
    const broken=t.facilities.map((v,j)=>v.broken?`<button class="base-more" data-action="base-repair:${j}">${en?'Repair':'修理'} ${n(buildings[v.type].name)} · ${en?'Parts':'部品'} 1</button>`:'').join('');
    const core=t.bases.find(v=>v.kind==='core'),fortify=core.reinforced?`<p class="base-fortify">${en?'Habitat reinforced':'中枢基地を補強済み'} · HP ${core.hp} / ${core.maxHp}</p>`:t.tech.includes('ceramics')?`<button class="base-more" data-action="base-fortify" ${canPay(t,3,{ceramic:1,parts:1})?'':'disabled'}>${en?'Reinforce habitat':'中枢基地を補強'} · ${en?'Ceramic':'焼成材'} 1 + ${en?'Parts':'部品'} 1</button>`:'';
    const fleet=['scout','worker','sentry'].map(kind=>{const d=unitKinds[kind],ready=(!d.tech||t.tech.includes(d.tech))&&canPay(t,d.dp,d.cost)&&!unitAt(1,9);return `<button data-action="base-recruit:${kind}" ${ready?'':'disabled'}>${icon(kind)} ${n(d.name)} · ${n(costText(d.cost))}</button>`;}).join('');
    $('base-content').innerHTML=`<div class="base-title"><small>ARCADIA · CIVILIZATION</small><h1>${en?'Your Headquarters':'あなたの本拠地'}</h1><p>${en?'Life support is installed from the start. Protect its ice source and capture more resources to expand.':'生命維持設備は最初から設置済み。氷の供給を守り、資源を奪い合って生産を広げよう。'}</p></div><div class="base-overview">${['ice','water','oxygen','food'].map(k=>`<div>${icon(k)} ${n(names[k])}<b>${t.stock[k]}</b><small>${en?'Next turn':'次ターン'} ${f.netAll[k]>=0?'+':''}${f.netAll[k]}</small></div>`).join('')}<div>⚡ ${en?'Needed / made':'必要／発電'}<b>${f.energy.requested} / ${f.energy.supply}</b></div><div>ϟ ${en?'Battery':'蓄電'}<b>${t.battery}</b></div></div><div class="base-layout"><section class="base-scene"><h2>${en?'Growing base':'育つ基地'}</h2><div class="base-art"><span class="starter-panel"></span><span class="habitat"></span><span class="starter-lander"></span>${modules}</div><details class="base-fleet"><summary>${en?'Build and repair units':'機体を製作・修理'}</summary><div>${fleet}</div><p>${en?'Units are assembled here with parts and metal. A damaged unit repairs in the supply area when parts are available.':'機体は部品と金属で製作。補給圏で部品があれば損傷した機体を修理します。'}</p></details></section><section class="base-work"><h2>${en?'Make and manage':'装置を作る・動かす'}</h2><div class="base-tabs">${tabs.map(([id,label])=>`<button data-action="base-tab:${id}" aria-pressed="${baseTab===id}">${label}</button>`).join('')}</div>${baseTab==='power'?powerBalanceHtml(f):''}<div class="base-flow">${flow}</div><div class="base-list">${cards}</div>${detail}${broken}${baseTab==='materials'?fortify:''}${baseTab==='materials'&&canUpgradeWorkshop(0)?`<button class="base-more" data-action="base-upgrade-workshop">${en?'Upgrade workshop':'印刷工房を強化'}</button>`:''}</section></div>`;
  }
  function podImpact(x,y){
    const pod=baseAt(x,y),site=tile(x,y);
    if(pod?.kind!=='relay'&&!site?.outpost)return '';
    const original=state,known=original.tiles.filter(q=>q.resource&&(q.surveyed[0]||visible(0,q.x,q.y))).map(q=>({x:q.x,y:q.y}));
    const before=known.map(p=>[resourceConnected(0,tile(p.x,p.y)),resourceConnected(1,tile(p.x,p.y))]);
    const beforePods=connectedNodes(0).filter(b=>b.kind==='relay').length;
    const en=window.HematiteI18n?.lang==='en';
    try{
      state=JSON.parse(JSON.stringify(original));
      if(pod)team(pod.owner).bases=team(pod.owner).bases.filter(b=>b.x!==x||b.y!==y);
      if(pod?.owner!==0)team(0).bases.push({x,y,kind:'relay',hp:3,siegeBy:null,siegeRound:null});
      const after=known.map(p=>[resourceConnected(0,tile(p.x,p.y)),resourceConnected(1,tile(p.x,p.y))]);
      if(pod?.owner===0){
        const lost=before.filter((v,j)=>v[0]&&!after[j][0]).length;
        const isolated=Math.max(0,beforePods-connectedNodes(0).filter(b=>b.kind==='relay').length-1);
        if(!lost&&!isolated)return en?'No surveyed resource depends on this Pod yet.':'このPodに依存する調査済み資源はまだありません。';
        return en?`If lost: ${lost} known resource source${lost===1?'':'s'} would stop reaching HQ${isolated?`; ${isolated} other Pod${isolated===1?'':'s'} would lose connection`:''}.`:`失うと：確認済み資源${lost}か所の搬入が停止${isolated?`、ほかのPod${isolated}基が切断`:''}。`;
      }
      const gained=before.filter((v,j)=>!v[0]&&after[j][0]).length;
      const rivalLost=before.filter((v,j)=>v[1]&&!after[j][1]).length;
      if(!gained&&!rivalLost)return en?'Survey nearby tiles to reveal which resources this Pod could connect.':'周囲を調査すると、このPodでつながる資源が分かります。';
      return en?`If captured: ${gained} known resource source${gained===1?'':'s'} would reach your HQ${rivalLost?`; rival loses ${rivalLost}`:''}.`:`確保すると：確認済み資源${gained}か所が本拠地へ搬入可能${rivalLost?`、相手は${rivalLost}か所を喪失`:''}。`;
    }finally{state=original;}
  }
  function renderSheet(){
    const q=tile(selected.x,selected.y),u=unitAt(q.x,q.y),base=baseAt(q.x,q.y),f=q.facility,area=areaOwner(q.x,q.y),en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x;
    const title=base?n(base.kind==='core'?'中枢基地':'前哨基地'):u?n(unitKinds[u.unit.kind].name):f?n(buildings[f.type].name):q.outpost?n('無人の前哨地'):q.resource?n(resourceName[q.resource]):q.terrain==='mountain'?n('山'):n('火星の地表');
    let buttons='';
    if(pendingAttack)buttons+=action('攻撃を実行','confirm-attack','',false,true)+action('やめる','cancel-attack');
    else if(base?.owner===0&&base.kind==='core'){buttons+=action(en?'Open Headquarters':'本拠地を開く','open-base','',false,true);if(base.hp<(base.maxHp||5))buttons+=action('拠点を修理','repair','',!canPay(team(0),2,{parts:1}));}
    else if((base?.kind==='relay'&&base.owner!==0)||q.outpost)buttons+=action(base?.hp>0?(en?'Attack Pod first':'まずPodを攻撃'):(en?'Capture Pod':'Podを確保'),'capture',base?.hp>0?'':en?'Industry 3 · Parts 1':'開発力3 · 部品1',base?.hp>0||!team(0).units.some(v=>v.kind==='worker'&&!v.acted&&distance(v,q)<=1)||!canPay(team(0),3,{parts:1}),true);
    else if(q.resource&&!q.surveyed[0])buttons+=action('現地で調べる','survey','',!team(0).units.some(v=>v.kind==='scout'&&!v.acted&&distance(v,q)<=1),true);
    else if(q.resource&&q.surveyed[0]&&!f){const type={ice:'iceMine',iron:'mine',regolith:'regolithPit'}[q.resource];buttons+=action(en?'Start extraction':'採取を開始',`build:${type}`,buildReason(0,type,q.x,q.y),!canBuild(0,type,q.x,q.y),true);}
    else if(f?.owner===0&&f.broken)buttons+=action('設備を修理','repair','',!canPay(team(0),2,{parts:1}),true);
    else if(u?.owner===0&&u.unit.kind==='sentry')buttons+=action(u.unit.deployed?'放熱面をたたむ':'放熱面を展開',`deploy:${u.unit.id}`,'',u.unit.acted||!inSupply(0,u.unit.x,u.unit.y),true);
    if(q.terrain==='mountain'&&!team(0).tech.includes('climbing'))buttons+=action('登坂技術を研究','open-climbing');
    const areaText=area?`${en?'Area':'担当'}: ${n(teams[area.owner])} ${area.kind==='core'?(en?'HQ':'本拠地'):'Pod'} ${area.x+1},${area.y+1} · ${en?'Connected':'接続'}: ${resourceConnected(area.owner,q)?en?'Yes':'はい':en?'No':'いいえ'}`:en?'No assigned base':'担当拠点なし';
    const status=f?`${!resourceConnected(f.owner,q)?en?'Transport stopped: Pod disconnected':'搬入停止：Podが切断':n(f.blocked||'稼働見込み')} · ${en?'Raw material to HQ':'原料を本拠地へ搬入'}`:q.resource&&!q.surveyed[0]?en?'Survey before extraction':'採取前に調査が必要':q.resource?en?'Surveyed source':'調査済みの資源候補':base?.kind==='relay'&&base.owner!==0?en?'Attack to 0 HP, then capture with a crawler. Old extractors are removed.':'HPを0にして工作機で確保。旧採取装備は解除。':base?.kind==='relay'?en?'Links materials and supplies units':'原料を中継し機体を補給':u?.owner===0?(u.unit.moved?en?'Movement used. End the turn to move again.':'移動済み。次のターンにまた動けます。':en?'Tap a blue tile to move. Select a red rival to attack.':'青いマスをタップして移動。赤い敵を選ぶと攻撃できます。'):en?'Select a target':'対象を選択';
    const route=resourceRoute(q);
    if(q.resource&&route.html&&!pendingAttack)buttons=route.buttons;
    if((q.outpost||base?.kind==='relay'&&base.owner!==0)&&!pendingAttack)buttons+=action(en?'Select crawler':'工作機を選ぶ','select-kind:worker',en?'Move next to the Pod; capture after enemy HP reaches 0.':'Podの隣へ移動。敵PodはHPを0にしてから確保。',!team(0).units.some(v=>v.kind==='worker'));
    if(u?.owner===0&&!q.resource){buttons+=action(en?'Find resources / Pods':'資源・Podを探す','resource-targets');}
    const podPreview=(base?.kind==='relay'||q.outpost)?podImpact(q.x,q.y):'';
    $('action-sheet').classList.toggle('minimized',!sheetExpanded);$('action-sheet').innerHTML=`<button class="sheet-toggle" data-action="toggle-sheet" aria-expanded="${sheetExpanded}">${sheetExpanded?'⌄ 閉じる':'⌃ 操作を開く'}</button><div class="sheet-top"><div><small>MAP ${q.x+1} / ${q.y+1} · ${en?'Elevation':'標高'} ${q.elevation}m</small><h2>${title}</h2></div><span class="sheet-icon">${icon(base?'core':u?.unit.kind||f?.type||resourceIcon[q.resource]||'regolith')}</span></div><div class="sheet-body"><p class="sheet-desc">${status}</p><div class="sheet-meta">${areaText}${base?` · HP ${base.hp}`:''}${u?` · HP ${u.unit.hp}`:''}</div>${podPreview?`<p class="pod-impact">${podPreview}</p>`:''}<div class="actions">${buttons}</div>${route.html}</div>`;
  }  function costText(cost={}){return Object.entries(cost).map(([k,n])=>`${names[k]}${n}`).join('・')||'素材不要';}
  const techPos={climbing:[0,0],ice:[1,0],water:[2,0],electrolysis:[3,0],moxie:[3,1],farming:[3,-1],closedLoop:[4,-1],sabatier:[4,0],hopper:[5,0],mineral:[1,1],smelting:[4,1],metalwork:[5,1],beam:[6,1],storage:[1,-1],recycling:[1,2],printing:[2,2],automation:[3,2],phb:[4,2],ceramics:[1,3],glass:[2,3]};
  const availableLessons=new Set(['ice','water','electrolysis','moxie','farming','storage','mineral','smelting','metalwork','ceramics','recycling','printing']);
  let desktopUiScale=1;
  function updateDisplayScale(){
    const desktop=outerWidth>=800&&outerHeight>=500&&innerWidth>=1000&&innerHeight>=600;
    desktopUiScale=desktop?Math.min(5,Math.max(1,innerWidth/Math.max(1,outerWidth))):1;
    document.documentElement.style.setProperty('--desktop-ui-scale',String(desktopUiScale));
    document.documentElement.classList.toggle('desktop-game',desktop);
  }
  function renderTech(){
    const layoutZoom=techZoom*desktopUiScale;
    const t=team(0),v=techs.find(x=>x.id===selectedTech)||techs[0],w=104*layoutZoom,h=104*layoutZoom,gapX=44*layoutZoom,gapY=38*layoutZoom,at=id=>{const [col,row]=techPos[id];return{x:28*layoutZoom+col*(w+gapX),y:185*layoutZoom+row*(h+gapY)}};
    const path=new Set(),visit=id=>{if(path.has(id))return;path.add(id);techs.find(x=>x.id===id)?.deps.forEach(visit);};visit(v.id);
    const hub={x:28*layoutZoom,y:185*layoutZoom+h+gapY};
    const roots=techs.filter(x=>!x.deps.length).map(x=>{const b=at(x.id);return `<path d="M${hub.x+w/2} ${hub.y+h/2} Q${(hub.x+b.x+w)/2} ${(hub.y+b.y+h)/2} ${b.x+w/2} ${b.y+h/2}" class="${path.has(x.id)?'path-edge':''}"/>`;}).join('');
    const edges=roots+techs.flatMap(x=>x.deps.map(dep=>{const a=at(dep),b=at(x.id),active=path.has(dep)&&path.has(x.id);return `<path d="M${a.x+w/2} ${a.y+h/2} Q${(a.x+b.x+w)/2} ${(a.y+b.y+h)/2} ${b.x+w/2} ${b.y+h/2}" class="${active?'path-edge':''}"/>`;})).join('');
    const viewport=$('tree-window'),width=Math.max(1020*layoutZoom,viewport.clientWidth+150),height=Math.max(840*layoutZoom,viewport.clientHeight+150);
    $('tech-list').style.width=`${width}px`;$('tech-list').style.height=`${height}px`;
    $('tech-list').innerHTML=`<svg class="tech-edges" viewBox="0 0 ${width} ${height}" aria-hidden="true">${edges}</svg><div class="tech-hub" style="left:${hub.x}px;top:${hub.y}px;width:${w}px;height:${h}px">${icon('core')}<b>Dr. Hematite</b></div>`+techs.map(x=>{const done=t.tech.includes(x.id),ready=scienceReady(0,x.id),p=at(x.id),status=x.future?'未来':done?'研究済み':ready?'研究可能':'前提不足';return `<button class="tech-node ${done?'done':ready?'ready':x.future?'future':'locked'} ${x.id===v.id?'active':''} ${path.has(x.id)?'on-path':''}" style="left:${p.x}px;top:${p.y}px;width:${w}px;height:${h}px" data-tech="${x.id}" aria-label="${x.name}、${status}">${icon(x.id)}<b>${x.name}</b></button>`;}).join('');
    const missing=v.deps.filter(id=>!t.tech.includes(id)).map(id=>techs.find(x=>x.id===id)?.name),reason=state.outcome?'対戦終了':v.future?'将来枝。現在の対戦では研究できません':missing.length?`前提：${missing.join('・')}`:t.dp<v.cost?`開発力が${v.cost-t.dp}不足`:!canWork(0)?'放射線警報で研究停止':'';
    const buildUnlocks=Object.entries(buildings).filter(([,b])=>b.tech===v.id),unlocked=v.id==='climbing'?`${icon('mountain')} 山マスを通行・建設`:buildUnlocks.map(([id,b])=>`${icon(id)} ${b.name}`).join('、')||Object.entries(unitKinds).filter(([,u])=>u.tech===v.id).map(([id,u])=>`${icon(id)} ${u.name}`).join('、')||'次の発明への道筋';
    const science=window.HematiteI18n?.lang==='en'?window.HematiteI18n.science[v.id]:null;
    $('tech-detail').innerHTML=`<div class="detail-title">${icon(v.id)}<div><small>${v.future?'未来の枝':t.tech.includes(v.id)?'研究済み':scienceReady(0,v.id)?'研究可能':'前提を研究'}</small><h2>${v.name}</h2></div><button class="close-tech" data-action="close-tech" aria-label="Close">×</button></div>${starterTech.includes(v.id)?`<p class="starter-note">${window.HematiteI18n?.lang==='en'?'Initial equipment · ready to use and expand':'初期装備の技術 · すぐに使用・増設できます'}</p>`:''}<p class="tech-chain">${science?.[0]||v.chain}</p><p><b>できること：</b>${science?.[1]||v.use}</p><p><b>解放：</b>${unlocked}</p><p><b>前提：</b>${v.deps.map(id=>techs.find(x=>x.id===id)?.name).join('・')||'初期装備'}</p><p class="science-note">${science?.[2]||v.fact}</p><div class="detail-actions">${!v.future&&!t.tech.includes(v.id)?action('研究する',`research:${v.id}`,reason||`開発力 ${v.cost}`,!!reason,true):t.tech.includes(v.id)&&buildUnlocks.length?action(buildUnlocks.some(([,b])=>!b.resource)?'本拠地で建設':'地図で採取',`locate-tech:${v.id}`,'',false,true):`<span class="research-status">${v.future?'将来の研究構想':'研究済み'}</span>`}${availableLessons.has(v.id)?`<a class="learn-link" href="learn/lesson.html?tech=${v.id}&lang=${window.HematiteI18n?.lang||'en'}" target="_blank" rel="noopener">${window.HematiteI18n?.lang==='en'?'Explore the science ↗':'仕組みを学ぶ（英語）↗'}</a>`:''}</div>`;
    $('tech-route').innerHTML=`<b>${v.name}までの道筋</b><div class="route-chips">${[...path].map(id=>`<button data-tech="${id}" class="${t.tech.includes(id)?'done':''}">${icon(id)}${techs.find(x=>x.id===id)?.name}</button>`).join('')}</div>`;
    $('lab-page').classList.toggle('tech-open',techOpen);
  }
  function renderLog(){$('log-list').innerHTML=state.logs.map(l=>{const v=window.HematiteI18n?.log(l)||l;return `<article class="log-card"><small>ROUND ${l.round} ${l.owner==null?'':`· ${teams[l.owner]}`}</small><b>${v.title}</b><div>${v.body}</div></article>`;}).join('');}
  function guide(){const en=window.HematiteI18n?.lang==='en';return en?'Life support is installed. Capture Pods to claim more ice and minerals.':'生命維持は初期装備あり。Podを確保して、氷や鉱物を取り合おう。';}
  function bannerHtml(short){
    const i18n=window.HematiteI18n,en=i18n?.lang==='en',event=i18n?.translate(eventName(state.event?.type||state.warning)),name=i18n?.translate(short.name);
    if(en){
      const details={storm:'Solar generation and visibility decrease.',radiation:'Outdoor work is restricted. Shelter or automation helps.',fault:'Damaged facilities need repair.'};
      let message=state.outcome?`<b>${state.outcome==='victory'?'Victory':state.outcome==='draw'?'Draw':'Defeat'}</b> · Open the match result to play again.`:state.event?`<b>${event} in progress</b> · ${details[state.event.type]} ${state.event.remaining} turn(s) remaining.`:state.warning?`<b>Forecast: ${event}</b> · Prepare for the next turn.`:state.tutorial&&state.round<7?`${guide()} <button data-action="skip-tutorial">Skip</button>`:'<b>Explore the red planet.</b> Survey, invent, and build toward the rival core.';
      if(state.event||state.warning)message+=' <button data-action="forecast">Production forecast</button>';
      if(short.turns<=4&&!state.outcome)message+=` <button id="low-supply" data-action="inventory">⚠ ${name} ${short.turns} turns</button>`;
      return message+' <button data-action="resource-targets">Find resources / Pods</button>'; 
    }
    let message=state.outcome?`<b>${state.outcome==='victory'?'文明を守り抜いた！':state.outcome==='draw'?'両陣営が退避した':'基地から退避した'}</b>　記録から新しい対戦を始められます。`:state.event?`<b>${eventName(state.event.type)} 発生中</b>　${eventDescription(state.event.type)} 残り${state.event.remaining}ラウンド`:state.warning?`<b>予告：${eventName(state.warning)}</b>　次のラウンドに備えよう。`:state.tutorial&&state.round<7?`${guide()} <button data-action="skip-tutorial">省略</button>`:'<b>赤い大地を開拓中</b>　探査・発明・製作で相手の中枢へ進もう。';
    if(state.event||state.warning)message+=' <button data-action="forecast">生産見込み</button>';
    if(short.turns<=4&&!state.outcome)message+=` <button id="low-supply" data-action="inventory">⚠ ${short.name} ${short.turns}R</button>`;
    return message+' <button data-action="resource-targets">資源・Podを探す</button>'; 
  }
  function render(){
    if(!state||roundProcessing)return;
    const t=team(0),short=supplyEstimate(0);$('round').textContent=String(state.round).padStart(2,'0');$('dp').textContent=t.dp;
    $('energy').textContent=`${t.lastEnergy.supply} / ${t.lastEnergy.demand} / ${t.battery}`;
    const en=window.HematiteI18n?.lang==='en',resourceLabel=k=>en?window.HematiteI18n.translate(names[k]):names[k];
    $('supply').innerHTML=['water','oxygen','food'].map(k=>{const low=t.stock[k]<=0||t.lastNet[k]<0&&t.stock[k]/-t.lastNet[k]<=4;return `<span class="resource-reading ${low?'low':''}"><small>${resourceLabel(k)}${low?' !':''}</small><span>${icon(k)}<b>${t.stock[k]}</b></span></span>`;}).join('');
    const reservesLabel=`${en?'Current reserves':'現在の備蓄'}: ${['water','oxygen','food'].map(k=>`${resourceLabel(k)} ${t.stock[k]}`).join(' / ')}. ${en?'Tap for details':'タップで詳しく見る'}`;
    $('supply-chip').classList.toggle('shortage',short.turns<=4);
    $('event-banner').innerHTML=bannerHtml(short);
    $('map-page').classList.toggle('storm',state.event?.type==='storm');$('map-page').classList.toggle('radiation',state.event?.type==='radiation');$('map-page').classList.toggle('alerting',!!state.event||!!state.warning||short.turns<=4);
    $('end-turn').disabled=!!state.outcome||turnBusy;renderMap();renderSheet();renderBase();renderTech();renderLog();window.HematiteI18n?.apply(document.querySelector('.app'));$('supply-chip').setAttribute('aria-label',reservesLabel);
  }
  function dialog(title,body){$('dialog-content').innerHTML=`<h2>${title}</h2>${body}`;window.HematiteI18n?.apply($('dialog-content'));$('detail-dialog').showModal();$('detail-dialog').scrollTop=0;}
  function updateCamera(keepCenter=true){
    const scroller=$('map-scroller');if(!scroller.clientWidth||!scroller.clientHeight)return;
    const old=$('map').getBoundingClientRect().width||1;
    const centerX=(scroller.scrollLeft+scroller.clientWidth/2)/old,centerY=(scroller.scrollTop+scroller.clientHeight/2)/old;
    const shortSide=Math.min(scroller.clientWidth,scroller.clientHeight),longSide=Math.max(scroller.clientWidth,scroller.clientHeight);
    const size=Math.round(mapZoom<=1?shortSide:Math.max(shortSide*mapZoom,longSide+shortSide*.8));
    $('map').style.width=`${size}px`;$('map').style.height=`${size}px`;
    if(keepCenter){scroller.scrollLeft=centerX*size-scroller.clientWidth/2;scroller.scrollTop=centerY*size-scroller.clientHeight/2;}
    saveUi();
  }
  function focusTile(x,y){const scroller=$('map-scroller'),size=$('map').getBoundingClientRect().width;scroller.scrollLeft=(x+.5)*size/SIZE-scroller.clientWidth/2;scroller.scrollTop=(y+.5)*size/SIZE-scroller.clientHeight/2;saveUi();}
  document.addEventListener('click',e=>{
    const tileEl=e.target.closest('[data-x][data-y]');if(tileEl){if(ignoreTileClick){ignoreTileClick=false;return;}choose(Number(tileEl.dataset.x),Number(tileEl.dataset.y));return;}
    const pageEl=e.target.closest('[data-page]');if(pageEl){showPage(pageEl.dataset.page);return;}
    const techEl=e.target.closest('[data-tech]');if(techEl){selectedTech=techEl.dataset.tech;techOpen=true;saveUi();renderTech();window.HematiteI18n?.apply($('lab-page'));return;}
    const a=e.target.closest('[data-action]');if(!a||a.disabled)return;const cmd=a.dataset.action,[kind,arg]=cmd.split(':');let ok=true;
    if(cmd==='toggle-sheet')sheetExpanded=!sheetExpanded;
    else if(cmd==='open-climbing'){selectedTech='climbing';techOpen=true;showPage('lab');}
    else if(cmd==='open-build')buildPicker=true;
    else if(cmd==='open-base'){if($('detail-dialog').open)$('detail-dialog').close();showPage('base');}
    else if(cmd==='resource-targets')dialog(window.HematiteI18n?.lang==='en'?'Find resources & Pods':'資源・Podを探す',resourceTargets());
    else if(kind==='focus-site'){const [x,y]=arg.split(',').map(Number);focusSite(x,y);}
    else if(kind==='select-kind'||kind==='select-unit'){const target=tile(selected.x,selected.y),units=team(0).units.filter(v=>kind==='select-unit'?v.id===Number(arg):v.kind===arg).sort((a,b)=>Number(a.moved)-Number(b.moved)||distance(a,target)-distance(b,target)),u=units[0];if(u){choose(u.x,u.y);focusTile(u.x,u.y);}else ok=false;}
    else if(kind==='base-tab')baseTab=arg;
    else if(kind==='base-system'){if($('detail-dialog').open)$('detail-dialog').close();baseTab=arg;showPage('base');}
    else if(kind==='open-device'){if($('detail-dialog').open)$('detail-dialog').close();baseTab=Object.keys(baseGroups).find(k=>baseGroups[k].includes(arg))||'life';baseFocus=arg;showPage('base');requestAnimationFrame(()=>document.querySelector('.base-device.focused')?.scrollIntoView({block:'center'}));}
    else if(kind==='base-select')baseFocus=arg;
    else if(kind==='base-research'){selectedTech=arg;techOpen=true;showPage('lab');}
    else if(kind==='base-build')ok=buildBase(0,arg);
    else if(kind==='base-repair')ok=repairBase(0,Number(arg));
    else if(kind==='base-recruit')ok=recruit(0,arg);
    else if(cmd==='base-upgrade-workshop')ok=upgradeWorkshop(0);
    else if(cmd==='base-fortify')ok=reinforceCore(0);
    else if(cmd==='close-build')buildPicker=false;
    else if(cmd==='open-recruit')recruitPicker=true;
    else if(cmd==='close-recruit')recruitPicker=false;
    else if(cmd==='close-tech')techOpen=false;
    else if(cmd==='skip-tutorial'){state.tutorial=false;save();}
    else if(cmd==='cancel-attack'){pendingAttack=null;sheetExpanded=false;}
    else if(cmd==='confirm-attack'){ok=!!pendingAttack&&canAttack(0,pendingAttack.id,pendingAttack.x,pendingAttack.y)&&attack(0,pendingAttack.id,pendingAttack.x,pendingAttack.y);pendingAttack=null;sheetExpanded=false;}
    else if(kind==='policy'){team(0).policy=arg;save();$('dialog-content').innerHTML=`<h2>資源の在庫</h2>${inventoryHtml()}`;window.HematiteI18n?.apply($('dialog-content'));}
    else if(cmd==='inventory')dialog('資源と電力',inventoryHtml());
    else if(cmd==='forecast')dialog(window.HematiteI18n?.lang==='en'?'Next production & use':'次の生産と使用',inventoryHtml());
    else if(kind==='research')ok=research(0,arg);
    else if(kind==='locate-tech')ok=locateTech(arg);
    else if(kind==='build')ok=build(0,arg,selected.x,selected.y);
    else if(kind==='recruit')ok=recruit(0,arg);
    else if(kind==='deploy')ok=deploy(0,Number(arg));
    else if(kind==='upgrade-unit')ok=upgradeUnit(0,Number(arg));
    else if(cmd==='survey')ok=survey(0,selected.x,selected.y);
    else if(cmd==='capture')ok=capture(0,selected.x,selected.y);
    else if(cmd==='repair')ok=repair(0,selected.x,selected.y);
    else if(cmd==='upgrade-workshop')ok=upgradeWorkshop(0,selected.x,selected.y);
    if(!ok)toast('実行条件が変わりました。費用と対象を確認してください。');render();saveUi();
  });
  $('menu-toggle').onclick=()=>{const open=$('menu-popup').classList.toggle('hidden');$('menu-toggle').setAttribute('aria-expanded',String(!open));};
  $('language-toggle').onclick=()=>{const next=window.HematiteI18n.lang==='ja'?'en':'ja';window.HematiteI18n.set(next);const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);render();};
  $('resources-button').onclick=()=>{$('menu-popup').classList.add('hidden');dialog('資源と電力',inventoryHtml());};
  function showResult(){const i18n=window.HematiteI18n,english=i18n?.lang==='en',outcome=state.outcome;const title=outcome==='victory'?(english?'Victory':'勝利'):outcome==='draw'?(english?'Draw':'引き分け'):(english?'Defeat':'敗北');const reason=state.logs.find(l=>/中枢基地を占領|基地から退避/.test(l.title));$('result-content').innerHTML=`<div class="result-emblem">${icon(outcome==='victory'?'core':'shelter')}</div><small>${english?'MATCH COMPLETE':'対戦終了'} · ${english?'TURN':'ターン'} ${state.round}</small><h2>${title}</h2><p>${reason?(english?i18n.log(reason).body:reason.body):(english?'The match is over.':'対戦が終了しました。')}</p>`;$('result-review').textContent=english?'Review map':'盤面を見る';$('result-again').textContent=english?'Play again':'もう一度';if(!$('result-dialog').open)$('result-dialog').showModal();}
  $('observe-btn').onclick=()=>showPage('observe');
  $('end-turn').onclick=()=>{
    if(turnBusy||state.outcome)return;
    turnBusy=true;turnHighlights=[];roundAttacks=[];
    const before={round:state.round,stock:{...team(0).stock},lastLog:state.logs[0],
      enemy:new Map(team(1).units.filter(u=>visible(0,u.x,u.y)).map(u=>[u.id,{x:u.x,y:u.y}])),
      own:new Map(team(0).units.map(u=>[u.id,{x:u.x,y:u.y,hp:u.hp}])),coreHp:team(0).bases[0].hp};
    pendingAttack=null;selectedUnitId=null;
    const advanced=endRound();showPage('map');
    if(!advanced){turnBusy=false;return;}
    const english=window.HematiteI18n?.lang==='en';
    const oldLogIndex=state.logs.indexOf(before.lastLog),newLogs=state.logs.slice(0,oldLogIndex<0?state.logs.length:oldLogIndex);
    const enemyMoves=team(1).units.filter(u=>visible(0,u.x,u.y)&&(!before.enemy.has(u.id)||before.enemy.get(u.id).x!==u.x||before.enemy.get(u.id).y!==u.y));
    turnHighlights=[...new Set([...enemyMoves.map(u=>idx(u.x,u.y)),...roundAttacks])];
    const attacks=newLogs.filter(l=>l.owner===1&&['機体が交戦','拠点へ攻撃'].includes(l.title)).length;
    const damaged=team(0).units.filter(u=>u.hp<(before.own.get(u.id)?.hp??u.hp)).length;
    if(team(0).bases[0].hp<before.coreHp)turnHighlights.push(idx(team(0).bases[0].x,team(0).bases[0].y));
    renderMap();
    const rival=[];
    if(enemyMoves.length)rival.push(english?`${enemyMoves.length} rival unit${enemyMoves.length===1?'':'s'} spotted moving`:`敵機${enemyMoves.length}機の移動を確認`);
    if(attacks)rival.push(english?`${attacks} attack${attacks===1?'':'s'} on your units or base`:`自軍への攻撃${attacks}件`);
    if(damaged)rival.push(english?`${damaged} unit${damaged===1?'':'s'} damaged`:`機体${damaged}機が損傷`);
    if(!rival.length)rival.push(english?'No rival action was observed.':'観測できた敵の行動はありません。');
    const reserves=['water','oxygen','food'].map(k=>{
      const now=team(0).stock[k],delta=Math.round((now-before.stock[k])*10)/10,b=team(0).lastBalance[k];
      const reasons=[`${english?'Produced':'生産'} +${b.produced}`,b.processing?`${english?'Processing':'装置で使用'} −${b.processing}`:'',`${english?'Life support':'生活で使用'} −${b.life}`,b.unmet?`${english?'Unmet need':'必要量に不足'} ${b.unmet}`:''].filter(Boolean).join(' / ');
      return `<div class="turn-resource" data-resource="${k}"><span class="resource-label">${icon(k)}${english?window.HematiteI18n.translate(names[k]):names[k]}</span><span class="reserve-change"><span>${before.stock[k]}</span> → <b>${now}</b><small class="${delta<0?'decrease':'increase'}">(${delta>0?'+':''}${delta})</small></span><small class="resource-reason">${reasons}</small></div>`;
    }).join('');
    const eventText=state.event?(english?window.HematiteI18n.translate(eventName(state.event.type)):eventName(state.event.type)):'';
    $('turn-content').innerHTML=`<small>${english?'TURN':'ターン'} ${before.round} → ${state.round}</small><h2>${english?'Next turn':'次のターン'}</h2><p class="rival-summary">${rival.join('<br>')}</p><p class="reserves-heading">${english?'Reserves: before → now':'備蓄：前の残量 → 今の残量'}</p><div class="turn-resources">${reserves}</div>${state.event?`<p>${eventText}${state.event.type==='storm'?english?' · Solar generation decreases.':' · 太陽光発電が低下':''}</p>`:''}`;
    $('turn-continue').textContent=english?'Continue':'続ける';$('turn-dialog').showModal();
  };
  $('turn-continue').onclick=()=>{if($('turn-dialog').open)$('turn-dialog').close();turnBusy=false;render();if(state.outcome)showResult();};
  $('turn-dialog').addEventListener('cancel',e=>e.preventDefault());
  $('result-review').onclick=()=>$('result-dialog').close();$('result-again').onclick=reset;
  $('zoom-in').onclick=()=>{mapZoom=Math.min(3,Math.round((mapZoom+.3)*10)/10);updateCamera();};
  $('zoom-out').onclick=()=>{mapZoom=Math.max(1,Math.round((mapZoom-.3)*10)/10);updateCamera();};
  $('zoom-fit').onclick=()=>{mapZoom=1;updateCamera();};
  function zoomTech(next){const scroller=$('tree-window'),oldWidth=$('tech-list').offsetWidth||1,oldHeight=$('tech-list').offsetHeight||1,centerX=(scroller.scrollLeft+scroller.clientWidth/2)/oldWidth,centerY=(scroller.scrollTop+scroller.clientHeight/2)/oldHeight;techZoom=next;renderTech();scroller.scrollLeft=centerX*$('tech-list').offsetWidth-scroller.clientWidth/2;scroller.scrollTop=centerY*$('tech-list').offsetHeight-scroller.clientHeight/2;saveUi();}
  $('tech-zoom-in').onclick=()=>zoomTech(Math.min(1.5,Math.round((techZoom+.15)*100)/100));
  $('tech-zoom-out').onclick=()=>zoomTech(Math.max(.7,Math.round((techZoom-.15)*100)/100));
  $('dp-chip').onclick=()=>dialog('開発力',`<p>研究・建設・機体の製作に使います。基地を維持すると毎ラウンド得られます。</p><p>現在 ${team(0).dp} ポイント。材料や電力の代わりにはなりません。</p>`);
  $('energy-chip').onclick=()=>dialog('資源と電力',inventoryHtml());
  function powerBalanceHtml(next){
    const en=window.HematiteI18n?.lang==='en',t=team(0),e=next?.energy||t.lastEnergy;
    return `<section class="power-balance"><h3>${en?'Power runs your machines':'電力で装置を動かす'}</h3><div class="power-numbers"><span>${en?'Generated':'発電'}<b>${e.supply}</b></span><span>${en?'All devices need':'全設備の必要電力'}<b>${e.requested??e.demand}</b></span><span>${en?'Actually used':'実際の使用'}<b>${e.demand}</b></span><span>${en?'Battery':'蓄電'}<b>${t.battery} → ${next?.battery??t.battery}</b></span></div><p>${en?`Habitat 2 + connected Pods ${e.pods??0} + running machines. Solar panels supply energy; they need raw materials and processing machines to increase goods.`:`居住区2 ＋ 接続Pod ${e.pods??0} ＋ 稼働する装置。発電を増やすと装置を動かせる量が増えます。物資を増やすには原料と加工装置も必要です。`}</p><button data-action="open-device:solar">${en?'Compare adding solar power':'太陽電池を増やす効果を見る'}</button></section>`;
  }
  function productionLinesHtml(next){
    const en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x,t=team(0),flows=[...(next?.flows||t.lastFlows||[])];
    for(const type of ['waterPlant','oxygenPlant','greenhouse'])if(!t.facilities.some(f=>f.type===type))flows.push({type,blocked:en?'Not built':'未設置',input:{},output:{},missing:[]});
    const amounts=values=>Object.entries(values||{}).map(([k,v])=>`${icon(k)} ${n(names[k])} ${v}`).join(' + ');
    const cards=flows.map(f=>{const b=buildings[f.type],source=b.resource,missing=f.missing?.map(v=>`${n(names[v.resource])} ${v.amount}`).join(' + '),reason=missing?`${en?'Need':'不足'} ${missing}`:n(f.blocked),input=amounts(b.input)||(source?en?'Map source':'地図の資源':f.type==='moxie'?'CO₂':''),output=amounts(f.blocked?b.out:f.output),cmd=source?`focus-site:${f.x},${f.y}`:`open-device:${f.type}`;return `<article class="production-line ${f.blocked?'stopped':''}"><b>${icon(f.type)} ${n(b.name)}</b><span>${f.blocked?`${en?'Stopped':'停止'}: ${reason}`:en?'Running next turn':'次ターンに稼働'}</span><p>${input} ＋ ⚡${b.power} → ${output}${f.blocked?` <strong>${en?'(output 0)':'（生産0）'}</strong>`:''}</p><button data-action="${cmd}">${source?en?'Show source':'採取地点を見る':en?'View / expand machine':'装置を確認・増設'}</button></article>`;});
    return `<details class="production-lines" open><summary>${en?'What is being produced?':'何が生産される？'}</summary>${cards.join('')}</details>`;
  }
  function inventoryHtml(){
    const t=team(0),en=window.HematiteI18n?.lang==='en',n=x=>en?window.HematiteI18n.translate(x):x,next=state.outcome?null:forecast(0),balance=next?.balance||t.lastBalance||{};
    const change=k=>next?.netAll[k]??t.lastNetAll?.[k]??0,sign=v=>v>0?`+${v}`:String(v);
    const device={water:'waterPlant',oxygen:'oxygenPlant',food:'greenhouse',hydrogen:'oxygenPlant',metal:'smelter',resin:'recycler',parts:'workshop',ceramic:'kiln'};
    const stocks=keys=>keys.map(k=>{const b=balance[k]||{},delta=change(k),route=device[k]?`open-device:${device[k]}`:'resource-targets';return `<article class="stock-balance" data-stock="${k}"><div>${icon(k)} <b>${n(names[k])}</b><strong>${t.stock[k]} → ${next?.stock[k]??t.stock[k]}</strong></div><p class="net ${delta<0?'negative':''}">${en?'Net change':'残量の変化'} <b>${sign(delta)}</b></p><small>${en?'Produced':'生産'} +${b.produced||0} − ${en?'Processing':'加工に使用'} ${b.processing||0}${['water','oxygen','food'].includes(k)?` − ${en?'Living':'生活'} ${b.life||0}`:''}${b.maintenance?` − ${en?'Repairs':'修理'} ${b.maintenance}`:''}</small>${b.unmet?`<p class="unmet">${en?'Unmet need':'必要量に不足'} ${b.unmet}</p>`:''}${k==='scrap'?`<small>${en?'Brought from Earth · finite supply':'持参した材料 · 有限'}</small>`:`<button data-action="${route}">${en?'How to get more':'増やすには'}</button>`}</article>`;}).join('');
    return `<p>${en?`Industry ${t.dp} · +4 after a supplied turn`:`開発力 ${t.dp} · 生活を維持できれば毎ターン+4`}</p><p>${en?'Next turn, before rival actions':'相手の行動前の次ターン予測'}${next?.event?` · ${n(eventName(next.event))}`:''}</p><div class="life-balances">${stocks(['water','oxygen','food'])}</div>${powerBalanceHtml(next)}<div class="inventory-actions"><button data-action="resource-targets">${en?'Find resources / Pods':'資源・Podを探す'}</button><button data-action="open-base">${en?'View life support':'生命維持設備を見る'}</button></div>${productionLinesHtml(next)}<details class="material-balances"><summary>${en?'Materials, parts & how to make them':'素材・部品の在庫と作り方'}</summary><p>${en?'Ore + hydrogen → metal. Scrap → recycled resin → parts. The initial scrap supply is finite.':'鉄を含む原料＋水素 → 鉄系材料。廃樹脂 → 再生樹脂 → 部品。持参した廃樹脂は有限です。'}</p><div class="life-balances">${stocks(Object.keys(names).filter(k=>!['water','oxygen','food'].includes(k)))}</div></details><h3>${en?'Water and power priority':'水と電力の配分'}</h3><p>${en?'Life support runs before industrial extraction. Choose oxygen or food first when water or power is short.':'生命維持を工業用の採取より先に動かします。水・電力が足りないときは、酸素と食料のどちらを先に作るか選べます。'}</p><div class="policy-controls"><button data-action="policy:oxygen" aria-pressed="${t.policy!=='food'}">${en?'Prioritize Oxygen':'酸素を優先'}</button><button data-action="policy:food" aria-pressed="${t.policy==='food'}">${en?'Prioritize Food':'食料を優先'}</button></div>`;
  }
  $('supply-chip').onclick=()=>dialog('資源の在庫',inventoryHtml());
  $('close-dialog').onclick=()=>$('detail-dialog').close();$('reset-btn').onclick=()=>{if(confirm('現在の対戦を消して、最初から始めますか？'))reset();};
  function enablePan(scroller){
    let start=null,suppressUntil=0;
    scroller.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;start={id:e.pointerId,x:e.clientX,y:e.clientY,left:scroller.scrollLeft,top:scroller.scrollTop,dragging:false,pointerType:e.pointerType};});
    scroller.addEventListener('pointermove',e=>{if(!start||e.pointerId!==start.id)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(!start.dragging&&Math.hypot(dx,dy)>8)start.dragging=true;if(!start.dragging)return;suppressUntil=Date.now()+500;if(start.pointerType==='touch')return;if(!scroller.hasPointerCapture(e.pointerId))scroller.setPointerCapture(e.pointerId);scroller.classList.add('panning');scroller.scrollLeft=start.left-dx;scroller.scrollTop=start.top-dy;e.preventDefault();});
    const stop=e=>{if(!start||e.pointerId!==start.id)return;if(start.dragging){suppressUntil=Date.now()+500;saveUi();}scroller.classList.remove('panning');if(scroller.hasPointerCapture(e.pointerId))scroller.releasePointerCapture(e.pointerId);start=null;};
    scroller.addEventListener('pointerup',stop);scroller.addEventListener('pointercancel',stop);
    scroller.addEventListener('click',e=>{if(Date.now()<suppressUntil){e.preventDefault();e.stopPropagation();suppressUntil=0;}},true);
  }
  enablePan($('map-scroller'));enablePan($('tree-window'));
  let pinchStart=null;
  $('map-scroller').addEventListener('touchstart',e=>{if(e.touches.length===2){pinchStart={distance:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),zoom:mapZoom};}},{passive:true});
  $('map-scroller').addEventListener('touchmove',e=>{if(e.touches.length===2&&pinchStart){e.preventDefault();const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);mapZoom=Math.max(1,Math.min(3,pinchStart.zoom*d/pinchStart.distance));updateCamera();ignoreTileClick=true;}},{passive:false});
  $('map-scroller').addEventListener('touchend',e=>{if(e.touches.length<2)pinchStart=null;},{passive:true});
  let scrollTimer;for(const id of ['map-scroller','tree-window'])$(id).addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(saveUi,120);},{passive:true});
  window.addEventListener('resize',()=>{updateDisplayScale();updateCamera();if(page==='lab')renderTech();});
  updateDisplayScale();
  state=load()||fresh();if(!state.logs.length)addLog('Arcadia Planitiaに着陸','実際の火星地形で、二つの開拓団が文明を育てる。');const ui=loadUi();if(!ui&&document.documentElement.classList.contains('desktop-game'))mapZoom=1;if(ui&&ui.uiVersion!==2&&state.round===1&&!state.tiles[idx(3,7)].surveyed[0]){selected={x:3,y:7};selectedUnitId=null;}if(document.documentElement.classList.contains('desktop-game'))sheetExpanded=true;render();updateCamera(false);if(ui){$('map-scroller').scrollLeft=ui.scrollLeft||0;$('map-scroller').scrollTop=ui.scrollTop||0;$('tree-window').scrollLeft=ui.techLeft||0;$('tree-window').scrollTop=ui.techTop||0;}else focusTile(2,8);if(location.hash==='#lab')showPage('lab');else if(ui?.page&&ui.page!=='map')showPage(ui.page);if(loadWarning){save();toast(loadWarning);}if(state.outcome&&!new URLSearchParams(location.search).has('test'))setTimeout(showResult,0);
  window.HematiteGame={get state(){return state;},reset,select:choose,build,buildBase,canBuildBase,resourceConnected,showPage,research,survey,recruit,move,deploy,attack,capture,repair,repairBase,reinforceCore,upgradeWorkshop,upgradeUnit,endRound,production,forecast,inSupply,inComms,canBuild,save};
  if(new URLSearchParams(location.search).has('test')){const script=document.createElement('script');script.src=`tests/task4-smoke.js?v=${Date.now()}`;document.body.appendChild(script);}
})();







