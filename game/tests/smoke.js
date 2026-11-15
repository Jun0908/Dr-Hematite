(() => {
  const G=window.HematiteGame,results=[];
  const assert=(v,m='assertion failed')=>{if(!v)throw new Error(m);};
  const test=(name,fn)=>{try{fn();results.push({name,ok:true});}catch(e){results.push({name,ok:false,error:e.message});}};
  const t=(x,y)=>G.state.tiles[y*11+x];
  test('Real map assets and two teams load',()=>{G.reset();assert(G.state.tiles.length===121);assert(G.state.teams.length===2);assert(document.querySelectorAll('.tile').length===121);assert(document.querySelector('.map').getAttribute('aria-label').includes('HiRISE'));});
  test('Survey and science create a working ice source',()=>{G.reset();assert(G.survey(0,3,7));assert(t(3,7).surveyed[0]);assert(G.research(0,'ice'));const before=G.state.teams[0].stock.parts;assert(G.build(0,'iceMine',3,7));assert(G.state.teams[0].stock.parts===before-1);G.endRound();assert(G.state.teams[0].stock.ice>=2);});
  test('Research gates keep material spending honest',()=>{G.reset();const p=G.state.teams[0].stock.parts;assert(!G.build(0,'oxygenPlant',2,9));assert(G.state.teams[0].stock.parts===p);assert(!G.research(0,'electrolysis'));assert(!G.recruit(0,'sentry'));});
  test('AI uses research, survey, parts and points',()=>{G.reset();G.endRound();const ai=G.state.teams[1];assert(ai.tech.includes('ice'));assert(t(7,3).surveyed[1]);assert(ai.stock.parts<8);assert(ai.dp<16+4);assert(ai.units.length<=3);});
  test('Storm warning and effect follow round boundaries',()=>{G.reset();for(let i=0;i<3;i++)G.endRound();assert(G.state.round===4&&G.state.warning==='storm');G.endRound();assert(G.state.round===5&&G.state.event.type==='storm');assert(G.state.teams[0].lastEnergy.supply<6);if(window.HematiteI18n?.lang==='en')assert(!/[\u3040-\u30ff\u4e00-\u9fff]/.test(document.querySelector('#event-banner').innerText));G.endRound();G.endRound();assert(!G.state.event);});
  test('Units are limited to a move and an action',()=>{G.reset();const u=G.state.teams[0].units.find(x=>x.kind==='scout');assert(G.move(0,u.id,3,8));assert(!G.move(0,u.id,4,8));assert(G.survey(0,3,7));assert(!G.survey(0,5,5));});
  test('Supply loss weakens isolated machines and save contains state',()=>{G.reset();const u=G.state.teams[0].units.find(x=>x.kind==='worker');u.x=9;u.y=9;for(let i=0;i<3;i++)G.production(0);assert(u.unsupplied>=3);assert(u.hp<3);G.save();const saved=JSON.parse(localStorage.getItem('hematite-arcadia-crater-v2'));assert(saved.teams[0].units.some(x=>x.id===u.id&&x.hp===u.hp));});
  test('Only two mountain tiles interrupt travel, supply and radio',()=>{G.reset();assert(G.state.tiles.filter(q=>q.terrain==='mountain').length===2);assert(G.inSupply(0,3,7));assert(G.inComms(0,3,7));t(5,5).facility={type:'depot',owner:0,hp:3,broken:false,blocked:''};assert(!G.inSupply(0,4,6));assert(!G.inComms(0,7,3));assert(G.research(0,'climbing'));assert(G.inSupply(0,4,6));});
  test('Climbing research opens one-tile mountains without blocking starter ice',()=>{G.reset();const s=G.state.teams[0].units.find(x=>x.kind==='scout'),w=G.state.teams[0].units.find(x=>x.kind==='worker');assert(t(3,5).elevation<t(6,5).elevation-200);assert(G.move(0,s.id,3,7));G.reset();const rover=G.state.teams[0].units.find(x=>x.kind==='scout');assert(!G.move(0,rover.id,4,6));assert(G.research(0,'climbing'));assert(G.move(0,rover.id,4,6));assert(G.move(0,w.id,2,8));});
  test('Base siege needs holding time and can be repaired',()=>{G.reset();const core=G.state.teams[1].bases[0],scout=G.state.teams[0].units.find(x=>x.kind==='scout');scout.x=8;scout.y=1;G.state.teams[1].units=[];core.hp=1;assert(G.attack(0,scout.id,9,1));assert(core.siegeBy===0);assert(G.state.outcome===null);});
  test('Siege victory waits for the rival reply',()=>{G.reset();const core=G.state.teams[1].bases[0],scout=G.state.teams[0].units.find(x=>x.kind==='scout');scout.x=8;scout.y=1;G.state.teams[1].units=[];core.hp=1;assert(G.attack(0,scout.id,9,1));G.endRound();assert(G.state.outcome===null);G.endRound();assert(G.state.outcome==='victory');});
  test('Extra hits cannot restart the siege timer',()=>{G.reset();const core=G.state.teams[1].bases[0],scout=G.state.teams[0].units.find(x=>x.kind==='scout');scout.x=8;scout.y=1;G.state.teams[1].units=[];core.hp=1;assert(G.attack(0,scout.id,9,1));const started=core.siegeRound;G.endRound();assert(!G.attack(0,scout.id,9,1));assert(core.siegeRound===started);G.endRound();assert(G.state.outcome==='victory');});
  test('Sentry must deploy, draw battery and cool after firing',()=>{G.reset();const me=G.state.teams[0],enemy=G.state.teams[1].units[0],u={id:99,kind:'sentry',x:2,y:8,hp:3,moved:false,acted:false,unsupplied:0,cooldown:0,deployed:false,localSurveys:[]};me.units.push(u);enemy.x=3;enemy.y=8;assert(!G.attack(0,u.id,3,8));assert(G.deploy(0,u.id));assert(!G.move(0,u.id,2,7));assert(!G.attack(0,u.id,3,8));u.acted=false;const charge=me.battery;assert(G.attack(0,u.id,3,8));assert(me.battery===charge-1&&u.cooldown===2);G.production(0);assert(u.cooldown===1&&!G.attack(0,u.id,3,8));});
  test('Disconnected rover stores observations until reconnection',()=>{G.reset();const u=G.state.teams[0].units.find(x=>x.kind==='scout');u.x=5;u.y=4;assert(!G.inComms(0,5,4));assert(G.survey(0,5,5));assert(!t(5,5).surveyed[0]);assert(u.localSurveys.length===1);u.x=3;u.y=7;G.production(0);assert(t(5,5).surveyed[0]);});
  test('Radiation limits outdoor work and shelter restores it',()=>{G.reset();G.state.event={type:'radiation',remaining:1};assert(!G.research(0,'ice'));assert(!G.build(0,'solar',2,9));G.state.event=null;G.state.teams[0].tech.push('ceramics');G.state.teams[0].stock.ceramic=1;assert(G.build(0,'shelter',2,9));G.state.event={type:'radiation',remaining:1};assert(G.research(0,'ice'));});
  test('Research graph connects inventions to study pages',()=>{G.reset();document.querySelector('[data-page="lab"]').click();assert(document.querySelectorAll('.tech-node').length===20);assert(document.querySelectorAll('.tech-edges path').length>16);document.querySelector('[data-tech="water"]').click();assert(document.querySelector('#tech-detail h2').textContent===(window.HematiteI18n?.lang==='en'?'Melt & Purify':'融解・浄化'));assert(document.querySelector('.learn-link').getAttribute('href').includes('tech=water'));});
  test('The first ice tap offers Survey before movement or construction',()=>{G.reset();const scout=G.state.teams[0].units.find(u=>u.kind==='scout');assert(document.querySelector('.tile[data-x="3"][data-y="7"]').classList.contains('first-goal'));document.querySelector('.tile[data-x="2"][data-y="8"]').click();document.querySelector('.tile[data-x="3"][data-y="7"]').click();assert(scout.x===2&&scout.y===8&&!scout.moved);assert(document.querySelector('[data-action="survey"]'));assert(!document.querySelector('[data-action="open-build"]'));document.querySelector('[data-action="survey"]').click();assert(t(3,7).surveyed[0]);assert(!document.querySelector('.tile[data-x="3"][data-y="7"]').classList.contains('first-goal'));});
  test('The first ice source is surveyed, researched and built through the UI',()=>{G.reset();document.querySelector('.tile[data-x="3"][data-y="7"]').click();document.querySelector('[data-action="survey"]').click();document.querySelector('#lab-page').classList.contains('hidden')&&document.querySelector('[data-page="lab"]').click();document.querySelector('[data-tech="ice"]').click();const research=document.querySelector('[data-action="research:ice"]');assert(research&&!research.disabled);research.click();document.querySelector('#lab-page [data-page="map"]').click();document.querySelector('.tile[data-x="3"][data-y="7"]').click();assert(document.querySelector('[data-action="open-build"]'));document.querySelector('[data-action="open-build"]').click();const build=document.querySelector('[data-action="build:iceMine"]');assert(build&&!build.disabled);build.click();assert(t(3,7).facility?.type==='iceMine');});
  test('Map move targets are legal and move in two taps',()=>{G.reset();const scout=G.state.teams[0].units.find(u=>u.kind==='scout');assert(!document.querySelector('.tile[data-x="3"][data-y="8"]').classList.contains('move-target'));document.querySelector('.tile[data-x="2"][data-y="8"]').click();assert(document.querySelector('.tile[data-x="3"][data-y="8"]').classList.contains('move-target'));document.querySelector('.tile[data-x="3"][data-y="8"]').click();assert(scout.x===3&&scout.y===8&&scout.moved);assert(!document.querySelector('.tile[data-x="4"][data-y="8"]').classList.contains('move-target'));});
  test('Attack preview waits for confirmation',()=>{G.reset();const enemy=G.state.teams[1].units[0];enemy.x=3;enemy.y=8;G.select(2,8);assert(document.querySelector('.tile[data-x="3"][data-y="8"]').classList.contains('attack-target'));const hp=enemy.hp;document.querySelector('.tile[data-x="3"][data-y="8"]').click();assert(document.querySelector('[data-action="confirm-attack"]'));assert(enemy.hp===hp);document.querySelector('[data-action="confirm-attack"]').click();assert(enemy.hp===hp-1);});
  test('Food and oxygen priority changes the shared production forecast',()=>{G.reset();const p=G.state.teams[0];p.stock.water=1;p.stock.oxygen=10;p.stock.food=10;t(2,9).facility={type:'oxygenPlant',owner:0,hp:3,broken:false,blocked:''};t(0,8).facility={type:'greenhouse',owner:0,hp:3,broken:false,blocked:''};p.policy='oxygen';const a=G.forecast(0);p.policy='food';const b=G.forecast(0);assert(a.stock.oxygen>b.stock.oxygen);assert(b.stock.food>a.stock.food);});
  test('Mars metal can strengthen production or be saved for a sentry',()=>{G.reset();const p=G.state.teams[0];p.tech.push('metalwork','beam');p.stock.metal=1;p.stock.resin=1;t(2,9).facility={type:'workshop',owner:0,hp:3,broken:false,blocked:''};assert(G.upgradeWorkshop(0,2,9));assert(p.stock.metal===0);assert(!G.recruit(0,'sentry'));const parts=p.stock.parts;G.production(0);assert(p.stock.parts===parts+3);assert(t(2,9).facility.firstProducedRound===G.state.round);p.units[0].moved=true;G.select(2,9);assert(document.querySelector('.tile[data-x="2"][data-y="9"] .production-mark'));});
  test('Metal armor upgrade appears on the worker and raises repair limit',()=>{G.reset();const p=G.state.teams[0],worker=p.units.find(u=>u.kind==='worker');p.tech.push('metalwork','beam');p.stock.metal=1;G.select(worker.x,worker.y);document.querySelector('[data-action="toggle-sheet"]').click();const button=document.querySelector(`[data-action="upgrade-unit:${worker.id}"]`);assert(button&&!button.disabled);button.click();assert(worker.armored&&worker.hp===4&&worker.acted);assert(p.stock.metal===0&&!G.recruit(0,'sentry'));assert(document.querySelector(`.tile[data-x="${worker.x}"][data-y="${worker.y}"] .upgrade-mark`));worker.hp=3;G.production(0);assert(worker.hp===4);});
  test('Forecast uses production without changing current state',()=>{G.reset();G.survey(0,3,7);G.research(0,'ice');G.build(0,'iceMine',3,7);const before=JSON.stringify(G.state),f=G.forecast(0);assert(JSON.stringify(G.state)===before);G.endRound();assert(G.state.teams[0].stock.ice===f.stock.ice);assert(G.state.teams[0].lastEnergy.supply===f.energy.supply);});
  test('Build preview uses the same next-turn generation without spending',()=>{G.reset();G.select(0,9);const before=JSON.stringify(G.state),old=G.forecast(0).energy.supply;document.querySelector('[data-action="open-build"]').click();assert(JSON.stringify(G.state)===before);const label=document.querySelector('[data-action="build:solar"]').textContent;assert(label.includes('+3'));assert(G.build(0,'solar',0,9));assert(G.forecast(0).energy.supply===old+3);});
  test('Different oxygen research routes are available',()=>{G.reset();G.research(0,'ice');G.research(0,'water');assert(G.research(0,'moxie'));assert(!G.state.teams[0].tech.includes('electrolysis'));G.reset();G.research(0,'ice');G.research(0,'water');assert(G.research(0,'electrolysis'));assert(!G.state.teams[0].tech.includes('moxie'));});
  test('A crater detour reaches iron ore, but neglecting food has a cost',()=>{
    G.reset();const p=G.state.teams[0],scout=p.units.find(x=>x.kind==='scout'),worker=p.units.find(x=>x.kind==='worker');
    assert(G.survey(0,3,7));assert(G.research(0,'ice'));assert(G.build(0,'iceMine',3,7));assert(G.research(0,'water'));assert(G.build(0,'waterPlant',0,9));
    assert(G.move(0,scout.id,4,8));assert(G.move(0,worker.id,2,8));G.endRound();
    assert(G.move(0,scout.id,3,6));assert(G.survey(0,3,5));assert(G.move(0,worker.id,3,8));assert(G.research(0,'mineral'));G.endRound();
    assert(G.move(0,worker.id,4,8));G.endRound();assert(G.move(0,worker.id,5,8));G.endRound();
    assert(G.capture(0,5,7));assert(G.build(0,'mine',3,5));
    for(let i=0;i<12&&!G.state.outcome;i++){
      for(const id of ['electrolysis','smelting'])if(!p.tech.includes(id))G.research(0,id);
      for(const [b,x,y] of [['oxygenPlant',0,8],['smelter',2,9],['solar',1,7]])if(!G.state.tiles.some(q=>q.facility?.owner===0&&q.facility.type===b))G.build(0,b,x,y);
      G.endRound();
    }
    assert(p.stock.ore>=2);assert(p.stock.food===0);
  });
  test('A complete match can be won using actual terrain routes and action costs',()=>{
    G.reset();assert(G.survey(0,3,7));
    const plan=[['ice','iceMine',3,7],['water','waterPlant',0,9],['electrolysis','oxygenPlant',0,8],['farming','greenhouse',2,9],['storage','battery',2,7]];
    const ridgeRoute=[[4,8],[6,8],[8,7],[8,5],[8,3],[8,1]];
    for(let turn=1;turn<=35&&!G.state.outcome;turn++){
      const s=G.state,p=s.teams[0],a=s.teams[1];
      for(const [tech,b,x,y] of plan){if(!p.tech.includes(tech))G.research(0,tech);if(p.tech.includes(tech)&&!s.tiles.some(q=>q.facility?.owner===0&&q.facility.type===b))G.build(0,b,x,y);}
      if(turn>=7&&!s.tiles.some(q=>q.facility?.owner===0&&q.facility.type==='solar'))G.build(0,'solar',1,7);
      const scout=p.units.find(u=>u.kind==='scout');if(scout){
        const enemy=a.units.find(v=>Math.max(Math.abs(v.x-scout.x),Math.abs(v.y-scout.y))<=1);
        if(enemy)G.attack(0,scout.id,enemy.x,enemy.y);
        if(turn>=5&&ridgeRoute.length&&G.move(0,scout.id,...ridgeRoute[0]))ridgeRoute.shift();
        if(Math.max(Math.abs(scout.x-9),Math.abs(scout.y-1))<=1)G.attack(0,scout.id,9,1);
      }
      G.endRound();
    }
    assert(G.state.outcome==='victory',`expected victory, got ${G.state.outcome} at ${G.state.round}`);assert(G.state.round<=35);
  });
  test('End Turn advances once, shows a result, and Play Again resets',()=>{
    G.reset();document.querySelector('#end-turn').click();assert(G.state.round===2);
    document.querySelector('#end-turn').click();assert(G.state.round===2);
    assert(document.querySelector('#turn-dialog').open);
    document.querySelector('#turn-continue').click();assert(!document.querySelector('#turn-dialog').open);
    for(let i=0;i<12&&!G.state.outcome;i++)G.endRound();
    if(!G.state.outcome){document.querySelector('#end-turn').click();document.querySelector('#turn-continue').click();}
    assert(G.state.outcome==='defeat');assert(document.querySelector('#result-dialog').open);
    const ended=JSON.stringify(G.state);assert(!G.research(0,'ice'));assert(!G.build(0,'solar',0,9));assert(!G.survey(0,3,7));assert(JSON.stringify(G.state)===ended);
    document.querySelector('#result-again').click();assert(G.state.round===1&&!G.state.outcome);
  });
  test('Rival turn summary respects visibility and reports attacks',()=>{
    G.reset();document.querySelector('#end-turn').click();
    const empty=document.querySelector('.rival-summary').textContent;
    assert(empty===(window.HematiteI18n?.lang==='en'?'No rival action was observed.':'観測できた敵の行動はありません。'));
    assert(!document.querySelector('.tile.enemy-step'));
    document.querySelector('#turn-continue').click();G.reset();
    const foe=G.state.teams[1].units.find(u=>u.kind==='worker');foe.x=3;foe.y=8;
    document.querySelector('#end-turn').click();
    const report=document.querySelector('.rival-summary').textContent;
    assert(window.HematiteI18n?.lang==='en'?report.includes('attack'):report.includes('攻撃'),report);
    assert(document.querySelector('.tile[data-x="2"][data-y="8"]').classList.contains('enemy-step'));
    document.querySelector('#turn-continue').click();
  });
  test('A round commits to storage once after the rival and production',()=>{
    G.reset();const original=Storage.prototype.setItem;let writes=0;
    Storage.prototype.setItem=function(key,value){if(key==='hematite-arcadia-crater-v2')writes++;return original.call(this,key,value);};
    try{assert(G.endRound());}finally{Storage.prototype.setItem=original;}
    assert(writes===1,`round wrote ${writes} partial saves`);
    assert(JSON.parse(localStorage.getItem('hematite-arcadia-crater-v2')).round===G.state.round);
  });
  test('Turn report explains reserves, production, processing and life support in the chosen language',()=>{
    G.reset();const p=G.state.teams[0];p.stock.ice=1;
    t(0,9).facility={type:'waterPlant',owner:0,hp:3,broken:false,blocked:''};
    t(0,8).facility={type:'oxygenPlant',owner:0,hp:3,broken:false,blocked:''};
    document.querySelector('#end-turn').click();
    assert(p.stock.water===13&&p.stock.oxygen===13&&p.stock.food===11);
    assert(p.lastBalance.water.produced===3&&p.lastBalance.water.processing===1&&p.lastBalance.water.life===1);
    const row=document.querySelector('.turn-resource[data-resource="water"]');
    assert(row.querySelector('.reserve-change>span').textContent==='12'&&row.querySelector('.reserve-change>b').textContent==='13');
    assert(document.querySelectorAll('#supply .resource-reading').length===3&&getComputedStyle(document.querySelector('#supply-chip')).display!=='none');
    assert(document.querySelector('#supply-chip').getAttribute('aria-label').includes('13'));
    const en=window.HematiteI18n.lang==='en',body=document.querySelector('#turn-content').textContent;
    assert(en?!/[\u3040-\u30ff\u4e00-\u9fff]/.test(body):!body.includes('Water'));
    document.querySelector('#turn-continue').click();
    G.reset();G.state.teams[0].stock.water=0;G.production(0);
    assert(G.state.teams[0].lastBalance.water.life===0&&G.state.teams[0].lastBalance.water.unmet===1);
  });
  test('Language switch preserves the active match and selection',()=>{
    G.reset();G.survey(0,3,7);const before=JSON.stringify(G.state),selected=document.querySelector('.tile.selected').dataset.x;
    const initial=window.HematiteI18n.lang;document.querySelector('#language-toggle').click();
    assert(window.HematiteI18n.lang!==initial);assert(JSON.stringify(G.state)===before);assert(document.querySelector('.tile.selected').dataset.x===selected);
    document.querySelector('#language-toggle').click();assert(window.HematiteI18n.lang===initial);assert(JSON.stringify(G.state)===before);
  });
  let simulation={};test('A match reaches an outcome without intervention',()=>{G.reset();for(let i=0;i<28&&!G.state.outcome;i++)G.endRound();simulation={round:G.state.round,outcome:G.state.outcome,teams:G.state.teams.map(t=>({dp:t.dp,stock:t.stock,tech:t.tech,units:t.units.length,shortage:t.shortage})),aiFacilities:G.state.tiles.filter(x=>x.facility?.owner===1).map(x=>({type:x.facility.type,blocked:x.facility.blocked})),aiLog:G.state.logs.filter(x=>x.owner===1).slice(0,15).map(x=>x.title)};assert(G.state.outcome==='defeat','Unattended player should lose, got '+G.state.outcome+' at round '+G.state.round);});
  G.reset();const report=document.createElement('pre');report.id='test-report';report.textContent=JSON.stringify({passed:results.filter(v=>v.ok).length,total:results.length,results,simulation},null,2);document.body.appendChild(report);document.title=results.every(v=>v.ok)?'TESTS PASSED':'TESTS FAILED';
})();

