import React, { useState } from 'react';
import Link from '../components/Link.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import {signIn} from '../auth/client.js';
import {navigateTo} from '../auth/AuthContext.jsx';
export default function Login() {
 const [error,setError]=useState(() => new URLSearchParams(window.location.search).get('logout') === 'unconfirmed' ? 'Signed out of this tab. The server could not confirm sign-out on other devices.' : ''); const [pending,setPending]=useState(false);
 async function submit(event) {
  event.preventDefault(); if(pending)return;
  const form=event.currentTarget;
  const identity=form.elements.identity.value; const password=form.elements.password.value;
  setPending(true);setError('');
  try {await signIn(identity,password);form.reset();sessionStorage.removeItem('iwin-dashboard-preview');navigateTo('/dashboard');}
  catch(error){setError(error.message);} finally{setPending(false);}
 }
 return <AuthLayout image={import.meta.env.BASE_URL+'assets/login/8f0ea.png'} title="Your progress is exactly where you left it.">
  <div className="form-heading"><p className="eyebrow">Continue your journey</p><h1>Log in to I-WIN</h1><p>Sign in to your account to continue.</p></div>
  <form onSubmit={submit} aria-busy={pending}>
   <Field label="Username or email" id="login-identity" name="identity" autoComplete="username" placeholder="Username or email address" required disabled={pending} icon={import.meta.env.BASE_URL+'assets/login/9f5fa.svg'} />
   <Field label="Password" id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required disabled={pending} icon={import.meta.env.BASE_URL+'assets/login/3bdbf.svg'} />
   <div className="form-options"><span className="fine-print">Your session stays in this browser tab.</span><Link className="text-button" href="/forgot-password">Forgot password?</Link></div>
   {error && <p className="field-error" role="alert">{error}</p>}
   <button className="btn btn-primary full-width" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Log in →'}</button>
  </form><p className="form-footer">New to I-WIN? <Link href="/signup">Create an account</Link></p>
 </AuthLayout>;
}
