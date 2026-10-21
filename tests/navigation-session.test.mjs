import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import React from 'react';
import {renderToString} from 'react-dom/server';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let count=0;
async function renderPage(url, signedIn, base='/') {
 const data=new Map();
 if(signedIn)data.set('iwin.auth.session',JSON.stringify({access_token:'mock-access',refresh_token:'mock-refresh',identity:'test_student',expires_at:Date.now()+3600000}));
 globalThis.sessionStorage={getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
 globalThis.window={location:new URL(url)};
 const destination=path.join(root,'node_modules/.cache/navigation-tests',String(count++)+'.mjs');
 await mkdir(path.dirname(destination),{recursive:true});
 await build({entryPoints:[path.join(root,'src/App.jsx')],outfile:destination,bundle:true,format:'esm',platform:'node',packages:'external',loader:{'.css':'empty'},define:{'import.meta.env':JSON.stringify({BASE_URL:base,DEV:false})},logLevel:'silent'});
 const {default:App}=await import(pathToFileURL(destination).href);
 return renderToString(React.createElement(App));
}
test('signed-in homepage, pathway, dashboard and profile keep the profile navigation',async()=>{
 for(const route of ['/','/#pathway','/dashboard','/profile','/change-password']) {
  const html=await renderPage('http://localhost'+route,true);
  const header=html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(header,route);assert.match(header,/test_student profile/);assert.match(header,/href="\/dashboard"/);
  assert.doesNotMatch(header,/Login ↗|Join ↗/);
 }
});
test('signed-out homepage shows Login and Join, and protected routes render no private content',async()=>{
 const html=await renderPage('http://localhost/',false);
 assert.match(html,/Login ↗/);assert.match(html,/Join ↗/);assert.doesNotMatch(html,/test_student profile/);
 for(const route of ['/dashboard','/dashboard-progress','/profile','/change-password','/checkout','/success'])assert.equal(await renderPage('http://localhost'+route,false),'');
});
test('signed-in Pages homepage keeps profile with correct repository-prefixed navigation',async()=>{
 const html=await renderPage('https://example.github.io/iwin_react.js/#pathway',true,'/iwin_react.js/');
 const header=html.match(/<header\b[\s\S]*?<\/header>/)[0];
 assert.match(header,/test_student profile/);assert.match(header,/href="\/iwin_react.js\/dashboard"/);assert.match(header,/href="\/iwin_react.js\/#pathway"/);assert.doesNotMatch(header,/Login ↗/);
});
