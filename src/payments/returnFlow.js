import {hasPaymentAccess,paymentNeedsConfirmation} from './api.js';

// Only authenticated backend status can confirm payment; callback query values are not evidence.
export function paymentReturnState(payment) {
 if(hasPaymentAccess(payment))return 'success';
 if(paymentNeedsConfirmation(payment))return 'pending';
 if(['failed','cancelled','canceled','expired','terminated'].includes(payment?.status?.toLowerCase()))return 'failed';
 return 'pending';
}

export function loginDestination(search) {
 return new URLSearchParams(search).get('next')==='payment-return' ? '/payment/return' : '/dashboard';
}

export function watchPaymentReturn(refresh,onState,{interval=3000,timeout=120000,now=Date.now,schedule=setTimeout,cancel=clearTimeout}={}) {
 let stopped=false,timer;
 const deadline=now()+timeout;
 async function check() {
  try {
   const payment=await refresh();
   if(stopped)return;
   const state=paymentReturnState(payment);
   if(state!=='pending'){onState({state,payment});return;}
   if(now()>=deadline){onState({state:'waiting',payment});return;}
   onState({state:'checking',payment});
   timer=schedule(check,interval);
  }catch(error){if(!stopped)onState({state:'error',error:error.message});}
 }
 check();
 return ()=>{stopped=true;cancel(timer);};
}
