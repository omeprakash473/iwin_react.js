let loading;
export const CASHFREE_MODE=import.meta.env?.VITE_CASHFREE_MODE || 'sandbox';
export function loadCashfree() {
 if(!['sandbox','production'].includes(CASHFREE_MODE))return Promise.reject(new Error('The payment environment is not configured correctly.'));
 if(typeof window.Cashfree==='function')return Promise.resolve(window.Cashfree({mode:CASHFREE_MODE}));
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://sdk.cashfree.com/js/v3/cashfree.js';script.async=true;
  const timer=setTimeout(()=>fail(),20000);
  function fail(){clearTimeout(timer);script.remove();loading=null;reject(new Error('Unable to load the secure payment page. Please try again.'));}
  script.onerror=fail;
  script.onload=()=>{clearTimeout(timer);if(typeof window.Cashfree==='function')resolve(window.Cashfree({mode:CASHFREE_MODE}));else fail();};
  document.head.appendChild(script);
 });
 return loading;
}
