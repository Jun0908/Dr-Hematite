/* Shared JP/EN presentation layer. Game state keeps language-independent IDs and numbers. */
(() => {
  const saved=(()=>{try{return localStorage.getItem('hematite-language');}catch{return null;}})();
  const query=new URLSearchParams(location.search).get('lang');
  let lang=['ja','en'].includes(query)?query:['ja','en'].includes(saved)?saved:'en';
  const words={
    'アレス':'Ares','ベガ':'Vega','あなた':'You','ライバル':'Rival','開発力':'Industry','研究・製作':'Industry','発電 / 需要 / 蓄電':'Power / demand / battery','水・酸素・食料':'Water / oxygen / food','水':'Water','酸素':'Oxygen','食料':'Food','氷':'Ice','地下氷':'Ground ice','水素':'Hydrogen','鉄を含む原料':'Iron-bearing material','鉄系材料':'Iron alloy','レゴリス':'Regolith','建材':'Building material','廃樹脂':'Waste resin','再生樹脂':'Recycled resin','部品':'Parts','蓄電':'Battery','発電':'Generation','需要':'Demand',
    '地下氷の候補':'Possible ground ice','鉄を含む原料の候補':'Possible iron-bearing material','レゴリスの候補':'Possible regolith',
    '登坂技術':'Climbing Gear','山マスを通行・建設':'Travel and build on mountain tiles','山マスを通れるようにする':'Unlock mountain travel','山マス':'Mountain tile','山':'Mountain','通れる地表':'Traversable ground','登坂技術を研究':'Research Climbing Gear',
    '氷の採取':'Ice Extraction','融解・浄化':'Melt & Purify','水の電気分解':'Water Electrolysis','大気から酸素':'Oxygen from CO₂','蓄電と配分':'Energy Storage','鉱物分析':'Mineral Analysis','鉄の還元':'Iron Reduction','金属加工':'Metalworking','樹脂の再利用':'Resin Recycling','3Dプリント部品':'3D-Printed Parts','水耕栽培':'Hydroponics','遮蔽と建材':'Shielding & Materials','焼成建材':'Fired Building Material','ビーム・セントリー':'Beam Sentry','作業の自動化':'Automation','現地ガラス':'Martian Glass','メタン合成':'Methane Synthesis','バイオプラスチック':'Bioplastic','水と空気の循環':'Water & Air Recycling','推進ホッパー':'Propellant Hopper',
    '氷採取場':'Ice Extractor','採水設備':'Water Processor','電解設備':'Electrolyzer','大気酸素設備':'CO₂ Oxygen Plant','太陽電池':'Solar Array','蓄電設備':'Battery Bank','鉱物採取場':'Ore Extractor','還元炉':'Reduction Furnace','樹脂再生設備':'Resin Recycler','印刷工房':'Print Workshop','温室':'Greenhouse','遮蔽材工房':'Kiln','レゴリス採取場':'Regolith Pit','補給中継所':'Supply Relay','遮蔽避難所':'Radiation Shelter',
    '観測ローバー':'Survey Rover','工作クローラー':'Builder Crawler','中枢基地':'Core Base','前哨基地':'Outpost','無人の前哨地':'Unclaimed Outpost','火星の地表':'Martian Surface','水の電解':'Water Electrolysis','栽培':'Farming','電力':'Power','水の循環':'Water Recycling','燃料の構想':'Future Fuel','レゴリス分析':'Regolith Analysis','ガラス・建材':'Glass & Materials','金属部品':'Metal Parts','金属架台':'Metal Mount','印刷部品の応用':'Printed Part Applications','PHBの構想':'Future PHB',
    'メニュー':'Menu','発明':'Research','ターン終了':'End Turn','地図':'Map','記録':'Log','観測と出典':'Observation & Sources','研究する':'Research','仕組みを学ぶ':'Learn How','地図で設置先を探す':'Find Build Site','本拠地で建設':'Build at Headquarters','地図で採取':'Extract on Map','未来':'Future','研究済み':'Researched','研究可能':'Available','前提不足':'Locked','未来の枝':'Future Branch','前提を研究':'Research Prerequisites','将来の研究構想':'Future Research','初期装備':'Starter Equipment','次の発明への道筋':'Path to Next Invention','できること：':'Use:','解放：':'Unlocks:','前提：':'Requires:','省略':'Skip','続ける':'Continue','もう一度':'Play Again','盤面を見る':'Review Map','次のターン':'Next Turn','対戦終了':'Match Complete','勝利':'Victory','敗北':'Defeat','引き分け':'Draw','前へ':'Previous','次へ':'Next','再生':'Play','停止':'Pause','を学ぶ':' — Learn','この発明':'This Invention','資源と電力':'Resources & Power','前ラウンド':'Last turn','次のターンに':'next turn','基地を維持すると':'if the base is supplied','水と電力の配分':'Water and Power Priority',
    '操作を開く':'Open Actions','閉じる':'Close','ここに建設':'Build Here','使える設備を選ぶ':'Choose an available facility','機体を製作':'Build Unit','探査・工作・戦闘':'Survey · build · defend','戻る':'Back','攻撃を実行':'Confirm Attack','やめる':'Cancel','現地で調べる':'Survey Site','前哨地を確保':'Capture Outpost','拠点を修理':'Repair Base','設備を修理':'Repair Facility','装甲を強化':'Upgrade Armor','金属で工房を強化':'Upgrade Workshop','次の生産見込み':'Next Turn Forecast','資源の在庫':'Resource Inventory','電力と蓄電':'Power & Battery','酸素を優先':'Prioritize Oxygen','食料を優先':'Prioritize Food',
    '平坦な地表':'Flat Terrain','起伏のある地表':'Rough Terrain','あなたの作業圏':'Your Work Area','作業圏外':'Outside Work Area','調査済み':'Surveyed','未調査':'Unsurveyed','耐久':'HP','防備':'Defense','補給圏外':'Out of Supply','通信圏外':'Out of Comms','展開中':'Deployed','冷却中':'Cooling','行動済み':'Action Used','先に現地調査':'Survey Site First','担当Podを確保':'Capture assigned Pod','Podを本拠地へ接続':'Connect Pod to HQ','Podの接続なし':'Pod disconnected','機体がいる':'Unit Occupies Tile','材料不足':'Missing Materials','電力不足':'Insufficient Power','故障':'Broken','稼働見込み':'Expected to Run','施設なし':'No Facilities',
    '砂嵐':'Dust Storm','太陽高エネルギー粒子':'Solar Particle Event','設備故障':'Equipment Failure','環境変化':'Environmental Change','砂嵐が到来':'Dust Storm Arrived','砂嵐の予報':'Dust Storm Forecast','環境警報':'Environmental Alert','空が晴れた':'Skies Cleared','補給が不足':'Supplies Running Low','初生産':'First Production','基地から退避':'Base Evacuated','中枢基地を占領':'Core Captured',
    '新しい対戦を始める':'Start New Match','火星で、文明を発明する':'Invent a Civilization on Mars','本物の火星を読む。':'Read the Real Mars','開拓の記録':'Expedition Log','水・酸素・食料の全体図':'Water · Oxygen · Food Roadmap','素材・3Dプリントの全体図':'Materials & 3D Printing Roadmap','PHBの全体図':'PHB Roadmap','全体':'Fit','縮小':'Zoom out','拡大':'Zoom in','画面切り替え':'Screen navigation','現在のラウンド':'Current turn','現在の状態':'Current status'
  };
  const full={
    '地図へ戻る':'Back to Map',
    '火星で、文明を発明する':'Invent a Civilization on Mars',
    '研究を進め、地図で採取し、本拠地で装置を作ろう。学習はいつでも任意。':'Research new methods, extract raw materials on the map, and build machines at HQ. Learning is optional.',
    '線でつながる前提をたどり、研究した技術を地図で使おう。学習はいつでも任意。':'Follow the branches, then use your inventions on the map. Learning is always optional.',
    '発明と判断が、戦況を変えていく。':'Inventions and decisions change the battle.',
    '砂嵐の前に準備しよう。':'Prepare for the dust storm.','最初の一歩：地図の「?」を選び、地下氷を調べよう。':'Start here: tap the ? tile and survey possible ground ice.',
    '発明ノートで「氷の採取」を研究しよう。':'Research Ice Extraction in the invention tree.',
    '調査した氷候補のマスに採取場を建てよう。':'Build an extractor on the surveyed ice tile.',
    '次は氷を水にする。発明ノートで融解・浄化を調べよう。':'Next, turn ice into water. Research Melt & Purify.',
    '平らな自陣の土地に採水設備を建てよう。':'Build a water processor on flat land in your territory.',
    '砂嵐が近づく。蓄電か発電の増強を考えよう。':'A dust storm is coming. Consider storage or more power.',
    '青いマスへ直接移動。赤い対象を選ぶと攻撃を確認できる。':'Tap a blue tile to move. Tap a red target to preview an attack.',
    '青いマスへ直接移動。攻撃可能な相手は赤く表示されます。':'Tap a blue tile to move. Attackable targets appear in red.',
    '相手の機体。自分の機体を選び、赤く表示されたら攻撃できる。':'Enemy unit. Select your unit; red targets can be attacked.',
    '拠点を守り、素材を加工して前線を支える。':'Protect the base, process materials, and support the front.',
    '次のラウンドに材料と電力があれば稼働。':'Runs next turn if materials and power are available.',
    '工作クローラーが隣に到達すると確保できる。':'A builder crawler can capture this from an adjacent tile.',
    '観測ローバーが隣に必要':'Survey rover must be adjacent',
    '衛星情報を手がかりに、観測ローバーで現地調査する。':'Send a survey rover to check the satellite clue on site.',
    '地形と補給路を考えて進もう。':'Consider terrain and supply routes as you advance.',
    '観測や研究を進めると、ここでできることが増えます。':'Survey and research to unlock more actions here.',
    '砂嵐：発電と視界が低下':'Dust storm: power and visibility reduced','高エネルギー粒子：屋外作業を制限':'Solar particles: outdoor work restricted',
    '赤い大地を開拓中':'Exploring the red planet','探査・発明・製作で相手の中枢へ進もう。':'Survey, invent, and build to reach the rival core.',
    '現在の対戦を消して、最初から始めますか？':'Erase this match and start again?',
    '実行条件が変わりました。費用と対象を確認してください。':'Conditions changed. Check the target and cost.'
    ,'登坂技術を研究すると、この山マスを通れる。':'Research Climbing Gear to enter this mountain tile.'
    ,'新しい本拠地ルールで対戦を始めました。以前の保存は残しています。':'A new match started with the headquarters rules. Your earlier save remains intact.'
    ,'山の通行ルールを更新しました。対戦は続けられます。':'Mountain movement rules were updated. Your match is preserved.'
    ,'実標高の新しい地図で対戦を始めました。旧地図の保存は削除していません。':'A new match began on the measured terrain map. The old map save remains untouched.'
    ,'保存データの形式が合わないため、新しい対戦を開始しました。':'The saved match format was incompatible, so a new match began.'
    ,'保存データを読み取れなかったため、新しい対戦を開始しました。':'The saved match could not be read, so a new match began.'
    ,'電解設備と温室が競合するとき、先に動かす方を選べます。変更は次の生産から反映されます。':'When the electrolyzer and greenhouse compete, choose which runs first. Changes apply at the next production step.'
    ,'発電・蓄電は物資の在庫に含まれません。':'Generation and stored power are separate from material stocks.'
    ,'この説明の読み方':'How to read this lesson'
    ,'ゲームの装置の出力・建設費・配置は遊びのための値です。実際の火星で同じ規模の設備が稼働したことを示しません。':'Facility output, build costs, and locations are game values. They do not claim that equipment of this scale has operated on Mars.'
    ,'科学ロードマップと出典一覧 ↗':'Science roadmap and sources ↗'
    ,'NASA SWIM 地下氷候補 ↗':'NASA SWIM possible ground ice ↗'
    ,'NASA MOXIE 実証 ↗':'NASA MOXIE demonstration ↗'
    ,'← ゲームへ戻る':'← Back to Game'
    ,'全体図 ↗':'Full Roadmap ↗'
    ,'前の工程':'Previous step'
    ,'次の工程':'Next step'
    ,'工程アニメーションを再生':'Play step animation'
    ,'工程アニメーションを停止':'Pause step animation'
    ,'指で拡大・移動して工程を読めます。図は教育用コンセプトです。':'Pinch to zoom and pan. This diagram is an educational concept.'
    ,'水・酸素・食料':'Water · Oxygen · Food'
    ,'素材・3Dプリント':'Materials · 3D Printing'
    ,'原画を選ぶ':'Choose roadmap'
    ,'工程を選ぶ':'Choose step'
    ,'観測とゲームの推定を区別して、候補地を選ぶ。':'Compare observations with game assumptions before choosing a site.'
    ,'Arcadia Planitiaの約2.6 km四方。HiRISEの実測標高を着色・強調して描いた盤面です。各マスは約237 m。資源、基地、通行制限はゲーム上の仮定です。':'This board covers about 2.6 km by 2.6 km in Arcadia Planitia. Its colors and relief are drawn from measured HiRISE elevations. Each tile is about 237 m wide. Resources, bases, and movement rules are game assumptions.'
    ,'位置：北緯38.1276〜38.1717°、東経191.5567〜191.6106°。北が上。':'Location: 38.1276–38.1717° N, 191.5567–191.6106° E. North is up.'
    ,'HiRISE DTMと原観測 ↗':'HiRISE DTM and source data ↗'
    ,'HiRISE公開の標高図。こちらはクレーター周辺を広く示す原資料で、盤面はその一部です。':'The original HiRISE elevation image shows a wider area. The game board uses a smaller crop.'
    ,'全域の観測情報 ↗':'Full observation ↗'
    ,'SWIMは広域で地下氷の候補を示します。この盤面の小さなマスに氷がある証拠ではなく、採取量も分からないため、探査で得る結果はゲーム上の推定です。':'SWIM identifies broad areas where subsurface ice may exist. It does not prove that ice exists in a particular game tile or how much could be collected. Survey results on this board are game assumptions.'
    ,'NASAの説明 ↗':'NASA explanation ↗'
    ,'地形：NASA/JPL-Caltech/UArizona · SWIM：NASA/JPL-Caltech/Planetary Science Institute':'Terrain: NASA/JPL-Caltech/UArizona · SWIM: NASA/JPL-Caltech/Planetary Science Institute'
    ,'詳細：':'Details: '
    ,'地図の出典と加工':'Map sources and processing'
    ,'実際の火星地形で、二つの開拓団が文明を育てる。':'Two expeditions develop civilizations on real Martian terrain.'
    ,'二つの開拓団が、同じ火星の地形を調べ、文明を育てる。':'Two expeditions study the same Martian terrain and build civilizations.'
  };
  const science={
    climbing:['Survey the slope → prepare traction and route → cross a mountain tile','Let units enter mountain tiles and build there.','Real route feasibility depends on ground strength, slope, vehicle, and engineering. Mountain tiles are a game abstraction.'],
    ice:['Possible ground ice → ground survey → drilling → ice','Build an ice extractor to supply water and oxygen production.','SWIM shows broad candidate areas; local yield requires ground investigation.'],
    water:['Ice + heat → melting → water treatment → water','Run a water processor to support the base and chemical routes.','Melted ice must be treated and tested for its intended use.'],
    electrolysis:['2H₂O + electricity → 2H₂ + O₂','Produce oxygen for life support and hydrogen for materials.','Electrolysis requires power, equipment, and gas separation.'],
    moxie:['Martian CO₂ + electricity → O₂ + CO','Produce oxygen without consuming water, at a power cost.','MOXIE demonstrated small-scale oxygen production on Mars; game output is assumed.'],
    storage:['Solar power → surplus → battery → storm operation','Store power to keep critical systems running during storms.','A battery stores energy; it does not generate it.'],
    mineral:['Orbital clue → sample analysis → confirmed feedstock','Unlock an extractor for iron-bearing material.','An iron signal is not proof of a mineable deposit.'],
    smelting:['Iron oxide + hydrogen + heat → iron-bearing metal','Make metal from ore and hydrogen.','Reduction also requires suitable feedstock, heat, separation, and finishing.'],
    metalwork:['Metal → shaping → frames and armor','Improve builder armor and workshop output.','Metal must be processed into application-specific parts.'],
    recycling:['Waste plastic → sorting and washing → recycled resin','Produce material for replacement parts and repairs.','Different plastics cannot always be mixed; recycling can degrade properties.'],
    printing:['Recycled resin + supplied printer → parts','Make replacement parts for units and facilities.','The printer and electronics still depend on supplied equipment.'],
    farming:['Water + seeds + nutrients + light → food','Grow food to support the expanding habitat.','Water alone is insufficient; nutrients and environmental control are required.'],
    ceramics:['Regolith → sorting and forming → firing → building material','Reinforce the core habitat with fired material.','The feedstock and firing conditions affect the final material.'],
    beam:['Supplied optics + power + metal mount → sentry','Unlock a ranged defense unit that must cool after firing.','This combat unit is fictional and has not operated on Mars.'],
    automation:['Sensors + controls + replacement parts → automation','Maintain work during solar particle alerts.','Automation cannot remove every risk from radiation or failure.'],
    glass:['Analyzed silica → refining and melting → glass','Future path toward transparent components.','Raw regolith cannot automatically make optical-grade glass.'],
    sabatier:['CO₂ + hydrogen → methane + water','Future fuel and water-recovery path.','Large-scale Mars operation needs reactors, energy, heat control, and recovery.'],
    phb:['Carbon source + microbe cultivation → PHB','Future path to biological materials.','Making PHB at scale from Martian resources remains unproven.'],
    closedLoop:['Used water and air → separation and cleaning → reuse','Future path toward lower resupply needs.','No recycling loop is perfectly closed.'],
    hopper:['Methane + separately produced oxygen → propellant','Future mobility concept; unavailable in this match.','This is a research idea and a game concept, not demonstrated Mars hardware.']
  };
  const source=new WeakMap(),attributeSource=new WeakMap();
  const termKeys=Object.keys(words).sort((a,b)=>b.length-a.length);
  function translate(input){let s=String(input);if(full[s.trim()])return s.replace(s.trim(),full[s.trim()]);for(const [ja,en] of Object.entries(full).sort((a,b)=>b[0].length-a[0].length))s=s.replaceAll(ja,en);for(const ja of termKeys)s=s.replaceAll(ja,words[ja]);s=s.replace(/([A-Za-z0-9])の([A-Za-z0-9])/g,'$1 $2').replaceAll('・',' · ').replaceAll('、',', ').replaceAll('。','. ').replaceAll('→',' → ');return s;}
  function log(entry){
    if(lang==='ja')return {title:entry.title,body:entry.body};
    const who=entry.owner===0?'Ares':entry.owner===1?'Vega':'Both teams',title=entry.title,body=entry.body;
    if(title==='Arcadia Planitiaに着陸')return {title:'Landed in Arcadia Planitia',body:'Two expeditions build civilizations on real Martian terrain.'};
    if(title.startsWith('発明：'))return {title:`Research: ${translate(title.slice(3))}`,body:`${who} unlocked a new invention. Follow its branch in the research tree to see its materials and use.`};
    if(title.startsWith('建設：'))return {title:`Built: ${translate(title.slice(3))}`,body:`${who} completed ${translate(title.slice(3))} at a base.`};
    if(title.startsWith('製作：'))return {title:`Unit built: ${translate(title.slice(3))}`,body:`${who} spent Industry and materials to build a unit.`};
    if(title.startsWith('初生産：'))return {title:`First output: ${translate(title.slice(4))}`,body:`${who}'s ${translate(title.slice(4))} produced its first resources.`};
    const fixed={
      '現地調査':['Field survey',`${who} investigated a resource clue. ${body.includes('通信圏外')?'The rover will share its findings when communications resume.':'The observation was shared with the base.'}`],
      'セントリーを展開':['Sentry deployed',`${who} connected the sentry to power and opened its cooling surfaces.`],
      'セントリーを撤収':['Sentry folded',`${who} folded the sentry for movement.`],
      '機体が交戦':['Unit combat',`${who} damaged a rival unit${body.match(/(\d+)損傷/)?.[1]?` for ${body.match(/(\d+)損傷/)[1]} HP`:''}.`],
      '拠点へ攻撃':['Base attacked',`${who} attacked a rival base.`],
      '中枢基地を攻略':['Core under siege',`${who} disabled the rival core. Hold it through the rival response to win.`],
      '拠点を修復':['Base repaired',`${who} used parts to restore base defenses.`],
      '設備を修復':['Facility repaired',`${who} used replacement parts.`],
      '工房を強化':['Workshop upgraded',`${who} used metal and parts to increase parts output by 1 per turn.`],
      '工作クローラーを強化':['Crawler armored',`${who} used metal and parts to increase crawler HP by 1.`],
      '前哨基地を確保':['Outpost captured',`${who} extended its supply area.`],
      '中枢基地を補強':['Habitat reinforced',`${who} used fired building material and parts to strengthen the core.`],
      '補給が不足':['Supplies depleted',`${who} is short of water, oxygen, or food. Continued shortage forces evacuation.`],
      '観測を共有':['Survey shared',`${who}'s rover transmitted stored observations to the base.`],
      '砂嵐の予報':['Dust storm forecast','Solar generation will drop for two turns starting next turn.'],
      '砂嵐が到来':['Dust storm arrived','Stored power and the order of facility operation now matter.'],
      '空が晴れた':['Skies cleared','Solar generation has recovered.'],
      '環境警報':['Environmental alert',`Forecast: ${translate(body.split('の予報')[0])}. Prepare for the next turn.`],
      '設備が故障':['Facility failure',`${who} must repair a facility with parts.`],
      '中枢基地を占領':['Core captured',`${who} held the rival core through its response turn.`],
      '基地から退避':['Base evacuated',body.includes('両陣営')?'Both teams ran out of life support supplies.':`${translate(body.split('の補給')[0])} ran out of life support supplies.`]
    };
    if(fixed[title])return {title:fixed[title][0],body:fixed[title][1]};
    if(title.endsWith('が発生'))return {title:`${translate(title.slice(0,-3))} began`,body:translate(body)};
    return {title:'Original entry (Japanese)',body:`${title} — ${body}`};
  }
  function apply(root=document.body){document.documentElement.lang=lang;document.title=lang==='en'?'Dr. Hematite | Mars Civilization':'Dr. Hematite | 火星文明戦線';const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode())){if(node.parentElement?.closest('script,style,svg'))continue;if(!source.has(node))source.set(node,node.nodeValue);const original=source.get(node);node.nodeValue=lang==='en'?translate(original):original;}for(const el of [root,...root.querySelectorAll('[aria-label],[title],[alt]')])for(const a of ['aria-label','title','alt'])if(el.hasAttribute?.(a)){if(!attributeSource.has(el))attributeSource.set(el,{});const originals=attributeSource.get(el);if(!(a in originals))originals[a]=el.getAttribute(a);el.setAttribute(a,lang==='en'?translate(originals[a]):originals[a]);}const toggle=document.getElementById('language-toggle');if(toggle)toggle.textContent=lang==='en'?'EN → JP':'JP → EN';for(const link of root.querySelectorAll('a[href*="learn/"]')){const url=new URL(link.href,location.href);url.searchParams.set('lang',lang);link.href=url.href;}}
  function set(next){lang=next==='ja'?'ja':'en';try{localStorage.setItem('hematite-language',lang);}catch{}apply(document.body);}
  window.HematiteI18n={get lang(){return lang;},set,apply,translate,log,science};
})();
