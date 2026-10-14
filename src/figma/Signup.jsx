import Link from '../components/Link.jsx';
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';

export default function Signup() {
  const [notice, setNotice] = useState('');
  const [consentError, setConsentError] = useState(false);
  return <AuthLayout image={(import.meta.env.BASE_URL + "assets/signup/b0feb.png")} title="One honest answer at a time. Your path will take shape.">
    <div className="form-heading"><p className="eyebrow">Create your private space</p><h1>Start with who you are today.</h1></div>
    <form onSubmit={event => { event.preventDefault(); setNotice('Your details are valid. This preview is not connected to account registration yet.'); }}>
      <div className="form-row"><Field label="First name" id="first-name" name="firstName" autoComplete="given-name" placeholder="Aarav" required /><Field label="Last name" id="last-name" name="lastName" autoComplete="family-name" placeholder="Shah" required /></div>
      <Field label="Email" id="signup-email" name="email" type="email" autoComplete="email" placeholder="aarav@example.com" required icon={(import.meta.env.BASE_URL + "assets/signup/c8bbe.svg")} />
      <Field label="Mobile number" id="signup-phone" name="phone" type="tel" inputMode="numeric" pattern="[0-9]+" autoComplete="tel" placeholder="9876543210" title="Enter your mobile number using digits only" onInput={event => { event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, ''); }} required icon={(import.meta.env.BASE_URL + "assets/signup/ec366.svg")} />
      <div className="form-row"><div className="field"><label htmlFor="stage">Current stage</label><select id="stage" name="stage" defaultValue="" required><option value="" disabled>Select your stage</option><option>Class 9</option><option>Class 10</option><option>Class 11</option><option>Class 12</option><option>College</option><option>Other</option></select></div><Field label="City" id="city" name="city" autoComplete="address-level2" placeholder="Ahmedabad" required /></div>
      <Field label="Create password" id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} required icon={(import.meta.env.BASE_URL + "assets/signup/53607.svg")} />
      <label className="checkbox consent"><input type="checkbox" name="consent" required aria-invalid={consentError} aria-describedby={consentError ? 'consent-error' : undefined} onInvalid={() => setConsentError(true)} onChange={event => { if (event.target.checked) setConsentError(false); }} />I agree to the Terms and Privacy Notice. If I am under 18, I confirm I have a parent or guardian’s consent.</label>
      {consentError && <p id="consent-error" className="field-error" role="alert">Please agree to the Terms and Privacy Notice before creating your account.</p>}
      <button className="btn btn-primary full-width" type="submit" onClick={event => setConsentError(!event.currentTarget.form.elements.consent.checked)}>Create account <span aria-hidden="true">→</span></button>
      {notice && <p className="notice" role="status">{notice}</p>}
    </form>
    <p className="form-footer">Already have an account? <Link href="/login">Log in</Link></p>
  </AuthLayout>;
}
