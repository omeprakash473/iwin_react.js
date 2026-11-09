import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {validateResults,findResult,reportLink,scoreRows} from '../src/reports/api.js';
const item={assessment:'career',completed_at:'2026-11-01T12:00:00Z',scores:{interest:{design:9},caution:false},caution:false,caution_note:null};
test('result validation rejects malformed results instead of fabricating a report',()=>{
 assert.deepEqual(validateResults({items:[]}),[]);
 for(const data of [{}, {items:null}, {items:[{...item,scores:null}]}, {items:[{...item,caution:'false'}]}, {items:[{...item,completed_at:'invalid'}]}, {items:[{...item,caution_note:{message:'x'}}]}])assert.throws(()=>validateResults(data),/unreadable/);
});
test('results sort by completion without changing server values',()=>{
 const later={...item,completed_at:'2026-11-02T12:00:00Z'};const source={items:[item,later]};
 assert.deepEqual(validateResults(source),[later,item]);assert.equal(source.items[0],item);
});
test('result links identify the exact assessment and completion, including special characters',()=>{
 const result={...item,assessment:'career & design / 1'};const link=reportLink(result);
 assert.deepEqual(findResult([result],link.slice(link.indexOf('?'))),result);
 assert.equal(findResult([result],'?assessment=career'),null);
 assert.equal(findResult([result],'?preview=1'),null);
});
test('untyped scores retain numeric values, false, nested labels and null without invented scales',()=>{
 assert.deepEqual(scoreRows({domain:{design:9},valid:false,notes:null}),[['Domain / Design','9'],['Valid','false'],['Notes','Not provided']]);
 assert.deepEqual(scoreRows({}),[]);
});
let serial=0;
async function setup(handler){
 const store=new Map();globalThis.sessionStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value),removeItem:key=>store.delete(key)};globalThis.fetch=handler;
 const outfile=path.resolve('node_modules/.cache/report-tests/'+serial+++'.mjs');await mkdir(path.dirname(outfile),{recursive:true});
 await build({stdin:{contents:"export * from './src/auth/client.js';export * from './src/reports/api.js';",resolveDir:process.cwd()},outfile,bundle:true,platform:'node',format:'esm',logLevel:'silent'});
 return import(pathToFileURL(outfile).href);
}
const response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json'}});
const token={access_token:'mock-access',refresh_token:'mock-refresh',expires_in:3600};
test('report and assessment reads use authenticated GET, never submit answers or mutate data',async()=>{
 const calls=[];const api=await setup(async(url,options)=>{if(url.endsWith('/token'))return response(token);calls.push(url);assert.equal(options.method,'GET');assert.equal(options.body,undefined);assert.equal(options.headers.Authorization,'Bearer mock-access');return response({items:url.endsWith('/results/me')?[item]:[{id:'test-id',name:'career',state:'completed'}]});});
 await api.signIn('student','example-password');assert.deepEqual(await api.getMyResults(),[item]);assert.equal((await api.getAssessmentStates())[0].state,'completed');assert.equal(calls.length,2);
});
test('a server failure stays an error and is never replaced with sample results',async()=>{
 const api=await setup(async url=>url.endsWith('/token')?response(token):response({error:{message:'Results unavailable'}},503));
 await api.signIn('student','example-password');await assert.rejects(api.getMyResults(),/Results unavailable/);
});
test('an old account result cannot arrive after a session change',async()=>{
 let finish;const api=await setup(async url=>url.endsWith('/token')?response(token):new Promise(resolve=>{finish=()=>resolve(response({items:[item]}));}));
 await api.signIn('first','example-password');const pending=api.getMyResults();api.clearSession();finish();await assert.rejects(pending,/session changed/);
});
