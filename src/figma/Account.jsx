import React, { useState } from 'react';
import Link from '../components/Link.jsx';
import Field from '../components/Field.jsx';
export default function Account({ password = false }) {
 const [notice, setNotice] = useState('');
 const [error, setError] = useState('');
 function submit(event) {
  event.preventDefault(); setNotice(''); setError('');
  if(password) {
   const fields = event.currentTarget.elements;
   if(fields.newPassword.value !== fields.confirmPassword.value) { setError('New password and confirmation must match.'); fields.confirmPassword.focus(); return; }
   if(fields.currentPassword.value === fields.newPassword.value) { setError('Choose a new password different from your current password.'); fields.newPassword.focus(); return; }
   setNotice('Validation passed. Password changes need the account API; your password has not been changed.');
   event.currentTarget.reset();
  } else setNotice('Your details are valid. Saving your profile needs the account API; these changes have not been saved.');
 }
 return <main id="main-content" className="account-page"><section className="account-card"><Link href={sessionStorage.getItem('iwin-dashboard-preview') === '1' ? '/dashboard-progress' : '/dashboard'}>← Back to dashboard</Link><div className="form-heading"><p className="eyebrow">Your account</p><h1>{password ? 'Change password' : 'My profile'}</h1><p>{password ? 'Choose a new password to keep your account secure.' : 'Manage your contact details and current stage.'}</p></div>
 <form onSubmit={submit} onChange={()=>{setError('');setNotice('');}}>
 {password ? <>
  <Field label="Current password" id="current-password" name="currentPassword" type="password" autoComplete="current-password" required />
  <Field label="New password" id="new-password" name="newPassword" type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required />
  <Field label="Confirm new password" id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required aria-describedby={error ? 'password-error' : undefined} aria-invalid={Boolean(error)} />
  {error && <p className="field-error" id="password-error" role="alert">{error}</p>}
  <Link href="/forgot-password">Forgot your current password?</Link>
 </> : <>
  <p className="fine-print">Sample account for frontend review. Contact details are not loaded from a real account.</p>
  <div className="form-row"><Field label="First name" id="profile-first" name="firstName" defaultValue="Aarav" autoComplete="given-name" required /><Field label="Last name" id="profile-last" name="lastName" autoComplete="family-name" required /></div>
  <Field label="Email" id="profile-email" name="email" type="email" autoComplete="email" required />
  <Field label="Mobile number" id="profile-phone" name="phone" type="tel" inputMode="numeric" pattern="[0-9]+" autoComplete="tel" onInput={event=>{event.currentTarget.value=event.currentTarget.value.replace(/[^0-9]/g,'');}} required />
  <div className="form-row"><div className="field"><label htmlFor="profile-stage">Current stage</label><select id="profile-stage" name="stage" required defaultValue=""><option value="" disabled>Select your stage</option>{['Class 9','Class 10','Class 11','Class 12','College','Other'].map(stage=><option key={stage}>{stage}</option>)}</select></div><Field label="City" id="profile-city" name="city" autoComplete="address-level2" required /></div>
 </>}
 <button className="btn btn-primary full-width" type="submit">{password ? 'Update password' : 'Save profile'}</button>
 {notice && <p className="notice" role="status">{notice}</p>}
 </form><p className="fine-print">Frontend preview — account updates will work when backend services are connected.</p></section></main>;
}
export function ChangePassword() { return <Account password />; }
