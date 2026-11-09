import {useBuddy} from '../buddy/Buddy.jsx';
import Link from '../components/Link.jsx';
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import {registerStudent} from '../auth/client.js';
import {signupBoards, signupSubjects, maxSignupSubjects, signupSelectionError, requiresSignupSubjects} from '../auth/signupOptions.js';
import './Signup.css';

export default function Signup() {
 const buddy=useBuddy();
  const [created, setCreated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [consentError, setConsentError] = useState(false);
  const [board, setBoard] = useState('');
  const [classStandard, setClassStandard] = useState('');
  const showSubjects = requiresSignupSubjects(classStandard);
  const [subjects, setSubjects] = useState([]);
  const [subjectError, setSubjectError] = useState('');
  function changeSubject(value, checked) {
    setSubjects(previous => checked ? (previous.length < maxSignupSubjects ? [...previous, value] : previous) : previous.filter(subject => subject !== value));
    setSubjectError('');
    setError('');
  }
  async function submit(event) {
    event.preventDefault(); if(pending) return;
    const form = event.currentTarget;
    const selectionError = signupSelectionError(board, subjects, classStandard);
    if(selectionError) { setSubjectError(selectionError); (form.querySelector('#signup-subjects') || form.elements.board).focus(); return; }
    if(!form.elements.consent.checked) { setConsentError(true); return; }
    const fields = form.elements;
    const payload = {username:fields.username.value,email:fields.email.value,password:fields.password.value,class_standard:classStandard,board,...(showSubjects ? {subjects} : {})};
    setPending(true); setError('');
    try { await registerStudent(payload); form.reset(); setBoard(''); setClassStandard(''); setSubjects([]); setCreated(true);buddy.cue('account-created'); }
    catch(error) { setError(error.message);buddy.cue('support'); }
    finally { setPending(false); }
  }
  return <AuthLayout image={import.meta.env.BASE_URL+'assets/signup/b0feb.png'} title="One honest answer at a time. Your path will take shape.">
    <div className="form-heading"><p className="eyebrow">Create your private space</p><h1>{created ? 'Your account is ready.' : 'Start with who you are today.'}</h1></div>
    {created ? <div><p className="notice" role="status">Your account was created successfully. Log in with your username or email and password to continue.</p><Link className="btn btn-primary full-width" href="/login">Continue to login →</Link></div> : <form onSubmit={submit} aria-busy={pending}>
      <Field label="Username" id="signup-username" name="username" autoComplete="username" placeholder="Choose a username" minLength={5} maxLength={30} pattern="[A-Za-z0-9_]{5,30}" title="Use 5–30 letters, numbers or underscores" required disabled={pending} aria-describedby="username-help" />
      <p id="username-help" className="fine-print">5–30 letters, numbers or underscores.</p>
      <Field label="Email" id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={pending} icon={import.meta.env.BASE_URL+'assets/signup/c8bbe.svg'} />
      <div className="field"><label htmlFor="stage">Current class</label><select id="stage" name="class_standard" value={classStandard} required disabled={pending} onChange={event => {setClassStandard(event.target.value); setSubjects([]); setSubjectError(''); setError('');}}><option value="" disabled>Select your class</option>{[8,9,10,11,12].map(value=><option key={value} value={value}>Class {value}</option>)}</select></div>
      <div className="field"><label htmlFor="signup-board">Education board</label><select id="signup-board" name="board" value={board} required disabled={pending} onChange={event => {setBoard(event.target.value); setSubjects([]); setSubjectError(''); setError('');}}><option value="" disabled>Select your board</option>{signupBoards.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div>
      {showSubjects && <fieldset id="signup-subjects" className="signup-subjects" tabIndex={-1} disabled={pending || !board} aria-describedby={'signup-subject-help signup-subject-count'+(subjectError ? ' signup-subject-error' : '')} aria-invalid={Boolean(subjectError)}>
        <legend>Subjects</legend><p id="signup-subject-help">{board ? 'Choose 3–4 subjects you study. To change a selection after reaching 4, untick a subject first.' : 'Select your education board, then choose 3–4 subjects you study.'}</p>
        <div className="signup-subject-grid">{signupSubjects.map(([value,label]) => <label key={value} className="signup-subject-choice"><input type="checkbox" name="subjects" value={value} checked={subjects.includes(value)} disabled={pending || !board || (subjects.length >= maxSignupSubjects && !subjects.includes(value))} onChange={event => changeSubject(value,event.target.checked)}/><span>{label}</span></label>)}</div>
        <p id="signup-subject-count" className="signup-subject-count" role="status" aria-live="polite" aria-atomic="true">{subjects.length} of 4 selected · Minimum 3</p>
      </fieldset>}
      {subjectError && <p id="signup-subject-error" className="field-error" role="alert">{subjectError}</p>}
      <Field label="Create password" id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} maxLength={128} required disabled={pending} icon={import.meta.env.BASE_URL+'assets/signup/53607.svg'} />
      <label className="checkbox consent"><input type="checkbox" name="consent" required disabled={pending} aria-invalid={consentError} aria-describedby={consentError ? 'consent-error' : undefined} onInvalid={() => setConsentError(true)} onChange={event => { if(event.target.checked) setConsentError(false); }} />I agree to the Terms and Privacy Notice. If I am under 18, I confirm I have a parent or guardian’s consent.</label>
      {consentError && <p id="consent-error" className="field-error" role="alert">Please agree to the Terms and Privacy Notice before creating your account.</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
      <button className="btn btn-primary full-width" type="submit" disabled={pending} onClick={event=>setConsentError(!event.currentTarget.form.elements.consent.checked)}>{pending ? 'Creating account…' : 'Create account →'}</button>
    </form>}
    <p className="form-footer">Already have an account? <Link href="/login">Log in</Link></p>
  </AuthLayout>;
}
