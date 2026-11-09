import Link from '../components/Link.jsx';
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  return <AuthLayout image={(import.meta.env.BASE_URL + "assets/login/8f0ea.png")} title="Your next chapter starts with a little clarity.">
    <div className="form-heading"><p className="eyebrow">Get back to your journey</p><h1>Forgot your password?</h1><p>Enter the email address you used to create your I-WIN account. We’ll send you a link to reset your password.</p></div>
    <form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
      <Field label="Email address" id="reset-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required icon={(import.meta.env.BASE_URL + "assets/login/9f5fa.svg")} onChange={() => setSubmitted(false)} />
      <button className="btn btn-primary full-width" type="submit">Send reset link <span aria-hidden="true">→</span></button>
      {submitted && <p className="notice" role="status">Your email format is valid. This preview is not connected to password recovery yet, so no reset email has been sent.</p>}
    </form>
    <p className="form-footer"><Link href="/login">← Back to login</Link></p>
    <p className="form-footer">New to I-WIN? <Link href="/signup">Create an account</Link></p>
  </AuthLayout>;
}
