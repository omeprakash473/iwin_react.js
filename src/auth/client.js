export const API_BASE = (import.meta.env?.VITE_API_BASE_URL || (import.meta.env?.DEV ? '/backend' : 'https://api-dev.i-winlearning.com')).replace(/\/$/, '');
const SESSION_KEY = 'iwin.auth.session';
let session = null;
try { session = JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch {}
if (typeof session?.access_token !== 'string' || !session.access_token || typeof session?.refresh_token !== 'string' || !session.refresh_token || !Number.isFinite(session?.expires_at) || typeof session?.identity !== 'string') session = null;
const listeners = new Set();
let refreshPromise;
let refreshGeneration;
let generation = 0;
export function getSessionVersion() { return generation; }
export function getSession() { return session; }
export function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }
function publish(next) {
 session = next;
 try { next ? sessionStorage.setItem(SESSION_KEY, JSON.stringify(next)) : sessionStorage.removeItem(SESSION_KEY); } catch {}
 listeners.forEach(listener => listener());
}
export function clearSession() { generation++; publish(null); }
function acceptTokens(data, identity, expectedGeneration) {
 if (expectedGeneration !== generation) throw new Error('Your session changed. Please sign in again.');
 if (!data?.access_token || !data?.refresh_token || !Number.isFinite(data?.expires_in) || data.expires_in <= 0) throw new Error('The server returned an invalid sign-in response.');
 const next = {access_token:data.access_token, refresh_token:data.refresh_token, expires_at:Date.now()+data.expires_in*1000, identity};
 publish(next); return next;
}
async function request(path, options = {}) {
 let response;
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), 20000);
 try { response = await fetch(API_BASE+path, {...options, cache:'no-store', signal:controller.signal, headers:{Accept:'application/json', ...options.headers}}); }
 catch (error) { throw new Error(error.name === 'AbortError' ? 'The request timed out. Please try again.' : 'Unable to reach the server. Check your connection and try again.'); }
 finally { clearTimeout(timeout); }
 const data = await response.json().catch(() => null);
 if (!response.ok) {
  const message = data?.error?.message || 'The request could not be completed. Please try again.';
  const details = (data?.error?.details || []).map(detail => detail.message).filter(value => typeof value === 'string');
  const error = new Error(details.length ? message + ' ' + [...new Set(details)].join(' ') : message);
  error.status = response.status;
  error.code = data?.error?.code;
  error.details = data?.error?.details || [];
  const retry = Number(response.headers.get('Retry-After'));
  if (response.status === 429 && retry > 0) error.message += ' Try again in '+retry+' seconds.';
  throw error;
 }
 return data;
}
export async function signIn(identity, password) {
 const current = ++generation;
 const body = new URLSearchParams({grant_type:'password', username:identity.trim(), password});
 const data = await request('/api/v1/auth/token', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body.toString()});
 return acceptTokens(data, identity.trim(), current);
}
export async function refreshSession() {
 if (refreshPromise && refreshGeneration === generation) return refreshPromise;
 if (!session) throw new Error('Please sign in to continue.');
 const current = generation;
 const previous = session;
 refreshGeneration = current;
 const pending = (async () => {
  try {
   const data = await request('/api/v1/auth/refresh', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({refresh_token:previous.refresh_token})});
   return acceptTokens(data, previous.identity, current);
  } catch(error) { if ([401,422].includes(error.status) && generation === current) clearSession(); throw error; }
  finally { if(refreshGeneration === current)refreshPromise = null; }
 })();
 refreshPromise = pending;
 return pending;
}
export async function authorizedRequest(path, body, retry = true, method = 'POST') {
 if (!session) throw new Error('Please sign in to continue.');
 const current = generation;
 if (session.expires_at <= Date.now()+30000) await refreshSession();
 if(current !== generation || !session)throw new Error('Your session changed. Please sign in again.');
 try { const result = await request(path, {method, headers:{Authorization:'Bearer '+session.access_token, ...(body === undefined ? {} : {'Content-Type':'application/json'})}, ...(body === undefined ? {} : {body:JSON.stringify(body)})});
 if(current !== generation)throw new Error('Your session changed. Please sign in again.');
 return result; }
 catch(error) {
  if(current !== generation)throw new Error('Your session changed. Please sign in again.');
  if(error.status === 401 && retry) { await refreshSession(); if(current !== generation || !session)throw new Error('Your session changed. Please sign in again.'); return authorizedRequest(path, body, false, method); }
  if(error.status === 401) clearSession();
  throw error;
 }
}
export async function signOut() {
 const current = generation;
 try { if(session) await authorizedRequest('/api/v1/auth/logout'); }
 finally { if(current === generation){clearSession(); try { sessionStorage.removeItem('iwin-dashboard-preview'); } catch {}} }
}
export async function changePassword(current_password, new_password) {
 const current = generation; const identity = session?.identity;
 const data = await authorizedRequest('/api/v1/auth/password', {current_password, new_password});
 return acceptTokens(data, identity, current);
}
export async function registerStudent({username, email, password, class_standard}) {
 return request('/api/v1/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:username.trim(), email:email.trim(), password, class_standard:Number(class_standard)})});
}
