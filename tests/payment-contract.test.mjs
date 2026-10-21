import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let serial=0;
const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
const token={access_token:'mock-access',refresh_token:'mock-refresh',expires_in:3600};
const unpaid={status:'unpaid',account_unlocked:false,amount:null,currency:null,paid_at:null};
async function setup(handler){
 const store=new Map();globalThis.sessionStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value),removeItem:key=>store.delete(key)};
 globalThis.fetch=handler;
 const outfile=path.join(root,'node_modules/.cache/payment-tests',String(serial++)+'.mjs');await mkdir(path.dirname(outfile),{recursive:true});
 await build({stdin:{contents:"export * from './src/auth/client.js'; export * from './src/payments/api.js';",resolveDir:root},outfile,bundle:true,platform:'node',format:'esm',logLevel:'silent'});
 return import(pathToFileURL(outfile).href);
}
test('payment status uses authenticated GET with no request body',async()=>{
 const api=await setup(async(url,options)=>{
  if(url.endsWith('/token'))return response(token);
  assert.ok(url.endsWith('/api/v1/payments/me'));assert.equal(options.method,'GET');assert.equal(options.body,undefined);assert.equal(options.headers.Authorization,'Bearer mock-access');return response(unpaid);
 });
 await api.signIn('student','test-password');assert.equal(api.hasPaymentAccess(await api.getPaymentStatus()),false);
});
test('GET method survives token refresh on an unauthorized payment response',async()=>{
 let reads=0;
 const api=await setup(async(url,options)=>{
  if(url.endsWith('/token')||url.endsWith('/refresh'))return response(token);
  assert.equal(options.method,'GET');return reads++===0?response({error:{message:'Expired'}},401):response(unpaid);
 });
 await api.signIn('student','test-password');await api.getPaymentStatus();assert.equal(reads,2);
});
test('only a backend boolean unlock grants access; paid but not unlocked waits',async()=>{
 const api=await setup(async()=>response(token));
 assert.equal(api.hasPaymentAccess({...unpaid,account_unlocked:true}),true);
 for(const fake of [null,{status:'paid'},{account_unlocked:'true'},{account_unlocked:1}])assert.equal(api.hasPaymentAccess(fake),false);
 assert.equal(api.paymentNeedsConfirmation({...unpaid,status:'paid'}),true);
 assert.equal(api.paymentNeedsConfirmation({...unpaid,paid_at:'2026-10-21T00:00:00Z'}),true);
 assert.equal(api.paymentNeedsConfirmation({...unpaid,account_unlocked:true}),false);
});
test('malformed status fails closed rather than unlocking assessments',async()=>{
 const api=await setup(async(url)=>response(url.endsWith('/token')?token:{status:'paid',account_unlocked:'true'}));
 await api.signIn('student','test-password');await assert.rejects(api.getPaymentStatus(),/invalid payment status/);
});
test('order sends only phone; amount, currency and owner are server-controlled',async()=>{
 const api=await setup(async(url,options)=>{
  if(url.endsWith('/token'))return response(token);
  assert.ok(url.endsWith('/api/v1/payments/orders'));assert.equal(options.method,'POST');assert.deepEqual(JSON.parse(options.body),{phone:'9876543210'});
  return response({order_id:'mock-order',payment_session_id:'mock-session',amount:'500.00',currency:'INR',status:'pending',expires_at:'2099-01-01T00:00:00Z'},201);
 });
 await api.signIn('student','test-password');assert.equal((await api.createPaymentOrder('9876543210')).amount,'500.00');
});
test('invalid mobile number never creates an order',async()=>{
 let calls=0;const api=await setup(async()=>{calls++;return response(token);});
 for(const phone of ['123','1234567890','+919876543210','98765abc10'])await assert.rejects(api.createPaymentOrder(phone),/10-digit/);
 assert.equal(calls,0);
});
test('incorrect order amount or currency is rejected before opening checkout',async()=>{
 let order={order_id:'mock',payment_session_id:'mock-session',amount:'501.00',currency:'INR'};
 const api=await setup(async(url)=>response(url.endsWith('/token')?token:order));await api.signIn('student','test-password');
 await assert.rejects(api.createPaymentOrder('9876543210'),/could not be verified/);
 order={...order,amount:'500',currency:'USD'};await assert.rejects(api.createPaymentOrder('9876543210'),/could not be verified/);
});
test('already-paid and in-progress order codes are preserved for safe recovery',async()=>{
 let code='already_paid';const api=await setup(async(url)=>url.endsWith('/token')?response(token):response({error:{code,message:'Order unavailable'}},409));await api.signIn('student','test-password');
 await assert.rejects(api.createPaymentOrder('9876543210'),error=>error.code==='already_paid');code='order_in_progress';
 await assert.rejects(api.createPaymentOrder('9876543210'),error=>error.code==='order_in_progress');
});
test('signed-out users cannot read payment status or create an order',async()=>{
 let calls=0;const api=await setup(async()=>{calls++;return response(unpaid);});
 await assert.rejects(api.getPaymentStatus(),/sign in/);await assert.rejects(api.createPaymentOrder('9876543210'),/sign in/);assert.equal(calls,0);
});
