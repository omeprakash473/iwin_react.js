import test from 'node:test';
import assert from 'node:assert/strict';
import {BUDDY_PREFERENCE,readBuddyPreference,saveBuddyPreference,buddyContext,buddyReactions,buddyPosePosition,buddyCanExplore,buddyIdlePose} from '../src/buddy/model.js';
import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import React from 'react';
import {renderToString} from 'react-dom/server';
test('Buddy on/off survives reload and stores only the single preference',()=>{
 const values=new Map();const storage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)};
 assert.equal(readBuddyPreference(storage),true);saveBuddyPreference(storage,false);assert.equal(readBuddyPreference(storage),false);
 assert.deepEqual([...values],[[BUDDY_PREFERENCE,'off']]);saveBuddyPreference(storage,true);assert.equal(readBuddyPreference(storage),true);
});
test('blocked browser storage never prevents changing the local control',()=>{
 const storage={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 assert.equal(readBuddyPreference(storage),true);assert.doesNotThrow(()=>saveBuddyPreference(storage,false));
});
test('reading and payment use calm poses; selection does not claim a correct answer',()=>{
 for(const route of ['/assessment/career-interest','/checkout','/payment/return','/reports'])assert.equal(buddyContext(route,true).pose,'reading');
 assert.equal(buddyReactions.selected.pose,'support');assert.doesNotMatch(buddyReactions.selected.text,/correct|right answer|score/i);
 assert.match(buddyReactions['sample-complete'].text,/sample questions/);assert.equal(buddyReactions['sample-complete'].pose,'celebrate');
});
test('greeting responds to local time and every reaction points to a real pose',()=>{
 assert.match(buddyContext('/',false,8).text,/morning/);assert.match(buddyContext('/',false,14).text,/afternoon/);assert.match(buddyContext('/',false,20).text,/evening/);
 for(const reaction of Object.values(buddyReactions))assert.ok(buddyPosePosition[reaction.pose]);assert.equal(new Set(Object.values(buddyPosePosition).map(x=>x.join(','))).size,6);
});
let serial=0;
async function renderBuddy(enabled,reduced){
 const storage={getItem:()=>enabled?'on':'off',setItem:()=>{}};
 globalThis.window={location:{pathname:'/'},localStorage:storage,matchMedia:()=>({matches:reduced})};
 const outfile=path.resolve('node_modules/.cache/buddy-tests/'+serial+++'.mjs');await mkdir(path.dirname(outfile),{recursive:true});
 await build({entryPoints:[path.resolve('src/buddy/Buddy.jsx')],outfile,bundle:true,platform:'node',format:'esm',packages:'external',loader:{'.css':'empty'},define:{'import.meta.env':JSON.stringify({BASE_URL:'/iwin_react.js/'})},logLevel:'silent'});
 const {BuddyProvider,BuddyCompanion,BuddyToggle}=await import(pathToFileURL(outfile).href);
 return renderToString(React.createElement(BuddyProvider,null,React.createElement(BuddyToggle),React.createElement(BuddyCompanion,{route:'/',signedIn:false})));
}
test('disabled Buddy keeps an accessible switch but renders no mascot asset',async()=>{
 const html=await renderBuddy(false,false);assert.match(html,/role="switch" aria-checked="false" aria-label="I-WIN Buddy"/);assert.doesNotMatch(html,/rabbit-poses/);
});
test('reduced motion renders the expression without animation and supports Pages asset paths',async()=>{
 const html=await renderBuddy(true,true);assert.match(html,/rabbit-poses.webp/);assert.match(html,/iwin_react.js\/assets\/buddy/);assert.doesNotMatch(html,/buddy-animate/);
});

test('idle expression variety is limited to exploration screens, not questions or payment',()=>{for(const route of ['/','/landing','/dashboard']){assert.equal(buddyCanExplore(route),true);assert.equal(new Set([0,1,2,3].map(i=>buddyIdlePose(route,i))).size,4);assert.equal(buddyIdlePose(route,4),buddyIdlePose(route,0));}for(const route of ['/assessment/career-interest','/checkout','/reports','/login']){assert.equal(buddyCanExplore(route),false);assert.equal(buddyIdlePose(route,2),'reading');}});
