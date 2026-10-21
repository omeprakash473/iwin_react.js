import React, { createContext, useContext, useEffect, useState } from 'react';
import {getSession, subscribe, refreshSession} from './client.js';
const AuthContext = createContext(null);
export function AuthProvider({children}) {
 const [session,setSession] = useState(getSession);
 const [ready,setReady] = useState(() => !getSession() || getSession().expires_at > Date.now()+30000);
 const [error,setError] = useState('');
 useEffect(() => subscribe(() => {setSession(getSession()); setError('');}), []);
 useEffect(() => {
  let active=true, timer;
  if(!session) {setReady(true); return;}
  function schedule(delay) {clearTimeout(timer);timer=setTimeout(renew, Math.min(2147483647,Math.max(1000,delay)));}
  async function renew() {
   if(!active || !getSession())return;
   try {await refreshSession();if(active)setError('');}
   catch(error) {if(active){setError(error.message);schedule(30000);}}
   finally {if(active)setReady(true);}
  }
  function resume() {if(getSession()?.expires_at <= Date.now()+30000)renew();}
  function visibility() {if(document.visibilityState === 'visible')resume();}
  if(session.expires_at <= Date.now()+30000)renew();
  else {setReady(true);schedule(session.expires_at-Date.now()-30000);}
  window.addEventListener('focus',resume);
  document.addEventListener('visibilitychange',visibility);
  return () => {active=false;clearTimeout(timer);window.removeEventListener('focus',resume);document.removeEventListener('visibilitychange',visibility);};
 }, [session]);
 return <AuthContext.Provider value={{session, ready, error}}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
export function navigateTo(path, replace = false) {
 window.history[replace?'replaceState':'pushState'](null,'',import.meta.env.BASE_URL+path.replace(/^\//,''));
 window.dispatchEvent(new PopStateEvent('popstate'));
}
