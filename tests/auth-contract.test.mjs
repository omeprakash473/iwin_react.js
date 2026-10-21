import test from 'node:test';
import assert from 'node:assert/strict';

const clientUrl=new URL('../src/auth/client.js', import.meta.url);
let serial=0;
async function setup(handler) {
 const data=new Map();
 globalThis.sessionStorage={getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
 globalThis.fetch=handler;
 return import(clientUrl.href+'?test='+serial++);
}
const tokens=(suffix='1',expires_in=3600)=>({access_token:'test-access-'+suffix,refresh_token:'test-refresh-'+suffix,expires_in});
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
test('login uses documented form encoding without client secret or saved password', async()=>{
 const client=await setup(async(url,options)=>{
  assert.match(url,/\/api\/v1\/auth\/token$/);
  assert.equal(options.headers['Content-Type'],'application/x-www-form-urlencoded');
  const body=new URLSearchParams(options.body);
  assert.equal(body.get('username'),'student@example.com');assert.equal(body.get('password'),'test +&password');
  assert.equal(body.has('client_secret'),false);return json(tokens());
 });
 await client.signIn(' student@example.com ','test +&password');
 assert.equal(client.getSession().identity,'student@example.com');
 assert.equal(sessionStorage.getItem('iwin.auth.session').includes('test +&password'),false);
});
test('invalid credentials surface API message without establishing a session',async()=>{
 const client=await setup(async()=>json({error:{message:'Invalid username or password'}},401));
 await assert.rejects(client.signIn('student','invalid'),/Invalid username or password/);
 assert.equal(client.getSession(),null);
});
test('expired access token refreshes once and rotates tokens',async()=>{
 let refreshes=0;
 const client=await setup(async(url,options)=>{
  if(url.endsWith('/token'))return json(tokens('old',1));
  if(url.endsWith('/refresh')){refreshes++;assert.equal(JSON.parse(options.body).refresh_token,'test-refresh-old');return json(tokens('new'));}
  assert.equal(options.headers.Authorization,'Bearer test-access-new');return new Response(null,{status:204});
 });
 await client.signIn('student','test-password');
 await Promise.all([client.authorizedRequest('/test'),client.authorizedRequest('/test')]);
 assert.equal(refreshes,1);assert.equal(client.getSession().refresh_token,'test-refresh-new');
});
test('401 access response retries with new token; invalid refresh clears session',async()=>{
 let authorized=0;
 const client=await setup(async(url)=>{
  if(url.endsWith('/token'))return json(tokens());
  if(url.endsWith('/refresh'))return json(tokens('2'));
  return authorized++===0?json({error:{message:'Expired'}},401):json({ok:true});
 });
 await client.signIn('student','test-password');assert.deepEqual(await client.authorizedRequest('/test'),{ok:true});
 globalThis.fetch=async()=>json({error:{message:'Refresh expired'}},401);
 await assert.rejects(client.refreshSession(),/Refresh expired/);assert.equal(client.getSession(),null);
});
test('password update sends documented keys and accepts replacement token pair',async()=>{
 const client=await setup(async(url,options)=>{
  if(url.endsWith('/token'))return json(tokens());
  assert.ok(url.endsWith('/password'));
  assert.deepEqual(JSON.parse(options.body),{current_password:'old-test',new_password:'new-test-123'});
  return json(tokens('changed'));
 });
 await client.signIn('student','old-test');await client.changePassword('old-test','new-test-123');
 assert.equal(client.getSession().access_token,'test-access-changed');
});
test('logout calls protected endpoint and clears local session even on network failure',async()=>{
 const client=await setup(async(url,options)=>{
  if(url.endsWith('/token'))return json(tokens());
  assert.ok(url.endsWith('/logout'));assert.equal(options.headers.Authorization,'Bearer test-access-1');throw new TypeError('offline');
 });
 await client.signIn('student','test-password');await assert.rejects(client.signOut(),/Unable to reach/);
 assert.equal(client.getSession(),null);assert.equal(sessionStorage.getItem('iwin.auth.session'),null);
});
test('session survives module reload without storing credentials',async()=>{
 const client=await setup(async()=>json(tokens()));await client.signIn('student','never-save-this');
 const restored=await import(clientUrl.href+'?test='+serial++);
 assert.equal(restored.getSession().identity,'student');
 assert.equal(sessionStorage.getItem('iwin.auth.session').includes('never-save-this'),false);
});
test('registration sends only documented fields with a numeric class and does not sign in', async()=>{
 const client=await setup(async(url,options)=>{
  assert.ok(url.endsWith('/api/v1/auth/register'));
  assert.equal(options.headers['Content-Type'],'application/json');
  assert.deepEqual(JSON.parse(options.body),{username:'student_8',email:'student@example.com',password:'test-password',class_standard:8});
  return json({id:'test-user',username:'student_8',email:'student@example.com',created_at:'2026-10-19T00:00:00Z'},201);
 });
 const user=await client.registerStudent({username:' student_8 ',email:' student@example.com ',password:'test-password',class_standard:'8',phone:'1234567890',city:'Test city'});
 assert.equal(user.username,'student_8');assert.equal(client.getSession(),null);
});
test('duplicate account and invalid registration fields surface backend errors',async()=>{
 const client=await setup(async()=>json({error:{message:'Username or email already taken',details:[]}},409));
 await assert.rejects(client.registerStudent({username:'student',email:'student@example.com',password:'test-password',class_standard:8}),/already taken/);
 globalThis.fetch=async()=>json({error:{message:'Some fields are invalid.',details:[{field:'body.class_standard',message:'Class must be between 8 and 12'}]}},422);
 await assert.rejects(client.registerStudent({username:'student',email:'student@example.com',password:'test-password',class_standard:13}),/Class must be between 8 and 12/);
 assert.equal(client.getSession(),null);
});
test('late login response cannot sign a user back in after logout',async()=>{
 let resolveLogin;
 const client=await setup(()=>new Promise(resolve=>{resolveLogin=resolve;}));
 const pending=client.signIn('student','test-password');
 client.clearSession();resolveLogin(json(tokens()));
 await assert.rejects(pending,/session changed/);assert.equal(client.getSession(),null);
});
test('late refresh response cannot restore a cleared session',async()=>{
 let resolveRefresh;
 const client=await setup(async(url)=>url.endsWith('/token')?json(tokens()):new Promise(resolve=>{resolveRefresh=resolve;}));
 await client.signIn('student','test-password');const pending=client.refreshSession();
 client.clearSession();resolveRefresh(json(tokens('late')));
 await assert.rejects(pending,/session changed/);assert.equal(client.getSession(),null);
});
test('old unauthorized response cannot refresh or replay into a different account',async()=>{
 let resolveRequest;let refreshes=0;
 const client=await setup(async(url)=>{
  if(url.endsWith('/token'))return json(tokens());
  if(url.endsWith('/refresh')){refreshes++;return json(tokens('new'));}
  return new Promise(resolve=>{resolveRequest=resolve;});
 });
 await client.signIn('first','test-password');const pending=client.authorizedRequest('/test');
 await client.signIn('second','test-password');resolveRequest(json({error:{message:'Expired'}},401));
 await assert.rejects(pending,/session changed/);assert.equal(refreshes,0);assert.equal(client.getSession().identity,'second');
});
test('late password response cannot restore the session after logout',async()=>{
 let resolvePassword;
 const client=await setup(async(url)=>url.endsWith('/token')?json(tokens()):new Promise(resolve=>{resolvePassword=resolve;}));
 await client.signIn('student','test-password');const pending=client.changePassword('old-test','new-test-password');
 client.clearSession();resolvePassword(json(tokens('changed')));
 await assert.rejects(pending,/session changed/);assert.equal(client.getSession(),null);
});
test('rejected refresh body invalidates stored credentials',async()=>{
 const client=await setup(async(url)=>url.endsWith('/token')?json(tokens()):json({error:{message:'Invalid refresh token'}},422));
 await client.signIn('student','test-password');await assert.rejects(client.refreshSession(),/Invalid refresh/);
 assert.equal(client.getSession(),null);assert.equal(sessionStorage.getItem('iwin.auth.session'),null);
});
