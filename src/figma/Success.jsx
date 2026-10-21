import React from 'react';
import Link from '../components/Link.jsx';
import {usePayment} from '../payments/PaymentContext.jsx';
export default function Success(){
 const {payment}=usePayment();
 return <main id="main-content" className="account-page"><section className="account-card"><h1>Payment confirmed</h1><p className="notice" role="status">Your registration fee is confirmed and your assessment access is unlocked.</p>{payment?.amount&&<p>Amount: {payment.currency} {payment.amount}</p>}{payment?.paid_at&&<p>Paid on: {new Date(payment.paid_at).toLocaleString()}</p>}<Link className="btn btn-primary full-width" href="/dashboard">Continue to dashboard →</Link></section></main>;
}
