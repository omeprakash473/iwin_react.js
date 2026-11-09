import React,{createContext,useCallback,useContext,useEffect,useRef,useState} from 'react';
import {useAuth} from '../auth/AuthContext.jsx';
import {getSession,getSessionVersion} from '../auth/client.js';
import {getPaymentStatus,hasPaymentAccess} from './api.js';
const PaymentContext=createContext(null);
export function PaymentProvider({children}) {
 const {session,ready:authReady}=useAuth();
 const owner=session ? getSessionVersion() : null;
 const activeOwner=useRef(owner);activeOwner.current=owner;
 const requestId=useRef(0);
 const [state,setState]=useState({owner:null,status:'idle',payment:null,error:''});
 const refresh=useCallback(async()=>{
  if(owner===null || !getSession())throw new Error('Please sign in to continue.');
  const id=++requestId.current;
  try {
   const payment=await getPaymentStatus();
   if(activeOwner.current===owner && id===requestId.current)setState({owner,status:'ready',payment,error:''});
   return payment;
  } catch(error) {
   if(activeOwner.current===owner && id===requestId.current)setState({owner,status:'error',payment:null,error:error.message});
   throw error;
  }
 },[owner]);
 useEffect(()=>{
  if(owner===null){requestId.current++;setState({owner:null,status:'idle',payment:null,error:''});return;}
  if(!authReady)return;
  setState({owner,status:'loading',payment:null,error:''});
  refresh().catch(()=>{});
  return ()=>{requestId.current++;};
 },[owner,authReady,refresh]);
 const current=state.owner===owner ? state : {status:'loading',payment:null,error:''};
 return <PaymentContext.Provider value={{...current,unlocked:current.status==='ready'&&hasPaymentAccess(current.payment),refresh}}>{children}</PaymentContext.Provider>;
}
export const usePayment=()=>useContext(PaymentContext);
