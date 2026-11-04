import {useAuth, navigateTo} from '../auth/AuthContext.jsx';
import {signOut} from '../auth/client.js';
import Link from './Link.jsx';
import Logo from './Logo.jsx';
import React, { useEffect, useRef, useState } from 'react';
import './StudentDashboardHeader.css';

const links = [['The I-WIN Pathway', '/#pathway'], ['Assessments', '/#assessments'], ['Our Services', '/#services'], ['Training & Certifications', '/#certifications']];

export default function Header({dashboardHome = '/dashboard', landing = false, studentDashboard = false}) {
  const {session, ready} = useAuth();
  const dashboard = Boolean(session);
  const displayName = session?.identity || 'My account';
  const [loggingOut,setLoggingOut] = useState(false);
  async function logout() {
   if(loggingOut)return;setLoggingOut(true);
   try {await signOut();navigateTo('/login',true);}
   catch {navigateTo('/login?logout=unconfirmed',true);}
   finally {setLoggingOut(false);}
  }
  const navigation = dashboard ? [['The I-WIN Pathway','/#pathway'],['Dashboard',dashboardHome],['Assessments',dashboardHome+'#dashboard-assessments'],['Our Services','/#services'],['Training & Certifications','/#certifications']] : links;
  const previewDialog = useRef(null); const [previewTitle, setPreviewTitle] = useState(''); function showPreview(title) { setPreviewTitle(title); setOpen(false); previewDialog.current.showModal(); }
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useEffect(() => {
    const outside = event => { if (!profileRef.current?.contains(event.target)) setProfileOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') { setOpen(false); setProfileOpen(false); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  if(studentDashboard) return <header className="student-dashboard-header">
    <Link className="skip-link" href="#main-content">Skip to content</Link>
    <Link className="student-dashboard-brand" href="/dashboard" aria-label="I-WIN dashboard"><Logo/></Link>
    <form className="student-dashboard-search" action={import.meta.env.BASE_URL+'dashboard'} method="get"><img src={import.meta.env.BASE_URL+'assets/dashboard/3b12f.svg'} alt=""/><input type="search" name="q" aria-label="Search assessments and services" placeholder="Search for careers, courses, exams or skills…" defaultValue={new URLSearchParams(window.location.search).get('q') || ''}/></form>
    <div className="student-dashboard-header-actions"><button className="student-notifications" type="button" aria-label="Notifications" onClick={()=>showPreview('Notifications')}><img src={import.meta.env.BASE_URL+'assets/dashboard/a810c.svg'} alt=""/></button><div className="profile-menu" ref={profileRef}><button type="button" className="student-profile-toggle" aria-label={displayName+' profile'} aria-expanded={profileOpen} aria-controls="student-profile-dropdown" onClick={()=>setProfileOpen(value=>!value)}><span className="student-avatar">{displayName.charAt(0).toUpperCase()}</span><span><strong>{displayName}</strong><small>Student</small></span><span aria-hidden="true">⌄</span></button>{profileOpen && <div id="student-profile-dropdown" className="profile-dropdown"><Link href="/profile" onClick={()=>setProfileOpen(false)}>My profile</Link><Link href="/change-password" onClick={()=>setProfileOpen(false)}>Change password</Link><Link href="/">I-WIN home</Link><button type="button" onClick={logout} disabled={loggingOut}>{loggingOut?'Signing out…':'Sign out'}</button></div>}</div></div>
    <dialog ref={previewDialog} className="preview-dialog" aria-labelledby="student-notification-title"><h2 id="student-notification-title">Notifications</h2><p>No notifications are available yet.</p><button className="btn btn-primary" type="button" onClick={()=>previewDialog.current.close()}>Close</button></dialog>
  </header>;
  return <header className={landing ? "site-header landing-v1-header" : "site-header"}>
    <Link className="skip-link" href="#main-content">Skip to content</Link>
    <div className="container header-inner">
      <Link className="brand" href="/" aria-label="I-WIN home"><Logo/></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}{dashboard && <><button className="text-button" onClick={() => showPreview('My Training')}>My Training</button><button className="text-button" onClick={() => showPreview('Reports')}>Reports</button></>}</nav>
      <div className={dashboard ? "header-actions dashboard-actions" : "header-actions"}>{!ready ? <span role="status">Restoring session…</span> : dashboard ? <div className="profile-menu" ref={profileRef}><button type="button" className="dashboard-user profile-toggle" aria-label={displayName+' profile'} aria-expanded={profileOpen} aria-controls="profile-dropdown" onClick={() => setProfileOpen(value => !value)}><span>{displayName.charAt(0).toUpperCase()}</span><strong>{displayName}</strong><small aria-hidden="true">⌄</small></button>{profileOpen && <div id="profile-dropdown" className="profile-dropdown"><p>Signed in as <strong>{displayName}</strong></p><Link href="/profile" onClick={() => setProfileOpen(false)}>My profile</Link><Link href="/change-password" onClick={() => setProfileOpen(false)}>Change password</Link><Link href="/#contact" onClick={() => setProfileOpen(false)}>Help & support</Link><button className="profile-logout" type="button" onClick={logout} disabled={loggingOut}>{loggingOut ? "Signing out…" : "Log out →"}</button></div>}</div> : <><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></>}</div>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      {dashboard && <><button className="text-button" onClick={() => showPreview('My Training')}>My Training</button><button className="text-button" onClick={() => showPreview('Reports')}>Reports</button></>}<div className="mobile-auth">{!ready ? <span role="status">Restoring session…</span> : dashboard ? <button type="button" className="text-button" onClick={logout} disabled={loggingOut}>{loggingOut ? "Signing out…" : "Log out"}</button> : <><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></>}</div>
    </nav>
  <dialog ref={previewDialog} className="preview-dialog" aria-labelledby="dashboard-nav-preview"><h2 id="dashboard-nav-preview">{previewTitle}</h2><p>{previewTitle === 'Reports' ? 'Your report unlocks after all six assessments are complete.' : 'Your training programmes will appear here once they are connected.'}</p><div className="dialog-actions"><button type="button" className="btn btn-primary" onClick={() => previewDialog.current.close()}>Close</button></div></dialog></header>;
}
