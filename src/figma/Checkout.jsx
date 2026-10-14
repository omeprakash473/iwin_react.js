import Link from '../components/Link.jsx';
import React, { useRef, useState } from 'react';
import Field from '../components/Field.jsx';

const methods = ['UPI', 'Card', 'Net banking'];
const benefits = ['Levels 1 & 2 available immediately', 'Initial report after Levels 1 + 2', 'Multiple Level 3 + 4 attempts', 'History, compare and downloads', 'No more payments—ever'];

export default function Checkout() {
  const [method, setMethod] = useState('UPI');
  const [app, setApp] = useState('');
  const dialog = useRef(null);
  const switchTab = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : -1) + methods.length) % methods.length;
    setMethod(methods[next]);
    event.currentTarget.parentElement.children[next].focus();
  };
  return <main id="main-content" className="checkout-page section-pad"><div className="container checkout-grid">
    <section className="payment-form"><h1>Choose how you’d like to pay</h1><p>Your account unlocks Levels 1 and 2 as soon as payment succeeds.</p>
      <div className="payment-tabs" role="tablist" aria-label="Payment method">{methods.map((label, index) => <button key={label} id={'tab-'+index} type="button" role="tab" aria-selected={method === label} aria-controls="payment-panel" tabIndex={method === label ? 0 : -1} className={method === label ? 'active' : ''} onClick={() => setMethod(label)} onKeyDown={event => switchTab(event, index)}>{label}</button>)}</div>
      <div id="payment-panel" role="tabpanel" aria-labelledby={'tab-'+methods.indexOf(method)}>
        {method === 'UPI' && <><Field id="upi" label="UPI ID" name="upi" placeholder="name@bank" autoComplete="off" icon={(import.meta.env.BASE_URL + "assets/checkout/4a6e3.svg")} /><div className="upi-apps">{['GPay', 'PhonePe', 'BHIM'].map(label => <button type="button" key={label} aria-pressed={app === label} className={app === label ? 'active' : ''} onClick={() => setApp(label)}>{label}</button>)}</div></>}
        {method === 'Card' && <><Field id="card-number" label="Card number" placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength={19} autoComplete="off" /><div className="form-row"><Field id="card-expiry" label="Expiry date" placeholder="MM / YY" inputMode="numeric" maxLength={7} autoComplete="off" /><Field id="card-cvv" label="Security code" type="password" placeholder="CVV" inputMode="numeric" maxLength={4} autoComplete="off" /></div></>}
        {method === 'Net banking' && <div className="field"><label htmlFor="bank">Select your bank</label><select id="bank" defaultValue=""><option value="" disabled>Choose a bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option>Other bank</option></select></div>}
      </div>
      <p className="payment-security"><img src={(import.meta.env.BASE_URL + "assets/checkout/c53b6.svg")} alt="" /><span>Payment information is encrypted and processed securely. I-WIN never stores your UPI PIN.</span></p>
    </section>
    <aside className="order-card"><h2>I-WIN complete journey</h2><div className="order-price"><strong>₹500</strong><span>one-time</span></div><hr /><h3>All 6 levels included</h3><ul>{benefits.map(item => <li key={item}><img src={(import.meta.env.BASE_URL + "assets/checkout/ed2a7.svg")} alt="" />{item}</li>)}</ul><button className="btn btn-primary full-width" onClick={() => dialog.current.showModal()}>Pay ₹500 once <span aria-hidden="true">→</span></button><p className="fine-print">Checkout preview—no payment will be collected.</p><p className="fine-print">By paying, you agree to I-WIN’s Terms. No recurring charge will be created.</p></aside>
  </div><dialog className="preview-dialog" ref={dialog} aria-labelledby="checkout-preview-title"><h2 id="checkout-preview-title">Checkout preview</h2><p>No payment provider is connected, and no money will be charged. You can explore the sample success screen.</p><div className="dialog-actions"><button className="btn btn-outline" onClick={() => dialog.current.close()}>Close</button><Link className="btn btn-primary" href="/success">View sample success →</Link></div></dialog></main>;
}
