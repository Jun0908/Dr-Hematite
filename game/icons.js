/* Original vector game icons. Shared by map, research, costs, and lessons. */
(() => {
  const line = 'stroke="#342c38" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const shapes = {
    ice:'<path d="M8 43 25 12l13 10 16 25-19 9z" fill="#a8e9ee"/><path d="m25 12 2 28-19 3m30-21-11 18 8 16m-8-16 27 7" fill="none" stroke="#fff" stroke-width="3"/>',
    water:'<path d="M32 7C23 21 13 32 13 43a19 19 0 0 0 38 0C51 32 41 21 32 7Z" fill="#43bddd"/><path d="M22 42c0 8 5 12 10 12" fill="none" stroke="#d9fbff" stroke-width="4"/>',
    oxygen:'<rect x="17" y="14" width="30" height="42" rx="7" fill="#bce9e4"/><rect x="26" y="7" width="12" height="9" rx="2" fill="#587e87"/><text x="32" y="42" text-anchor="middle" font-size="18" font-weight="900" fill="#166678" stroke="none">O₂</text>',
    hydrogen:'<rect x="17" y="14" width="30" height="42" rx="7" fill="#d1c5ef"/><rect x="26" y="7" width="12" height="9" rx="2" fill="#587e87"/><text x="32" y="42" text-anchor="middle" font-size="18" font-weight="900" fill="#5a3f93" stroke="none">H₂</text>',
    food:'<path d="M13 49h38l-4 9H17z" fill="#9e5d42"/><path d="M32 49V18m0 20C17 34 13 23 15 17c12-2 17 4 17 14m0 5c15-2 20-11 18-19-10-1-18 4-18 15" fill="#78c773"/>',
    ore:'<path d="m8 45 9-22 18-10 18 16-5 23H17z" fill="#a75f50"/><path d="m17 23 18 14 18-8M35 37l-3 16" fill="none" stroke="#e7a47c" stroke-width="4"/>',
    metal:'<path d="M10 31h43l-5 19H15z" fill="#869bab"/><path d="M19 23h33l3 8H12z" fill="#d1e2e4"/><path d="M17 40h30" stroke="#fff" stroke-width="3"/>',
    regolith:'<path d="M7 48 20 25l8 5 9-17 19 36z" fill="#c09275"/><circle cx="20" cy="40" r="2" fill="#fff0d7"/><circle cx="42" cy="38" r="2" fill="#fff0d7"/>',
    mountain:'<path d="M5 52 23 16l9 15 9-21 18 42z" fill="#776873"/><path d="m23 16 6 11-10 3m22-20 7 16-10-4" fill="#e6d6c3"/><path d="M9 52h48" fill="none" stroke="#e4ae82" stroke-width="4"/>',
    climbing:'<path d="M8 51 24 21l8 15 10-23 16 38z" fill="#b18a72"/><path d="m17 46 12-10 9 5 10-19" fill="none" stroke="#e9efd8" stroke-width="4" stroke-dasharray="5 4"/><path d="m24 21 6 11-10-3m22-16 6 13-10-5" fill="#eee3d3"/>',
    ceramic:'<path d="M10 24h44v30H10z" fill="#d8b98a"/><path d="M10 39h44M25 24v15m14 0v15" stroke="#926f61" stroke-width="3"/>',
    scrap:'<path d="M11 18h42v35H11z" fill="#ae9fa0"/><path d="m19 26 13 8-11 12m19-20 7 5-9 14" fill="none" stroke="#f1d8cf" stroke-width="5"/>',
    resin:'<path d="M18 14h28l7 33-10 10H18L9 46z" fill="#75b7b1"/><path d="M24 21h16l5 25H18z" fill="#a6dfcf"/>',
    parts:'<path d="M13 15h37v34H13z" fill="#e8b966"/><path d="M19 22h25v20H19z" fill="#fae5b0"/><circle cx="31" cy="32" r="8" fill="#8498a6"/><circle cx="31" cy="32" r="3" fill="#f8df9b"/>',
    production:'<path d="M8 49h48v9H8z" fill="#d8ae82"/><path d="M12 49V30l12 8V27l12 8V18l17 9v22z" fill="#81b6aa"/><path d="M18 45v-5m13 5v-5m13 5v-5" stroke="#fff4d1" stroke-width="4"/><path d="M43 17V7h7v14" fill="#e4c49d"/>',
    research:'<path d="M32 14v17M32 31 13 47M32 31l19 16" fill="none" stroke="#e9d0a0" stroke-width="5"/><circle cx="32" cy="12" r="7" fill="#f2cb81"/><circle cx="12" cy="49" r="7" fill="#7acfc8"/><circle cx="52" cy="49" r="7" fill="#7acfc8"/><path d="M28 9h8m-27 40h6m34 0h6" stroke="#fff7dd" stroke-width="2"/>',
    battery:'<rect x="11" y="19" width="43" height="34" rx="6" fill="#e8c96f"/><path d="M25 19v-5h14v5" fill="#8797a6"/><path d="m36 25-11 14h8l-5 9 12-16h-8z" fill="#fff7cb"/>',
    solar:'<path d="M7 26h50L50 47H14z" fill="#4b9db4"/><path d="M19 26 14 47m17-21-2 21m14-21 3 21M9 36h45" stroke="#beeaf0" stroke-width="2" fill="none"/><path d="M24 48v9m16-9v9" stroke="#e4d2a6" stroke-width="4"/>',
    scout:'<circle cx="18" cy="47" r="7" fill="#2f3e4e"/><circle cx="47" cy="47" r="7" fill="#2f3e4e"/><path d="M10 39 19 28h28l7 12-8 8H18z" fill="#d9d1af"/><path d="M30 29V14l7-6m-5 9 13 6" stroke="#4b5362" stroke-width="4" fill="none"/><circle cx="45" cy="22" r="5" fill="#71d5e4"/>',
    worker:'<circle cx="17" cy="49" r="7" fill="#39414d"/><circle cx="48" cy="49" r="7" fill="#39414d"/><rect x="14" y="28" width="36" height="19" rx="5" fill="#dfab6e"/><path d="M35 29 42 15l10 4-8 15" fill="none" stroke="#ece0b8" stroke-width="5"/><path d="m50 19 6-8" stroke="#ece0b8" stroke-width="4"/>',
    sentry:'<path d="M15 51h35l-5-11H21z" fill="#697c91"/><path d="M26 41V26l7-6 13 8v12" fill="#d5d6c7"/><path d="m14 22 19-2 17-8" stroke="#66d9db" stroke-width="5" fill="none"/><path d="m7 28 13-4 4 17-13 4zm40-5 12 5-6 18-12-5z" fill="#58a6b4"/><path d="m12 31 10-3m-9 9 10-3m26-7 9 4m-11 3 9 4" stroke="#b9eff0" stroke-width="2"/>',
    core:'<path d="M7 43 20 20h25l13 23-9 13H15z" fill="#e6d5af"/><path d="M20 20 32 8l13 12" fill="#f3ac7c"/><path d="M24 53V36h16v17" fill="#6fa6a7"/><path d="M20 21h25" stroke="#fff2d8" stroke-width="4"/>',
    outpost:'<path d="M10 49 20 28h26l9 21z" fill="#c2a87b"/><path d="M31 28V7m0 1 18 8-18 7" fill="#eea96d" stroke="#5b4b4a" stroke-width="2"/>',
    iceMine:'<path d="M12 52 24 30l10-13 17 35z" fill="#9ccfd1"/><path d="M10 53h45m-40-9 30-22" fill="none" stroke="#dce9d9" stroke-width="5"/>',
    waterPlant:'<rect x="8" y="25" width="48" height="28" rx="6" fill="#b9d8d8"/><path d="M13 37h38M25 25V13h14v12" stroke="#4a858f" stroke-width="4" fill="none"/><path d="M36 38c-6 7-6 11 0 11s6-4 0-11" fill="#43bddd"/>',
    oxygenPlant:'<rect x="9" y="28" width="46" height="26" rx="5" fill="#d2c9ae"/><path d="M19 28V13h25v15M31 31v20" stroke="#6596a4" stroke-width="4" fill="none"/><circle cx="31" cy="41" r="6" fill="#6fcad1"/>',
    greenhouse:'<path d="M7 50V34c0-14 11-25 25-25s25 11 25 25v16z" fill="#9dd8ae"/><path d="M7 50h50M32 10v40" stroke="#eef5cd" stroke-width="3"/><path d="M25 44c-8-7-5-15-1-17 5 1 8 6 8 11 2-8 8-12 12-11 0 8-3 14-12 17" fill="#45ad65"/>',
    depot:'<path d="M10 50V23l22-13 22 13v27z" fill="#d5bf9b"/><path d="M10 23h44m-30 27V33h16v17" fill="none" stroke="#6b8190" stroke-width="4"/>',
    smelter:'<path d="M10 53 16 28h33l5 25z" fill="#807e85"/><path d="M23 29V9h14v20" fill="#b0a9a7"/><path d="M23 43h18l-4 8H27z" fill="#f1a35a"/>',
    workshop:'<rect x="9" y="20" width="46" height="35" rx="4" fill="#d7bd91"/><path d="M19 27h25v17H19z" fill="#edf1de"/><path d="M21 44h24M32 27v17" stroke="#6b8f9a" stroke-width="3"/>',
    moxie:'<rect x="12" y="19" width="40" height="36" rx="6" fill="#a6bdc1"/><circle cx="32" cy="37" r="10" fill="#dcece4"/><path d="M32 27v20M22 37h20" stroke="#5c9ca5" stroke-width="3"/>',
    recycler:'<path d="M13 17h38v38H13z" fill="#97baaa"/><path d="m25 25 17 9-6 13-17-9z" fill="#d6e5ba"/>',
    kiln:'<path d="M9 53 18 22h28l9 31z" fill="#c49a7a"/><path d="M25 52V35h14v17" fill="#e8cda6"/>',
    regolithPit:'<path d="M8 51 24 24l8 10 10-18 14 35z" fill="#c09376"/><path d="M19 45h29" stroke="#eed7b2" stroke-width="4"/>',
    shelter:'<path d="M7 48 19 26h26l12 22-8 8H15z" fill="#b1a69c"/><path d="M23 50V36h18v14" fill="#d9d7c9"/>',
    mineral:'<path d="M8 46 22 18l13 13 12-15 9 30z" fill="#ba866c"/><circle cx="34" cy="37" r="5" fill="#efdbaa"/>',
    electrolysis:'<rect x="8" y="23" width="48" height="31" rx="5" fill="#c7d8d2"/><path d="M23 23V12m18 11V12M22 31v16m20-16v16" stroke="#5e9da6" stroke-width="4"/><circle cx="22" cy="34" r="3" fill="#fff"/><circle cx="42" cy="39" r="3" fill="#fff"/>',
    farming:'<path d="M11 53h42" stroke="#a06c4b" stroke-width="6"/><path d="M31 50V18m0 20C18 36 15 25 17 20c10-1 14 5 14 13m0 2c13-2 18-10 16-16-9-1-16 5-16 13" fill="#72c676"/>',
    storage:'<rect x="14" y="18" width="36" height="37" rx="5" fill="#e9c46c"/><path d="m36 25-10 14h8l-6 9 13-16h-8z" fill="#fff4c5"/>',
    beam:'<path d="M14 51h36l-8-20H22z" fill="#8b9eaa"/><path d="m12 26 25 5 17-15" stroke="#70d8e6" stroke-width="5" fill="none"/>',
    printing:'<rect x="10" y="14" width="44" height="40" rx="4" fill="#d0c09b"/><path d="M18 22h28v24H18z" fill="#edeee1"/><path d="M24 42h16l-3-11H27z" fill="#dcae66"/>',
    recycling:'<path d="M32 10 48 18l6 16-9-1-6-12-15-6zM16 30 9 44l11 12 4-8 13-3-3-8z" fill="#79c8a2"/>',
    ceramics:'<path d="M10 22h44v32H10z" fill="#d2aa7f"/><path d="M10 38h44m-29-16v16m14 0v16" stroke="#f0d6a9" stroke-width="3"/>',
    metalwork:'<path d="M10 43h44v11H10z" fill="#78919c"/><path d="m19 35 23-21 8 8-23 21" fill="#d8d9c6"/>',
    automation:'<rect x="12" y="13" width="40" height="41" rx="7" fill="#a8c0bd"/><circle cx="24" cy="29" r="4" fill="#528c9d"/><circle cx="40" cy="29" r="4" fill="#528c9d"/><path d="M24 42h16" stroke="#528c9d" stroke-width="4"/>',
    glass:'<path d="M31 6 54 27 43 56H20L9 27z" fill="#9ed3cf"/><path d="m31 6 1 35 11 15m-11-15L9 27m23 14 22-14" fill="none" stroke="#eafffa" stroke-width="3"/>',
    sabatier:'<rect x="9" y="24" width="46" height="30" rx="11" fill="#a5abb7"/><path d="M18 24v-8h29v8M24 38h16" fill="none" stroke="#dce5dd" stroke-width="4"/>',
    phb:'<path d="M11 51 22 20h22l9 31z" fill="#94bc8e"/><path d="M24 43c1-15 9-19 17-18-1 10-6 17-17 18" fill="#d8eed4"/>',
    closedLoop:'<path d="M16 26a19 19 0 0 1 34 0m-2 12a19 19 0 0 1-34 0" stroke="#72b9ae" stroke-width="6" fill="none"/><path d="m49 18 3 12-12-3M15 46l-3-12 12 3" fill="#72b9ae"/>',
    hopper:'<path d="M24 10h16l8 26-8 11H24l-8-11z" fill="#e7c090"/><path d="m24 47-4 10m20-10 4 10" stroke="#e8945e" stroke-width="5"/>'
  };
  // Raised silhouettes use the same isometric light direction as the terrain.
  shapes.scout='<ellipse cx="32" cy="55" rx="28" ry="6" fill="#20202b66" stroke="none"/><path d="M9 38 21 31h29l7 8-12 10H18z" fill="#425e70"/><path d="m9 38 9 12h27l12-11-12 5H20z" fill="#172f3f"/><path d="m20 31 10-9h19l8 16-14 6H17z" fill="#e0c18d"/><path d="m30 22 10 5 17 11-14 6-23-13z" fill="#f9dfae"/><path d="M21 32V22l10-6 12 4v8" fill="#75b9bf"/><path d="M25 24h14" stroke="#fff4ce" stroke-width="2"/><circle cx="15" cy="49" r="6" fill="#132330"/><circle cx="47" cy="49" r="6" fill="#132330"/><circle cx="15" cy="49" r="2" fill="#81a3ac"/><circle cx="47" cy="49" r="2" fill="#81a3ac"/><path d="M38 20V9l9-4m-9 5 11 6" fill="none" stroke="#303b4a" stroke-width="3"/><circle cx="49" cy="16" r="4" fill="#7ee6f3"/><path d="m18 29-5-10 10-4 5 9" fill="#4c879d"/>';
  shapes.worker='<ellipse cx="33" cy="55" rx="29" ry="6" fill="#20202b66" stroke="none"/><path d="M7 42h50v9H7z" fill="#283544"/><path d="m11 37 7-7 27-3 11 10-8 11H16z" fill="#bc834e"/><path d="m17 30 14-9 25 16-18 7-27-7z" fill="#f3c486"/><path d="M22 28V17l12-4 12 5v15l-15 7z" fill="#e8dfc8"/><path d="m22 17 12-5 12 6-13 7z" fill="#fff1d1"/><path d="M33 25v14" stroke="#796a60" stroke-width="2"/><path d="M40 23 48 9l8 4-5 15-8 6" fill="none" stroke="#566271" stroke-width="6"/><path d="m50 9 9-5m-4 11 7-2" fill="none" stroke="#343e4a" stroke-width="3"/><path d="M10 47h45M13 51h39" stroke="#b6a379" stroke-width="2"/>';
  shapes.sentry='<ellipse cx="33" cy="55" rx="29" ry="6" fill="#20202b66" stroke="none"/><path d="m8 43 23-10 23 10-5 9H15z" fill="#35465b"/><path d="m13 39 18-9 26 11-21 8z" fill="#7891a1"/><path d="m24 36 3-15 10-6 10 7-2 17-11 6z" fill="#d5c9ad"/><path d="m27 21 10-6 10 7-12 7z" fill="#eee4cf"/><path d="M35 28v17" stroke="#4f6572" stroke-width="2"/><path d="M9 20 36 27 56 11" fill="none" stroke="#7de5f1" stroke-width="6"/><path d="m6 27 11-5 5 18-13 5zm43-5 10 6-4 18-13-5z" fill="#62aab4"/><path d="m11 31 8-3m-7 9 9-3m28-4 7 4m-9 2 8 4" stroke="#d9ffef" stroke-width="2"/>';
  shapes.core='<ellipse cx="32" cy="56" rx="28" ry="6" fill="#20202b66" stroke="none"/><path d="m4 43 27-13 28 14-27 14z" fill="#5c6670"/><path d="m7 32 25-13 25 14v19L32 41 7 52z" fill="#e9d8b9"/><path d="m7 32 25-13 25 14-25 11z" fill="#fff0ce"/><path d="M32 44v14L7 52V32" fill="#b7a17e"/><path d="M20 30V16L32 7l12 9v15L32 37z" fill="#e69e76"/><path d="M20 16 32 7l12 9-12 8z" fill="#ffe2b0"/><path d="M32 24v14M15 39v10m32-10v11" stroke="#7f6b67" stroke-width="3"/><path d="M29 46h7v10h-7z" fill="#73bec5"/>';
  shapes.core2=shapes.core+'<path d="M5 38c0-14 11-21 20-18 10 3 14 13 14 24H5z" fill="#8bcbd1b8"/><path d="M6 44h33M20 20v24" stroke="#e9ffff" stroke-width="2"/><path d="m45 40 13-5v15l-13 5z" fill="#d7af81"/><path d="m45 40 8-9 5 4-13 5z" fill="#f6d29e"/>';
  shapes.core3=shapes.core2+'<path d="M49 35V13h7v19m-8-18 4-5 5 3v4" fill="#8da4a6"/><path d="M45 20h14" stroke="#ecddba" stroke-width="2"/><path d="M4 43 15 39l8 6-11 4z" fill="#61b7ac"/><path d="m12 39 1-8 8 5 2 9" fill="#97d9b9"/>';
  function icon(name, className=''){const body=shapes[name]||shapes.parts;return `<svg class="game-icon ${className}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g ${line}>${body}</g></svg>`;}
  window.HematiteIcons={icon,shapes};
})();
