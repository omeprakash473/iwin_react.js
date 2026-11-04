import test from 'node:test';
import assert from 'node:assert/strict';
import {routeRequiresPayment,careerStartAction} from '../src/payments/accessFlow.js';

test('dashboard and account pages remain available before payment',()=>{
 for(const route of ['/dashboard','/dashboard-progress','/profile','/change-password']) assert.equal(routeRequiresPayment(route),false,route);
 assert.equal(routeRequiresPayment('/success'),true);
});

test('Career Interest Start skips checkout only for backend-confirmed access',()=>{
 assert.equal(careerStartAction({account_unlocked:true}),'start');
 for(const result of [null,{}, {account_unlocked:false}, {status:'paid'}, {account_unlocked:'true'}, {account_unlocked:1}]) assert.equal(careerStartAction(result),'checkout');
});
