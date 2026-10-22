import test from 'node:test';
import assert from 'node:assert/strict';
import {paymentReturnState,loginDestination,watchPaymentReturn} from '../src/payments/returnFlow.js';

const unpaid={status:'unpaid',account_unlocked:false,paid_at:null};
const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('return confirms access only for the backend boolean, including paid-but-not-unlocked status',()=>{
 assert.equal(paymentReturnState({...unpaid,account_unlocked:true}),'success');
 for(const payment of [unpaid,null,{status:'success'},{status:'paid',account_unlocked:'true'},{...unpaid,status:'paid'}, {...unpaid,status:'failed',paid_at:'2026-10-22T00:00:00Z'}])assert.equal(paymentReturnState(payment),'pending');
 for(const status of ['failed','cancelled','expired'])assert.equal(paymentReturnState({...unpaid,status}),'failed');
});
test('login resumes only the fixed payment return destination and ignores arbitrary redirect targets',()=>{
 assert.equal(loginDestination('?next=payment-return&status=success'),'/payment/return');
 for(const query of ['', '?next=https://example.com','?next=//example.com','?next=/success'])assert.equal(loginDestination(query),'/dashboard');
});
test('pending webhook confirmation is polled until backend unlocks the account',async()=>{
 const states=[];const queue=[];let calls=0;
 watchPaymentReturn(async()=>++calls===1?unpaid:{...unpaid,account_unlocked:true},state=>states.push(state.state),{schedule:fn=>queue.push(fn),cancel:()=>{}});
 await tick();assert.deepEqual(states,['checking']);assert.equal(calls,1);
 await queue.shift()();assert.deepEqual(states,['checking','success']);assert.equal(queue.length,0);
});
test('pending confirmation stops at the deadline without opening another checkout',async()=>{
 const states=[];const queue=[];let time=0;
 watchPaymentReturn(async()=>unpaid,state=>states.push(state.state),{now:()=>time,timeout:5,schedule:fn=>queue.push(fn),cancel:()=>{}});
 await tick();time=6;await queue.shift()();assert.deepEqual(states,['checking','waiting']);assert.equal(queue.length,0);
});
test('network failure is retryable and does not continue background polling',async()=>{
 const states=[];const queue=[];
 watchPaymentReturn(async()=>{throw new Error('Connection failed');},state=>states.push(state),{schedule:fn=>queue.push(fn),cancel:()=>{}});
 await tick();assert.deepEqual(states,[{state:'error',error:'Connection failed'}]);assert.equal(queue.length,0);
});
test('navigation or session change discards an outstanding payment response',async()=>{
 let finish;const states=[];
 const stop=watchPaymentReturn(()=>new Promise(resolve=>{finish=resolve;}),state=>states.push(state));
 stop();finish({...unpaid,account_unlocked:true});await tick();assert.deepEqual(states,[]);
});
test('backend failure status stops polling and never shows payment success',async()=>{
 const states=[];
 watchPaymentReturn(async()=>({...unpaid,status:'failed'}),state=>states.push(state.state));
 await tick();assert.deepEqual(states,['failed']);
});
