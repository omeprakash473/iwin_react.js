import test from 'node:test';
import assert from 'node:assert/strict';
import {previewAllowed,previewCompleted,previewCardState} from '../src/payments/previewState.js';
import {careerStartAction} from '../src/payments/accessFlow.js';

test('design preview requires a development build on a loopback host',()=>{
 for(const host of ['localhost','127.0.0.1','[::1]','::1']) {
  assert.equal(previewAllowed(true,host),true);
  assert.equal(previewAllowed(false,host),false);
 }
 for(const host of ['omeprakash473.github.io','pathway.i-winlearning.com','192.168.1.11','localhost.example.com','pathway-dev.i-winlearning.com.example.com',''])assert.equal(previewAllowed(true,host),false);
});

test('staging preview works in a deployment build only on the exact staging hostname and can be disabled',()=>{
 assert.equal(previewAllowed(false,'pathway-dev.i-winlearning.com'),true);
 assert.equal(previewAllowed(true,'pathway-dev.i-winlearning.com'),true);
 for(const development of [true,false])assert.equal(previewAllowed(development,'pathway-dev.i-winlearning.com',false),false);
 for(const host of ['omeprakash473.github.io','pathway.i-winlearning.com','www.i-winlearning.com','api-dev.i-winlearning.com','pathway-dev.i-winlearning.com.example.org'])assert.equal(previewAllowed(false,host),false);
 assert.equal(previewAllowed(true,'localhost',false),false);
});
test('payment preview does not imply assessment completion',()=>{
 assert.equal(previewCompleted('paid'),0);
 assert.equal(previewCardState('paid','Career Interest'),'available');
 for(const title of ['Personal Data','Aptitude','Subject','Communication','Attitude'])assert.equal(previewCardState('paid',title),'locked');
});
test('career completion preview unlocks remaining cards and all-complete enables report preview',()=>{
 assert.equal(previewCompleted('career'),1);
 assert.equal(previewCardState('career','Career Interest'),'completed');
 for(const title of ['Personal Data','Aptitude','Subject','Communication','Attitude']) {
  assert.equal(previewCardState('career',title),'available');
  assert.equal(previewCardState('complete',title),'completed');
 }
 assert.equal(previewCompleted('complete'),6);
 assert.equal(previewCompleted(null),0);
 assert.equal(careerStartAction({account_unlocked:false,previewStage:'complete'}),'checkout');
});
