import Link from '../components/Link.jsx';
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import {registerStudent} from '../auth/client.js';

export default function Signup() {
  const [created, setCreated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [consentError, setConsentError] = useState(false);
  async function submit(event) {
    event.preventDefault(); if(pending) return;
    const form = event.currentTarget;
    if(!form.elements.consent.checked) { setConsentError(true); return; }
    const fields = form.elements;
    const payload = {username:fields.username.value,email:fields.email.value,password:fields.password.value,class_standard:fields.class_standard.value};
    setPending(true); setError('');
    try { await registerStudent(payload); form.reset(); setCreated(true); }
    catch(error) { setError(error.message); }
    finally { setPending(false); }
  }
  return <AuthLayout image={import.meta.env.BASE_URL+'assets/signup/b0feb.png'} title="One honest answer at a time. Your path will take shape.">
    <div className="form-heading"><p className="eyebrow">Create your private space</p><h1>{created ? 'Your account is ready.' : 'Start with who you are today.'}</h1></div>
    {created ? <div><p className="notice" role="status">Your account was created successfully. Log in with your username or email and password to continue.</p><Link className="btn btn-primary full-width" href="/login">Continue to login →</Link></div> : <form onSubmit={submit} aria-busy={pending}>
      <Field label="Username" id="signup-username" name="username" autoComplete="username" placeholder="Choose a username" minLength={3} maxLength={30} pattern="[A-Za-z0-9_]+" title="Use 3–30 letters, numbers or underscores" required disabled={pending} aria-describedby="username-help" />
      <p id="username-help" className="fine-print">3–30 letters, numbers or underscores.</p>
      <Field label="Email" id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={pending} icon={import.meta.env.BASE_URL+'assets/signup/c8bbe.svg'} />
      <div className="field"><label htmlFor="stage">Current class</label><select id="stage" name="class_standard" defaultValue="" required disabled={pending}><option value="" disabled>Select your class</option>{[8,9,10,11,12].map(value=><option key={value} value={value}>Class {value}</option>)}</select></div>
      <Field label="Create password" id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} maxLength={128} required disabled={pending} icon={import.meta.env.BASE_URL+'assets/signup/53607.svg'} />
      <label className="checkbox consent"><input type="checkbox" name="consent" required disabled={pending} aria-invalid={consentError} aria-describedby={consentError ? 'consent-error' : undefined} onInvalid={() => setConsentError(true)} onChange={event => { if(event.target.checked) setConsentError(false); }} />I agree to the Terms and Privacy Notice. If I am under 18, I confirm I have a parent or guardian’s consent.</label>
      {consentError && <p id="consent-error" className="field-error" role="alert">Please agree to the Terms and Privacy Notice before creating your account.</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
      <button className="btn btn-primary full-width" type="submit" disabled={pending} onClick={event=>setConsentError(!event.currentTarget.form.elements.consent.checked)}>{pending ? 'Creating account…' : 'Create account →'}</button>
    </form>}
    <p className="form-footer">Already have an account? <Link href="/login">Log in</Link></p>
  </AuthLayout>;
}
