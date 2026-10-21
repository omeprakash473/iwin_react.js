import {authorizedRequest} from '../auth/client.js';
export async function getPaymentStatus() {
 const data=await authorizedRequest('/api/v1/payments/me',undefined,true,'GET');
 if(typeof data?.account_unlocked !== 'boolean' || typeof data?.status !== 'string')throw new Error('The server returned an invalid payment status. Please retry.');
 return data;
}
export function hasPaymentAccess(payment) { return payment?.account_unlocked === true; }
export function paymentNeedsConfirmation(payment) { return !hasPaymentAccess(payment) && (Boolean(payment?.paid_at) || ['paid','success','successful','completed'].includes(payment?.status?.toLowerCase())); }
export async function createPaymentOrder(phone) {
 if(!/^[6-9][0-9]{9}$/.test(phone))throw new Error('Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.');
 const order=await authorizedRequest('/api/v1/payments/orders',{phone});
 if(typeof order?.payment_session_id !== 'string' || !order.payment_session_id || typeof order?.order_id !== 'string' || Number(order.amount)!==500 || order.currency!=='INR')throw new Error('The payment order could not be verified. No payment page was opened. Please contact support.');
 return order;
}
