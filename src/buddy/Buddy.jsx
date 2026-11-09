import React,{createContext,useCallback,useContext,useEffect,useRef,useState} from 'react';
import {BUDDY_PREFERENCE,readBuddyPreference,saveBuddyPreference,buddyReactions,buddyContext,buddyPosePosition,buddyCanExplore,buddyIdlePose} from './model.js';
import './Buddy.css';
const inactive={enabled:false,setEnabled:()=>{},cue:()=>{},reaction:null,privateFocus:false};
const BuddyContext=createContext(inactive);
function browserStorage(){try{return typeof window==='undefined'?null:window.localStorage;}catch{return null;}}
export function BuddyProvider({children}) {
 const [enabled,setEnabledState]=useState(()=>readBuddyPreference(browserStorage()));
 const [reaction,setReaction]=useState(null);const [privateFocus,setPrivateFocus]=useState(false);const last=useRef({kind:'',at:0});const serial=useRef(0);
 const setEnabled=useCallback(value=>{setEnabledState(Boolean(value));setReaction(null);saveBuddyPreference(browserStorage(),Boolean(value));},[]);
 const cue=useCallback(kind=>{
  if(!enabled || !Object.hasOwn(buddyReactions,kind))return;
  const now=Date.now();if(kind==='selected' && last.current.kind===kind && now-last.current.at<1400)return;
  last.current={kind,at:now};setReaction({...buddyReactions[kind],kind,serial:++serial.current,path:window.location.pathname});
 },[enabled]);
 useEffect(()=>{if(!reaction)return;const timer=setTimeout(()=>setReaction(null),4200);return()=>clearTimeout(timer);},[reaction]);
 useEffect(()=>{
  const changed=event=>{if(event.key===BUDDY_PREFERENCE){setEnabledState(event.newValue!=='off');setReaction(null);}};
  const check=()=>{const target=document.activeElement;const isInput=target?.tagName==='INPUT';setPrivateFocus(Boolean(isInput && (target.type==='password' || /password/i.test(target.name+' '+target.autocomplete))));};
  const afterFocus=()=>queueMicrotask(check);
  window.addEventListener('storage',changed);document.addEventListener('focusin',check);document.addEventListener('focusout',afterFocus);
  return()=>{window.removeEventListener('storage',changed);document.removeEventListener('focusin',check);document.removeEventListener('focusout',afterFocus);};
 },[]);
 return <BuddyContext.Provider value={{enabled,setEnabled,cue,reaction,privateFocus}}>{children}</BuddyContext.Provider>;
}
export function useBuddy(){return useContext(BuddyContext);}
export function BuddyToggle(){const {enabled,setEnabled}=useBuddy();return <button type="button" className={'buddy-toggle'+(enabled?' is-on':'')} role="switch" aria-checked={enabled} aria-label="I-WIN Buddy" title={'Turn I-WIN Buddy '+(enabled?'off':'on')} onClick={()=>setEnabled(!enabled)}><span className="buddy-toggle-icon" aria-hidden="true">🐰</span><span className="buddy-toggle-label">Buddy <b>{enabled?'on':'off'}</b></span><span className="buddy-toggle-dot" aria-hidden="true"/></button>;}
function useReducedMotion(){const [reduced,setReduced]=useState(()=>typeof window!=='undefined'&&Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));useEffect(()=>{const query=window.matchMedia?.('(prefers-reduced-motion: reduce)');if(!query)return;const update=()=>setReduced(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);return reduced;}
function usePose(route,signedIn){
 const {enabled,reaction,privateFocus}=useBuddy();const reduced=useReducedMotion();const [settled,setSettled]=useState(false);const [blink,setBlink]=useState(false);const [idle,setIdle]=useState(0);
 const base=buddyContext(route,signedIn,new Date().getHours());
 const current=reaction?.path===window.location.pathname?reaction:null;
 useEffect(()=>{setSettled(false);setIdle(0);const timer=setTimeout(()=>setSettled(true),4800);return()=>clearTimeout(timer);},[route,signedIn,enabled]);
 const exploring=buddyCanExplore(route);
 useEffect(()=>{
  if(!enabled||reduced||privateFocus||!exploring)return;
  let timer;const resume=()=>{clearInterval(timer);if(document.visibilityState==='visible')timer=setInterval(()=>{if(document.activeElement?.matches('input,textarea,select')||document.querySelector('dialog[open]'))return;setIdle(index=>index+1);},12000);};
  resume();document.addEventListener('visibilitychange',resume);return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',resume);};
 },[route,enabled,reduced,privateFocus,exploring]);
 const pose=privateFocus?'rest':current?.pose||(!settled?base.pose:reduced?'reading':buddyIdlePose(route,idle));
 useEffect(()=>{
  if(!enabled||reduced||privateFocus||pose!=='reading')return;
  let close;const interval=setInterval(()=>{if(document.visibilityState!=='visible')return;setBlink(true);close=setTimeout(()=>setBlink(false),190);},21000);
  return()=>{clearInterval(interval);clearTimeout(close);setBlink(false);};
 },[enabled,reduced,privateFocus,pose]);
 return {pose:blink?'rest':pose,text:privateFocus?'I’ll rest while you enter your password.':current?.text||base.text,animate:!reduced&&!privateFocus&&(!settled||Boolean(current)||exploring),sequence:current?.serial||idle,showText:privateFocus||Boolean(current)||!settled};
}
export function BuddyRabbit({pose='reading',animate=false,sequence=0}){const [x,y]=buddyPosePosition[pose]||buddyPosePosition.reading;return <span key={pose+'-'+sequence} className={'buddy-rabbit buddy-pose-'+pose+(animate?' buddy-animate':'')} style={{backgroundImage:`url("${import.meta.env.BASE_URL}assets/buddy/rabbit-poses.webp")`,backgroundPosition:x+' '+y}} aria-hidden="true"/>;}
export function BuddyCompanion({route,signedIn}){
 const {enabled,setEnabled,cue,privateFocus}=useBuddy();const state=usePose(route,signedIn);const taps=useRef(0);
 const sayHello=()=>{cue(['hello','curious','playful','cheer'][taps.current++%4]);};
 if(!enabled||route.startsWith('/assessment/'))return null;
 const form=['/login','/signup','/forgot-password','/change-password','/checkout','/payment/return'].includes(route);
 return <aside className={'buddy-companion'+(form?' buddy-form-mode':'')+(state.showText?' buddy-speaking':'')} aria-label="I-WIN Buddy companion"><div className="buddy-speech"><strong>I-WIN Buddy</strong><p>{state.text}</p></div><button className="buddy-play" type="button" aria-label="Say hello to I-WIN Buddy" onClick={sayHello} onPointerEnter={event=>{if(event.pointerType==='mouse'&&!privateFocus)cue('hello');}}><BuddyRabbit {...state}/><span className="buddy-play-hint">Tap Buddy ✦</span></button><button className="buddy-hide" type="button" aria-label="Turn I-WIN Buddy off" onClick={()=>setEnabled(false)}>×</button></aside>;
}
export function BuddyInline({route='/assessment/career-interest'}){const {enabled}=useBuddy();const state=usePose(route,true);if(!enabled)return null;return <div className="buddy-inline"><BuddyRabbit {...state}/><p>{state.text}</p></div>;}
