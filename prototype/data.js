/* Research content and prototype rules. Costs and resource units are game assumptions. */
window.MARS_DATA = (() => {
 const sources={water:'https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/',ice:'https://www.jpl.nasa.gov/images/pia26045-swim-map-shows-subsurface-water-ice-on-mars/',metal:'../docs/science/SCIENCE_ROADMAP.md',plastic:'https://www.nasa.gov/missions/station/solving-the-challenges-of-long-duration-space-flight-with-3d-printing/',plants:'https://www.nasa.gov/missions/station/iss-research/growing-plants-in-space/'};
 const make=(id,name,row,col,deps,cost,symbol,benefit,inputs,fact,steps,source='metal',status='科学に基づく工程 / 火星での設備運用はゲームの想定')=>({id,name,row,col,deps,cost,symbol,benefit,inputs,fact,steps,source:sources[source],status});
 const techs=[
 make('survey','地質調査',0,0,[],0,'⌖','隣接地を調査して資源を確かめる。','ローバー・センサー・試料','軌道上の観測は資源候補を探す手がかり。現地で組成や採取条件を確かめます。',['観測から候補地を選ぶ','現地で試料を調べる','資源として使えるか判断'], 'ice','初期装備 / 観測と推定を区別'),
 make('wheels','起伏走行',0,1,['survey'],6,'▱','ローバーの移動距離が1→2マスになる。','走行機構・電力・整備','地形や機体の性能が移動できる範囲を変えます。',['地形を調べる','走行機構を調整する','遠くの候補地へ進む']),
 make('scouting','広域探査',0,2,['wheels'],9,'◎','ローバーが見渡せる範囲が広がる。','観測機器・通信・電力','広い範囲を見ることと、試料の成分を確認することは別の仕事です。',['広域の様子を観測','候補を絞り込む','現地分析へつなぐ']),
 make('logistics','拠点間輸送',0,3,['scouting','metalwork'],13,'⇄','自分の各拠点の収入が+1。','輸送機材・部品・補給','輸送の確立により、異なる場所で得た素材を利用できます。',['拠点ごとの素材を確認','輸送経路を整える','別の拠点で素材を利用']),
 make('ice','氷の採取',1,0,['survey'],4,'❄','氷マスに採取場を建てられる。','氷の確認・掘削機・電力','氷候補地でも、採取できる深さや量は現地で確かめる必要があります。',['氷の存在を確認','掘削機で採取','氷を処理設備へ運ぶ'],'ice'),
 make('water','融解・浄化',1,1,['ice'],6,'◒','採取場を採水場へ改良。水を生産する。','氷・加熱装置・浄化装置','氷を溶かしただけでは使える水とは限りません。用途に応じた処理が必要です。',['氷に熱を加える','水を浄化する','利用できる水を確保'],'water'),
 make('electrolysis','水の電気分解',1,2,['water','power'],8,'H₂','電解設備を設置。水から酸素と水素を得る。','水・電力・電解装置','2H₂O → 2H₂ + O₂。原子の種類と数を保ちながら、別の分子へ変わります。',['水と電力を装置へ','水素と酸素に分ける','酸素は生活へ、水素は次の研究へ'],'water','地球・宇宙ステーションで利用される技術'),
 make('methane','メタン合成',1,3,['electrolysis','furnace'],12,'CH₄','化学設備を設置し、メタンと水を得る。','CO₂・水素・触媒・反応器・熱管理','CO₂ + 4H₂ → CH₄ + 2H₂O。回収・分離と反応条件の管理も必要です。',['CO₂と水素を用意','触媒を使って反応','メタンと水を分けて回収'],'water'),
 make('mineral','鉱物分析',2,0,['survey'],4,'◇','鉄・ケイ酸塩候補を調査し、採取場を作る。','試料・分析装置','鉄元素が多いことと、使いやすい鉄鉱物があることは同じではありません。',['岩石の試料を採る','含まれる鉱物を分析','使える工程を選ぶ']),
 make('furnace','高温炉',2,1,['mineral','power'],7,'♨','焼成・還元など、高温を使う研究へ進める。','耐熱材料・加熱設備・電力','温度や雰囲気を制御する装置が必要です。鉱石を温めるだけで鉄になるわけではありません。',['原料に必要な条件を確認','炉の温度と雰囲気を制御','目的の処理を行う']),
 make('iron','鉄の還元',2,2,['furnace','electrolysis'],10,'Fe','還元設備を設置し、鉄系材料を得る。','分析済みの酸化鉄・水素・熱・反応装置','Fe₂O₃ + 3H₂ → 2Fe + 3H₂O。金属の利用には回収・精製・加工も必要です。',['酸化鉄と水素を用意','熱と装置で還元','鉄を回収し、加工へ進む']),
 make('metalwork','金属加工',2,3,['iron'],12,'⚒','金属部品を製作。工房の収入がさらに+1。','鉄系材料・加工機・工具・電力','材料の性質や部品の精度に合った加工を選びます。',['材料の性質を調べる','用途に合う形へ加工','部品の働きを確かめる']),
 make('regolith','レゴリス処理',3,0,['survey'],4,'▦','地表の材料を集める採取場を建てる。','レゴリス・ふるい・分析機器','レゴリスの粒径や組成によって使い道が変わります。',['表面の材料を採取','ふるい分け・分析','用途に合う原料を選ぶ']),
 make('ceramics','成形・焼成',3,1,['regolith','furnace'],7,'▥','焼成設備を設置し、建材候補を作る。','組成を確認した原料・成形・炉','どんな砂でも焼けば優れた建材になるわけではありません。',['原料を調整する','形を作り焼成する','強度や断熱性を試す']),
 make('glass','ガラス材料',3,2,['ceramics','mineral'],9,'▯','ガラス研究を経て居住設備の拡張へ進む。','適した鉱物原料・配合・融解設備','ケイ素の観測地図は、高純度の石英の採掘地図ではありません。',['鉱物と組成を確認','配合・融解・成形','用途に必要な性能を確認']),
 make('habitat','居住区拡張',3,3,['glass','printing'],12,'⌂','居住施設を建設。拠点の発展度が大きく上がる。','評価済みの建材・部品・持参した生命維持機器','居住区には気密、温度制御、遮蔽、生命維持が必要です。',['用途に合う建材を用意','設備と部品を組み合わせる','人が暮らす条件を整える']),
 make('sorting','樹脂の選別',4,0,[],4,'♻','持参した廃樹脂の再利用を研究する。','廃樹脂・材質の確認・洗浄','違う樹脂を無条件に混ぜても、同じ性質の材料にはなりません。',['樹脂の種類を確認','分けて洗浄する','再利用に適したものを選ぶ'],'plastic'),
 make('filament','再生フィラメント',4,1,['sorting'],6,'◎','再生設備を設置。廃樹脂から材料を得る。','選別した樹脂・粉砕・溶融押出','再利用では劣化や材質を確かめ、使える用途を選びます。',['樹脂を粉砕する','溶融して押し出す','材料の品質を確かめる'],'plastic'),
 make('printing','素材と3Dプリント',4,2,['filament','power'],8,'▣','工房を設置し、素材から部品を製作する。','適したフィラメント・持参プリンタ・電力','材料の耐熱性や強度によって、作れる部品の用途が変わります。',['部品の用途と材質を選ぶ','形を設計して印刷する','使う条件に耐えるか確認'],'plastic'),
 make('phb','PHB材料研究',4,3,['printing','electrolysis','farming'],14,'PHB','将来の現地樹脂生産を研究ノートで学ぶ。','炭素原料の生成・微生物・養分・培養・精製','火星での大規模PHB製造は実証済みではありません。この枝は将来構想です。',['利用できる炭素原料を作る','微生物を培養する','PHBの回収・精製・材料評価'],'metal','研究構想 / この試作では製造設備は未実装'),
 make('power','電力配分',5,0,[],0,'ϟ','太陽電池を設置し、設備に電力を配る。','持参した電源・配電・保守機材','発電量と消費量を比べ、足りないときは優先順位を決めます。',['発電と需要を確認','動かす設備を選ぶ','余力と不足を確かめる']),
 make('storage','蓄電',5,1,['power'],6,'▤','蓄電設備を設置。晴天の余剰を砂嵐に備える。','持参した蓄電モジュール・制御機器','電力を貯めるには装置と容量が必要です。蓄電池だけで発電はできません。',['余剰電力を充電','必要なときに放電','容量と残量を確認']),
 make('farming','栽培・水回収',5,2,['water','power'],9,'♧','温室を設置。水と電力を使って食料を育てる。','水・光・種・養分・環境制御','植物は水だけでは育ちません。回収にも処理装置とエネルギーが必要です。',['水・光・養分をそろえる','温度や環境を管理','収穫して水の回収も進める'],'plants'),
 make('settlement','自給型居住区',5,3,['farming','habitat','storage'],15,'⌘','自給に向けた複数技術の結びつきを記録する。','食料・水・酸素・電力・保守・部品','一部を現地で作れても、すべてが自給できるとは限りません。',['各設備をつなぐ','不足する物資を調べる','現地で作れる割合を増やす'],'water','長期目標の候補 / 完全自給を意味しない')
 ];
 const improvements={
 iceMine:{name:'氷採取場',cost:3,tech:'ice',resource:'ice',power:1,growth:1,output:{ice:2}},
 waterPlant:{name:'採水場',cost:4,tech:'water',resource:'ice',power:2,growth:1,output:{water:2},upgrade:'iceMine'},
 mine:{name:'鉱物採取場',cost:3,tech:'mineral',resource:'iron',power:1,growth:1,output:{ore:2}},
 regolithPit:{name:'レゴリス採取場',cost:3,tech:'regolith',power:1,growth:1,output:{regolith:2}},
 solar:{name:'太陽電池',cost:3,tech:'power',power:0,growth:1,output:{}},
 battery:{name:'蓄電設備',cost:4,tech:'storage',power:0,growth:1,output:{}},
 oxygenPlant:{name:'電解設備',cost:5,tech:'electrolysis',power:2,growth:1,input:{water:1},output:{oxygen:2,hydrogen:1}},
 furnace:{name:'鉄の還元設備',cost:6,tech:'iron',power:3,growth:2,input:{ore:1,hydrogen:1},output:{metal:1,water:1}},
 kiln:{name:'焼成設備',cost:5,tech:'ceramics',power:2,growth:1,input:{regolith:1},output:{ceramic:1}},
 recycling:{name:'樹脂再生設備',cost:4,tech:'filament',power:1,growth:1,input:{scrap:1},output:{resin:1}},
 metalWorkshop:{name:'金属工作室',cost:7,tech:'metalwork',power:2,growth:2,input:{metal:1},output:{parts:2}},
 workshop:{name:'工房',cost:5,tech:'printing',power:1,growth:2,input:{resin:1},output:{parts:1}},
 greenhouse:{name:'温室',cost:5,tech:'farming',power:2,growth:2,input:{water:1},output:{food:2}},
 habitat:{name:'居住施設',cost:7,tech:'habitat',power:1,growth:3,materials:{ceramic:2,parts:1},output:{}},
 chemistry:{name:'メタン合成設備',cost:6,tech:'methane',power:2,growth:1,input:{hydrogen:2},output:{methane:1,water:1}}
 };
 return {techs,improvements,branches:[['探査と輸送','#719295'],['水と化学','#64a1ae'],['鉱物と金属','#b77860'],['地表から建材へ','#ad9369'],['樹脂と製造','#8a8fba'],['電力と暮らし','#859965']],names:{ice:'氷',water:'水',oxygen:'酸素',food:'食料',ore:'鉄鉱物',regolith:'レゴリス',hydrogen:'水素',metal:'鉄系材料',ceramic:'建材',scrap:'廃樹脂',resin:'樹脂',parts:'部品',methane:'メタン'}};
})();
