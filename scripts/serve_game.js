// Small local static server for the game and its source images. Node.js only.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/markdown; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
const port=Number(process.env.HEMATITE_PORT)||8765;
http.createServer((req,res)=>{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  let file=path.resolve(root,`.${pathname}`);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.stat(file,(err,stat)=>{
    if(err){res.writeHead(404);res.end();return;}
    if(stat.isDirectory())file=path.join(file,'index.html');
    fs.stat(file,(fileErr,info)=>{
      if(fileErr||!info.isFile()){res.writeHead(404);res.end();return;}
      res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
      if(req.method==='HEAD'){res.end();return;}
      fs.createReadStream(file).pipe(res);
    });
  });
}).listen(port,'127.0.0.1',()=>console.log(`Dr. Hematite: http://127.0.0.1:${port}/game/`));
