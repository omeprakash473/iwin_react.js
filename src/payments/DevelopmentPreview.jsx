import React,{createContext,useContext,useRef,useState} from 'react';
import {useAuth,navigateTo} from '../auth/AuthContext.jsx';
import {getSessionVersion} from '../auth/client.js';
import {previewAllowed} from './previewState.js';
import './DevelopmentPreview.css';

const inactive={available:false,stage:null,careerDraft:null,setCareerDraft:()=>{},setStage:()=>{},exit:()=>{}};
const PreviewContext=createContext(inactive);
export function DevelopmentPreviewProvider({children}) {
 const {session}=useAuth();
 const owner=session ? session.identity+':'+getSessionVersion() : null;
 const available=Boolean(session) && previewAllowed(import.meta.env.DEV,window.location.hostname);
 const [state,setState]=useState({owner:null,stage:null});
 const setStage=stage=>{if(available && ['paid','career','complete'].includes(stage))setState(previous=>({...previous,owner,stage,careerDraft:previous.owner===owner && stage!=='paid'?previous.careerDraft:null}));};
 const setCareerDraft=change=>{if(available)setState(previous=>{if(previous.owner!==owner || !previous.stage)return previous;return {...previous,careerDraft:typeof change==='function'?change(previous.careerDraft):change};});};
 const exit=()=>setState({owner:null,stage:null});
 return <PreviewContext.Provider value={available ? {available,stage:state.owner===owner?state.stage:null,careerDraft:state.owner===owner?state.careerDraft:null,setCareerDraft,setStage,exit} : inactive}>{children}</PreviewContext.Provider>;
}
export function useDevelopmentPreview() {return useContext(PreviewContext);}

export function CheckoutPreviewButton() {
 const preview=useDevelopmentPreview();
 const popup=useRef(null);
 if(!preview.available)return null;
 return <div className="development-checkout-preview">
  <button type="button" className="btn btn-outline full-width" onClick={()=>popup.current.showModal()}>Preview payment success · local demo</button>
  <p>No charge. No payment or assessment records will be changed.</p>
  <dialog ref={popup} className="development-success-dialog" aria-labelledby="development-success-title" aria-describedby="development-success-description">
   <button type="button" className="development-dialog-close" aria-label="Close payment preview" onClick={()=>popup.current.close()}>×</button>
   <img src={import.meta.env.BASE_URL+'assets/success/66ac3.svg'} alt=""/>
   <p className="development-preview-label">Local design preview · simulated payment</p>
   <h2 id="development-success-title">You’re in. Let’s explore!</h2>
   <p id="development-success-description">₹500 payment success preview. No money was charged and your real payment status is unchanged.</p>
   <p>Start with Career Interest. Preview the next unlocked cards after completing that step.</p>
   <button type="button" className="btn btn-primary" onClick={()=>{popup.current.close();preview.setStage('paid');navigateTo('/dashboard');}}>Explore the demo dashboard →</button>
   <button type="button" className="btn btn-outline" onClick={()=>popup.current.close()}>Back to payment</button>
  </dialog>
 </div>;
}

export function DashboardPreviewBar() {
 const preview=useDevelopmentPreview();
 if(!preview.stage)return null;
 return <section className="development-preview-bar" aria-label="Local dashboard preview controls">
  <div><strong>Local design preview</strong><p>Payment, completion and report access below are simulated. Reload or exit to restore real account state.</p></div>
  <label htmlFor="development-preview-stage">Preview stage<select id="development-preview-stage" value={preview.stage} onChange={event=>preview.setStage(event.target.value)}><option value="paid">Payment completed · 0/6</option><option value="career">Career Interest completed · 1/6</option><option value="complete">All assessments completed · 6/6</option></select></label>
  <button type="button" className="btn btn-outline" onClick={preview.exit}>Exit preview</button>
 </section>;
}
