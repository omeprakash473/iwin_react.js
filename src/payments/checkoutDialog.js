// Cashfree's supported inline checkout lives inside a dialog owned by I-WIN.
// Removing our dialog disposes its hosted iframe without touching provider internals.
export function openCheckoutDialog(sdk,paymentSessionId,{signal}={}) {
 return new Promise((resolve,reject)=>{
  if(signal?.aborted){resolve({closed:true});return;}
  const dialog=document.createElement('dialog');dialog.className='cashfree-checkout-dialog';
  dialog.setAttribute('aria-label','Secure payment');
  const header=document.createElement('div');header.className='cashfree-checkout-header';
  const title=document.createElement('strong');title.textContent='Secure payment';
  const close=document.createElement('button');close.type='button';close.className='cashfree-checkout-close';close.textContent='Close ×';close.setAttribute('aria-label','Close payment window');
  const host=document.createElement('div');host.className='cashfree-checkout-host';
  header.append(title,close);dialog.append(header,host);
  let finished=false;
  const previousFocus=document.activeElement;
  function finish(result,error){
   if(finished)return;finished=true;
   signal?.removeEventListener('abort',cancel);
   close.removeEventListener('click',cancel);dialog.removeEventListener('cancel',cancel);dialog.removeEventListener('close',cancel);
   if(dialog.open)dialog.close();dialog.remove();
   if(previousFocus?.isConnected)previousFocus.focus();
   error?reject(error):resolve(result);
  }
  function cancel(event){event?.preventDefault();finish({closed:true});}
  close.addEventListener('click',cancel);dialog.addEventListener('cancel',cancel);dialog.addEventListener('close',cancel);
  signal?.addEventListener('abort',cancel,{once:true});
  try{
   document.body.appendChild(dialog);dialog.showModal();close.focus();
   Promise.resolve(sdk.checkout({paymentSessionId,redirectTarget:host,appearance:{width:'100%',height:'100%'}})).then(result=>finish(result),error=>finish(null,error));
  }catch(error){finish(null,error);}
 });
}
