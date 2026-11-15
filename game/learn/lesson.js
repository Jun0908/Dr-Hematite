/* Standalone lessons; reading never changes the game turn or unlock state. */
(() => {
  const $=id=>document.getElementById(id);
  const english=window.HematiteI18n?.lang==='en';
  const data={
    climbing:['登坂技術','斜面の観測 → 地盤と段差を調べる → 履帯・牽引具と経路を整える → 通行','ゲームでは急な場所を一マスの「山」として表します。実際の通行可否は地盤、斜度、機体、工事方法によって変わります。','materials'],
    ice:['氷の採取','広域の地下氷候補 → 現地調査 → 掘削 → 氷','SWIMは広域の地下氷候補を示します。ゲーム中の一マスの氷量は観測結果ではありません。','water'],
    water:['融解・浄化','採取した氷 → 加熱・融解 → 水質処理 → 水','氷を溶かすだけでは飲用・装置用の水にはなりません。異物の分離と品質確認が必要です。','water'],
    electrolysis:['水の電気分解までの道筋','氷の調査 → 採取・融解・水質処理 → 電解装置 → 酸素と水素 → 用途','電解には水と電力に加え、電解槽、電極、生成ガスの分離・保管が必要です。','water'],
    moxie:['大気から酸素','火星大気CO₂ → 圧縮・高温処理 → 酸素とCO','MOXIEは火星で少量の酸素製造を実証しました。ゲームの大きな設備出力は仮定です。副生するCOは有毒です。','water'],
    storage:['蓄電と配分','太陽光発電 → 余剰電力 → 蓄電池 → 砂嵐中の運転','蓄電池は発電装置ではありません。発電が低下する間、何を優先して動かすかを選びます。','water'],
    mineral:['鉱物分析','観測候補 → 試料を採る → 分析 → 用途に合う原料を確認','鉄元素の兆候だけでは、使える鉱床や採取量は分かりません。','materials'],
    smelting:['鉄の還元','分析済みの鉄酸化物 → 熱と還元剤 → 鉄系材料','水素を使う還元は工程の一例です。反応温度、原料の性質、分離・加工が必要です。','materials'],
    metalwork:['金属加工','鉄系材料 → 加工 → フレームと装甲','金属を得ても用途に合った部品にするには成形・接合・検査が必要です。','materials'],
    recycling:['樹脂の再利用','廃樹脂 → 材料の選別 → 洗浄・再加工 → 再生材','樹脂の種類を無条件に混ぜられません。繰り返すと材料特性も変わります。','materials'],
    printing:['3Dプリント部品','再生材 → フィラメント → 持参したプリンタ → 用途別の部品','プリンタ本体や電子部品まで現地で作れるという意味ではありません。','materials'],
    farming:['水耕栽培','水 → 種子・養分・光 → 環境制御 → 食料','種子・養分・照明・温度管理などが必要です。初期装備はゲーム上の想定です。','water'],
    ceramics:['遮蔽と建材','レゴリス → 性質の分析 → 成形・覆土 → 防護','覆土による放射線遮蔽と、焼成した建材の製造は別の工程です。','materials'],
    beam:['ビーム・セントリー','持参した光学装置 → 金属架台・電力 → 防衛機体','ゲーム上の架空の戦闘機です。火星で実証された装置ではありません。','materials'],
    automation:['作業の自動化','センサー → 制御装置 → 交換部品 → 自動運転','自動化しても故障や放射線リスクはなくなりません。','materials'],
    glass:['現地ガラス','分析済みのシリカ原料 → 精製・溶融 → ガラス','将来の研究枝です。レゴリスをそのまま高品質な光学ガラスにできるわけではありません。','materials'],
    sabatier:['メタン合成','CO₂と水素 → 触媒反応 → メタンと水','CO₂ + 4H₂ → CH₄ + 2H₂O。燃料・水回収へつながる将来枝で、ゲームでは未実装です。','water'],
    phb:['バイオプラスチックPHB','炭素源 → 微生物の培養 → PHB回収 → 用途別素材','火星での大規模な現地製造は未実証の研究構想です。','phb'],
    closedLoop:['水と空気の循環','使用済みの水と空気 → 分離・浄化 → 再利用','完全な閉鎖循環ではありません。損失や補給が必要です。','water'],
    hopper:['推進ホッパー','メタンと酸素 → 推進剤 → 短距離移動の構想','火星での運用は研究構想とゲーム上の想像です。現在の対戦では使えません。','water']
  };
  const englishLessons={
    climbing:['Climbing Gear','Survey a slope → assess ground and grade → prepare traction and route → cross','The game represents a difficult slope as one mountain tile. Real access depends on terrain strength, slope, vehicle design, and route engineering.','materials'],
    ice:['Ice Extraction','Orbital clue → ground survey → drill → ice','SWIM shows broad areas where subsurface ice may occur. It does not measure ice in a game tile.','water'],
    water:['Melt & Purify','Collected ice → heating → purification → water','Melted ice must be filtered and tested before it can be used as drinking water or in equipment.','water'],
    electrolysis:['The Path to Water Electrolysis','Survey ice → extract and purify water → electrolysis → oxygen and hydrogen','Electrolysis needs water, electrical power, electrodes, a cell, and safe gas separation and storage.','water'],
    moxie:['Oxygen from CO₂','Martian CO₂ → compression and heating → oxygen and carbon monoxide','MOXIE demonstrated small-scale oxygen production on Mars. Game-scale output is assumed; carbon monoxide is toxic.','water'],
    storage:['Energy Storage','Solar array → surplus electricity → battery → storm operations','A battery stores electricity; it does not generate electricity. Decide which devices run during a storm.','water'],
    mineral:['Mineral Analysis','Orbital clue → sample → analysis → useful feedstock','An iron signal does not establish a mineable deposit or a local yield.','materials'],
    smelting:['Iron Reduction','Analyzed iron oxide → heat and reducing agent → iron-bearing metal','Hydrogen reduction is one possible route. Temperature, feedstock, separation, and finishing matter.','materials'],
    metalwork:['Metalworking','Iron-bearing metal → shaping and joining → frames and armor','Metal must be shaped, joined, and tested before it becomes a useful part.','materials'],
    recycling:['Resin Recycling','Waste plastic → sorting and cleaning → recycled resin','Different plastics cannot be mixed freely, and repeated recycling can change material properties.','materials'],
    printing:['3D-Printed Parts','Recycled resin → filament → supplied printer → useful part','This does not mean the printer or its electronics can be made entirely from Martian resources.','materials'],
    farming:['Hydroponics','Water + seeds + nutrients + light → controlled growth → food','Seeds, nutrients, lighting, and temperature control are also required. The starting kit is a game assumption.','water'],
    ceramics:['Shielding & Materials','Regolith → analysis → covering or forming → protection','Covering a habitat with soil and firing building materials are different processes.','materials'],
    beam:['Beam Sentry','Supplied optics + metal mount + power → defense unit','This is a fictional combat unit. It is not equipment demonstrated on Mars.','materials'],
    automation:['Automation','Sensors + controls + replacement parts → automated work','Automation does not remove all failure or radiation risk.','materials'],
    glass:['Martian Glass','Analyzed silica-rich feedstock → refinement and melting → glass','Future research branch. Raw regolith is not automatically optical-quality glass.','materials'],
    sabatier:['Methane Synthesis','CO₂ + hydrogen → catalytic reaction → methane + water','CO₂ + 4H₂ → CH₄ + 2H₂O. This future branch may support fuel and water recovery.','water'],
    phb:['PHB Bioplastic','Carbon source → microbe cultivation → PHB recovery → materials','Large-scale production from Martian resources remains unproven research.','phb'],
    closedLoop:['Water & Air Recycling','Used water and air → separation and cleaning → reuse','No loop is perfectly closed. Losses and resupply remain.','water'],
    hopper:['Propellant Hopper','Methane + separately produced oxygen → propellant → short hop','This future mobility idea has not been demonstrated on Mars and is unavailable in this match.','water']
  };
  const special=[
    {name:'候補地を探す',icon:'ice',body:'NASAのSWIMは地下氷がありそうな広域を示します。ゲームではローバーで候補マスを現地調査します。広域図だけで一マスの氷量は分かりません。',kind:'観測とゲーム上の推定'},
    {name:'氷を採り、水を整える',icon:'water',body:'採取した氷を融かし、異物を取り除き、用途に応じて水質を確認します。飲料水と装置に送る水を同じ条件とはみなしません。',kind:'工学上の前提'},
    {name:'電解装置を動かす',icon:'electrolysis',body:'水に電力を加え、電解槽で反応を進めます。ゲームでは電解設備に水1と電力2が必要です。この数値はゲーム用の単位です。',kind:'科学の反応とゲーム上の抽象化'},
    {name:'酸素と水素を分ける',icon:'oxygen',body:'反応の全体式は 2H₂O → 2H₂ + O₂。生成した酸素と水素は混合したまま使わず、分離して安全に扱います。',kind:'化学の関係'},
    {name:'文明の次の枝へ',icon:'hydrogen',body:'酸素は生命維持へ。水素は鉄の還元や、将来のメタン合成へつながります。水を温室へ回すか電解へ回すかがゲームの選択になります。',kind:'用途と戦略'}
  ];
  const id=new URLSearchParams(location.search).get('tech')||'electrolysis',item=english?(englishLessons[id]||englishLessons.electrolysis):(data[id]||data.electrolysis);
  const [name,chain,note,map]=item;
  const englishSpecial=[
    {name:'Find a candidate site',icon:'ice',body:'NASA SWIM maps broad areas where subsurface ice may exist. Survey a candidate tile with a rover; the map cannot tell its exact local yield.',kind:'Observation vs game estimate'},
    {name:'Collect and prepare water',icon:'water',body:'Extract ice, melt it, remove contaminants, and test the water for its intended use.',kind:'Engineering prerequisite'},
    {name:'Run the electrolyzer',icon:'electrolysis',body:'Supply water and electricity to an electrolysis cell. In this game the plant consumes 1 water and 2 power; those are game units.',kind:'Chemistry and game model'},
    {name:'Separate both gases',icon:'oxygen',body:'The net reaction is 2H₂O → 2H₂ + O₂. Oxygen and hydrogen must be separated and stored safely.',kind:'Chemical relationship'},
    {name:'Open new branches',icon:'hydrogen',body:'Oxygen supports the habitat. Hydrogen can help reduce iron oxides or feed a future methane route. Water can also go to crops.',kind:'Use and strategy'}
  ];
  const steps=id==='electrolysis'?(english?englishSpecial:special):chain.split('→').map((part,i)=>({name:part.trim(),icon:i===0?id:i===chain.split('→').length-1?id:'parts',body:english?(i===0?`Input: ${part.trim()}. Check the required materials and equipment.`:i===chain.split('→').length-1?`Result: ${part.trim()}. ${note}`:`Process: ${part.trim()}. ${note}`):i===0?`入力・前提：${part.trim()}。次の工程へつなぐために、材料や設備を確認します。`:i===chain.split('→').length-1?`到達点：${part.trim()}。${note}`:`工程：${part.trim()}。${note}`,kind:english?(i===chain.split('→').length-1?'Use & caution':'Process'):(i===chain.split('→').length-1?'用途・注意':'工程')}));
  let current=0,timer=null;
  $('lesson-icon').innerHTML=window.HematiteIcons.icon(id);$('lesson-name').textContent=name;$('lesson-intro').textContent=chain;$('science-note').textContent=note;
  $('lesson-type').textContent=english?(id==='electrolysis'?'From ice to oxygen and hydrogen':id==='moxie'?'Partly demonstrated on Mars':['phb','glass','sabatier','closedLoop','hopper'].includes(id)?'Future research':'Science and game model'):id==='electrolysis'?'氷から酸素・水素へ':id==='moxie'?'火星で一部実証・ゲームの抽象化':['phb','glass','sabatier','closedLoop','hopper'].includes(id)?'将来の研究構想':'科学・工学とゲームの抽象化';
  $('atlas-link').href=`atlas.html?map=${map}&tech=${id}&lang=${english?'en':'ja'}`;
  $('back-game').href=`../index.html?lang=${english?'en':'ja'}#lab`;
  $('language-toggle').onclick=()=>{const url=new URL(location.href);url.searchParams.set('lang',english?'ja':'en');window.HematiteI18n.set(english?'ja':'en');location.href=url.href;};
  function render(){
    $('stage-list').innerHTML=steps.map((s,i)=>`<button class="stage ${i===current?'current':''}" data-stage="${i}" aria-current="${i===current?'step':'false'}">${window.HematiteIcons.icon(s.icon)}<b>${i+1}. ${s.name}</b></button>`).join('');
    const s=steps[current];$('stage-detail').innerHTML=`<div class="stage-art">${window.HematiteIcons.icon(s.icon)}</div><div><small>${s.kind}</small><h2>${s.name}</h2><p>${s.body}</p></div>`;
    $('progress').textContent=`${current+1} / ${steps.length}`;$('prev').disabled=current===0;$('next').disabled=current===steps.length-1;window.HematiteI18n?.apply(document.body);
  }
  function stop(){if(timer){clearInterval(timer);timer=null;}$('play').textContent='▶ 再生';$('play').setAttribute('aria-label','工程アニメーションを再生');}
  $('stage-list').onclick=e=>{const stage=e.target.closest('[data-stage]');if(stage){current=Number(stage.dataset.stage);stop();render();}};
  $('prev').onclick=()=>{current=Math.max(0,current-1);stop();render();};$('next').onclick=()=>{current=Math.min(steps.length-1,current+1);stop();render();};
  $('play').onclick=()=>{if(timer){stop();return;}if(current===steps.length-1)current=0;render();$('play').textContent='Ⅱ 停止';$('play').setAttribute('aria-label','工程アニメーションを停止');timer=setInterval(()=>{if(current>=steps.length-1){stop();return;}current++;render();},2600);};
  $('back-game').onclick=e=>{if(window.opener&&!window.opener.closed){e.preventDefault();window.opener.focus();window.close();}};
  render();
})();
