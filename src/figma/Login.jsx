import Link from '../components/Link.jsx';
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';

export default function Login() {
  const [notice, setNotice] = useState('');
  const previewNotice = 'This is a website preview. Account sign-in is not connected yet.';
  return <AuthLayout image={(import.meta.env.BASE_URL + "assets/login/8f0ea.png")} title="Your progress is exactly where you left it.">
    <div className="form-heading"><p className="eyebrow">Continue your journey</p><h1>Log in to I-WIN</h1><p>Your reports and assessment history are waiting.</p></div>
    <form onSubmit={event => { event.preventDefault(); setNotice(previewNotice); }}>
      <Field label="Email or mobile number" id="login-identity" name="identity" autoComplete="username" placeholder="you@example.com" required icon={(import.meta.env.BASE_URL + "assets/login/9f5fa.svg")} />
      <Field label="Password" id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required icon={(import.meta.env.BASE_URL + "assets/login/3bdbf.svg")} />
      <div className="form-options"><label className="checkbox"><input type="checkbox" name="remember" />Remember me</label><Link className="text-button" href="/forgot-password">Forgot password?</Link></div>
      <button className="btn btn-primary full-width" type="submit">Log in <span aria-hidden="true">→</span></button>
      <div className="form-divider"><span>or</span></div>
      <button className="btn btn-outline full-width" type="button" onClick={() => setNotice(previewNotice)}>Continue with Google</button>
      {notice && <p className="notice" role="status">{notice}</p>}
    </form>
    <p className="form-footer">New to I-WIN? <Link href="/signup">Create an account</Link></p>
  </AuthLayout>;
}
