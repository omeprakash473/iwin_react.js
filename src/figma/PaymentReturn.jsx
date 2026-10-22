import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth/AuthContext.jsx';
import {usePayment} from '../payments/PaymentContext.jsx';
import {watchPaymentReturn} from '../payments/returnFlow.js';
import Link from '../components/Link.jsx';
import Success from './Success.jsx';

export default function PaymentReturn() {
 const {session,ready,error:sessionError}=useAuth();
 const {refresh,unlocked}=usePayment();
 const [attempt,setAttempt]=useState(0);
 const [result,setResult]=useState({state:'checking'});
 useEffect(()=>{
  if(!ready || !session || sessionError)return;
  setResult({state:'checking'});
  return watchPaymentReturn(refresh,setResult);
 },[ready,session,sessionError,refresh,attempt]);

 if(ready && session && !sessionError && unlocked)return <Success/>;
 const signedOut=ready && !session;
 const failure=result.state==='failed';
 const waiting=result.state==='waiting';
 const error=sessionError || result.error || (result.state==='success' && !unlocked ? 'Your account access needs another check. Please retry payment confirmation.' : '');
 return <main id="main-content" className="account-page"><section className="account-card" aria-labelledby="payment-return-title">
  <p className="eyebrow">I-WIN registration payment</p>
  <h1 id="payment-return-title">{!ready?'Restoring your session…':signedOut?'Sign in to check your payment':error?'Unable to confirm payment':failure?'Payment not completed':waiting?'Payment confirmation is taking longer':'Confirming your payment…'}</h1>
  {signedOut ? <><p>Your payment may already be recorded. Sign in with the account you used for checkout so we can check it securely.</p><p>Returning from the payment page does not by itself confirm payment. Please do not pay again before checking.</p><Link className="btn btn-primary full-width" href="/login?next=payment-return">Sign in and check payment →</Link></> : !ready ? <p role="status">Please wait while we restore your account.</p> : error ? <><p className="field-error" role="alert">{error}</p><p>We could not verify your payment. If money was deducted, check again before making another payment.</p><button className="btn btn-primary full-width" onClick={()=>sessionError?window.location.reload():setAttempt(value=>value+1)}>Retry payment check</button></> : failure ? <><p className="notice" role="status">The payment service reports that your payment is {result.payment.status.toLowerCase()}. Your assessment access has not been unlocked.</p><p>If money was deducted, check the status again before retrying checkout.</p><button className="btn btn-primary full-width" onClick={()=>setAttempt(value=>value+1)}>Check payment status again</button><Link className="btn btn-outline full-width" href="/checkout">Back to checkout</Link></> : waiting ? <><p className="notice" role="status">{result.payment?.paid_at?'Your payment is recorded. We are waiting for your account access to unlock.':'Your payment has not been confirmed yet. Confirmation may take a little time.'}</p><p>If money was deducted, please do not pay again. You can safely check the status without creating a new order.</p><button className="btn btn-primary full-width" onClick={()=>setAttempt(value=>value+1)}>Check payment status again</button></> : <><p className="notice" role="status" aria-live="polite">We are checking your registration payment with the payment service. This can take up to two minutes.</p><p>Please do not make another payment while confirmation is in progress.</p></>}
  <p className="fine-print">Need help? <Link href="mailto:sivaram@i-winlearning.com">Contact I-WIN support</Link></p>
 </section></main>;
}
