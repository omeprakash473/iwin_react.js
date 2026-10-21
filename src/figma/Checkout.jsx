import {openCheckoutDialog} from '../payments/checkoutDialog.js';
import React,{useEffect,useRef,useState} from 'react';
import Link from '../components/Link.jsx';
import Field from '../components/Field.jsx';
import {usePayment} from '../payments/PaymentContext.jsx';
import {createPaymentOrder,paymentNeedsConfirmation} from '../payments/api.js';
import {loadCashfree,CASHFREE_MODE} from '../payments/cashfree.js';
const benefits=['Career Interest assessment','Attitude assessment after Career is submitted','Your available assessment results'];
export default function Checkout() {
 const {payment,refresh}=usePayment();
 const [pending,setPending]=useState(false);const [checking,setChecking]=useState(false);
 const [error,setError]=useState('');const [message,setMessage]=useState('');const [polling,setPolling]=useState(false);
 const busy=useRef(false);const mounted=useRef(true);const popupAbort=useRef(null);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;popupAbort.current?.abort();};},[]);
 useEffect(()=>{
  const resume=()=>{refresh().catch(()=>{});};window.addEventListener('focus',resume);
  return()=>window.removeEventListener('focus',resume);
 },[refresh]);
 useEffect(()=>{
  if(!polling)return;
  let cancelled=false,timer;const stopAt=Date.now()+120000;
  async function poll(){
   if(cancelled)return;
   try{await refresh();}catch{if(!cancelled)setPolling(false);return;}
   if(cancelled)return;
   if(Date.now()>=stopAt){setPolling(false);setMessage('Payment is still awaiting confirmation. Check status again shortly; do not pay again if money was deducted.');return;}
   timer=setTimeout(poll,3000);
  }
  timer=setTimeout(poll,3000);return()=>{cancelled=true;clearTimeout(timer);};
 },[polling,refresh]);
 async function check(){
  if(checking)return;setChecking(true);setError('');
  try{const result=await refresh();if(!result.account_unlocked)setMessage('Payment is not confirmed yet. If money was deducted, please wait and check again.');}
  catch(error){setError(error.message);}finally{if(mounted.current)setChecking(false);}
 }
 async function pay(event){
  event.preventDefault();if(busy.current)return;busy.current=true;setPending(true);setError('');setMessage('');
  const phone=event.currentTarget.elements.phone.value;
  try{
   const latest=await refresh();if(latest.account_unlocked)return;
   if(paymentNeedsConfirmation(latest)){setMessage('Your payment is recorded. Waiting for your account to unlock; please do not pay again.');setPolling(true);return;}
   const sdk=await loadCashfree(); if(!mounted.current)return;
   const order=await createPaymentOrder(phone);
   if(!mounted.current)return;
   popupAbort.current=new AbortController();
   const result=await openCheckoutDialog(sdk,order.payment_session_id,{signal:popupAbort.current.signal});
   popupAbort.current=null;
   if(!mounted.current)return;
   await refresh();
   if(result?.closed){setMessage('Payment window closed. If you have already paid, select Check payment status before trying again.');return;}
   if(result?.error){setError('Payment was not completed. Check payment status before trying again.');return;}
   setMessage('Confirming your payment…');setPolling(true);
  }catch(error){
   if(!mounted.current)return;
   if(error.code==='already_paid'||error.code==='order_in_progress'){
    setMessage(error.code==='already_paid'?'Your payment is recorded. Checking account access…':'An order is already being prepared or confirmed. Please wait.');
    setPolling(true);refresh().catch(()=>{});
   }else setError(error.message);
  }finally{busy.current=false;if(mounted.current)setPending(false);}
 }
 const confirming=paymentNeedsConfirmation(payment);
 return <main id="main-content" className="checkout-page section-pad"><div className="container checkout-grid">
 <section className="payment-form"><h1>Complete your registration</h1><p>Pay the one-time ₹500 registration fee to unlock your assessments.</p><div className="secure-checkout-info"><h2>Secure payment with Cashfree</h2><p>Choose UPI, card or net banking on Cashfree’s secure checkout. Enter payment details there.</p></div>
 {CASHFREE_MODE==='sandbox'&&<p className="notice">Test payment environment. Use Cashfree test payment details.</p>}
 <form onSubmit={pay} className="payment-order-form" aria-busy={pending}>
 <Field label="Mobile number for payment" id="payment-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[6-9][0-9]{9}" minLength={10} maxLength={10} title="Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9" placeholder="9876543210" required disabled={pending||confirming||polling} onInput={event=>{event.currentTarget.value=event.currentTarget.value.replace(/[^0-9]/g,'');}} />
 <button className="btn btn-primary full-width" type="submit" disabled={pending||confirming||polling}>{pending?'Opening secure checkout…':confirming?'Awaiting account confirmation':polling?'Waiting for payment confirmation…':'Pay ₹500 securely →'}</button>
 </form>
 <button className="btn btn-outline full-width" type="button" onClick={check} disabled={checking||pending}>{checking?'Checking…':'Already paid? Check payment status'}</button>
 {error&&<p className="field-error" role="alert">{error}</p>}{message&&<p className="notice" role="status">{message}</p>}
 <p className="payment-security"><img src={import.meta.env.BASE_URL+'assets/checkout/c53b6.svg'} alt=""/><span>Your assessments will unlock once your payment is confirmed. If you have already paid, select “Check payment status”.</span></p>
 </section><aside className="order-card"><h2>I-WIN registration</h2><div className="order-price"><strong>₹500</strong><span>one-time</span></div><hr/><h3>Start your student journey</h3><ul>{benefits.map(item=><li key={item}><img src={import.meta.env.BASE_URL+'assets/checkout/ed2a7.svg'} alt=""/>{item}</li>)}</ul><p className="fine-print">Other assessment modules will become available as their services are released.</p><p className="fine-print">Need help? <Link href="mailto:sivaram@i-winlearning.com">Contact I-WIN support</Link></p></aside>
 </div></main>;
}
