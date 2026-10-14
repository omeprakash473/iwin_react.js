import Link from './Link.jsx';
import React, { useEffect, useRef, useState } from 'react';

const links = [['The I-WIN Pathway', '/#pathway'], ['Assessments', '/#assessments'], ['Our Services', '/#services'], ['Training & Certifications', '/#certifications']];

export default function Header({dashboard = false, dashboardHome = '/dashboard'}) {
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
  return <header className="site-header">
    <Link className="skip-link" href="#main-content">Skip to content</Link>
    <div className="container header-inner">
      <Link className="brand" href="/" aria-label="I-WIN home"><img src={(import.meta.env.BASE_URL + "assets/brand/iwin-logo.png")} alt="I-WIN — Learn to Win" width="150" height="59" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}{dashboard && <><button className="text-button" onClick={() => showPreview('My Training')}>My Training</button><button className="text-button" onClick={() => showPreview('Reports')}>Reports</button></>}</nav>
      <div className={dashboard ? "header-actions dashboard-actions" : "header-actions"}>{dashboard ? <div className="profile-menu" ref={profileRef}><button type="button" className="dashboard-user profile-toggle" aria-label="Aarav profile" aria-expanded={profileOpen} aria-controls="profile-dropdown" onClick={() => setProfileOpen(value => !value)}><span>A</span><strong>Aarav</strong><small aria-hidden="true">⌄</small></button>{profileOpen && <div id="profile-dropdown" className="profile-dropdown"><p>Sample account: <strong>Aarav</strong></p><Link href="/profile" onClick={() => setProfileOpen(false)}>My profile</Link><Link href="/change-password" onClick={() => setProfileOpen(false)}>Change password</Link><Link href="/#contact" onClick={() => setProfileOpen(false)}>Help & support</Link><Link href="/login" onClick={() => { setProfileOpen(false); setOpen(false); }}>Log out →</Link></div>}</div> : <><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></>}</div>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      {dashboard && <><button className="text-button" onClick={() => showPreview('My Training')}>My Training</button><button className="text-button" onClick={() => showPreview('Reports')}>Reports</button></>}<div className="mobile-auth">{dashboard ? <Link href="/login" onClick={() => setOpen(false)}>Back to login preview</Link> : <><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></>}</div>
    </nav>
  <dialog ref={previewDialog} className="preview-dialog" aria-labelledby="dashboard-nav-preview"><h2 id="dashboard-nav-preview">{previewTitle}</h2><p>{previewTitle === 'Reports' ? 'Your report unlocks after all six assessments are complete.' : 'Your training programmes will appear here once they are connected.'}</p><div className="dialog-actions"><button type="button" className="btn btn-primary" onClick={() => previewDialog.current.close()}>Close</button></div></dialog></header>;
}
