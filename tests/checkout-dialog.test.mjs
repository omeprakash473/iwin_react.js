import test from 'node:test';
import assert from 'node:assert/strict';
import {openCheckoutDialog} from '../src/payments/checkoutDialog.js';
function environment(){
 class Element extends EventTarget {
  constructor(tag){super();this.tagName=tag;this.children=[];this.open=false;this.isConnected=false;this.attributes={};}
  setAttribute(name,value){this.attributes[name]=value;}
  append(...nodes){for(const node of nodes){node.parent=this;node.isConnected=this.isConnected;this.children.push(node);}}
  appendChild(node){this.append(node);return node;}
  showModal(){this.open=true;}
  close(){this.open=false;this.dispatchEvent(new Event('close'));}
  focus(){document.activeElement=this;}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(child=>child!==this);this.isConnected=false;this.children=[];}
 }
 const previous=new Element('button');previous.isConnected=true;
 const body=new Element('body');body.isConnected=true;
 globalThis.document={body,activeElement:previous,createElement:tag=>new Element(tag)};
 return {body,previous};
}
test('visible Close disposes the hosted frame and reports dismissal without payment success',async()=>{
 const {body,previous}=environment();let complete;let options;
 const pending=openCheckoutDialog({checkout:value=>{options=value;value.redirectTarget.appendChild(document.createElement('iframe'));return new Promise(resolve=>{complete=resolve;});}},'mock-session');
 const dialog=body.children[0],close=dialog.children[0].children[1];
 assert.equal(close.attributes['aria-label'],'Close payment window');assert.equal(options.paymentSessionId,'mock-session');assert.notEqual(options.redirectTarget,'_modal');
 close.dispatchEvent(new Event('click'));assert.deepEqual(await pending,{closed:true});assert.equal(body.children.length,0);assert.equal(document.activeElement,previous);
 complete({paymentDetails:{}});await Promise.resolve();assert.equal(body.children.length,0);
});
test('Escape dismissal and navigation abort both dispose checkout',async()=>{
 let {body}=environment();const sdk={checkout:()=>new Promise(()=>{})};
 const pending=openCheckoutDialog(sdk,'mock');body.children[0].dispatchEvent(new Event('cancel',{cancelable:true}));assert.deepEqual(await pending,{closed:true});assert.equal(body.children.length,0);
 ({body}=environment());const controller=new AbortController();const next=openCheckoutDialog(sdk,'mock',{signal:controller.signal});controller.abort();assert.deepEqual(await next,{closed:true});assert.equal(body.children.length,0);
});
test('normal provider completion closes the wrapper without treating the callback as backend confirmation',async()=>{
 const {body}=environment();const result={paymentDetails:{paymentMessage:'Check status'}};
 assert.deepEqual(await openCheckoutDialog({checkout:async()=>result},'mock'),result);assert.equal(body.children.length,0);
});
test('SDK failure disposes the wrapper and remains an error',async()=>{
 const {body}=environment();await assert.rejects(openCheckoutDialog({checkout:async()=>{throw new Error('SDK unavailable');}},'mock'),/SDK unavailable/);assert.equal(body.children.length,0);
});
