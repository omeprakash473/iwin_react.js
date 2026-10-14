import React, { useEffect, useState } from 'react';

const links = [['The I-WIN Pathway', '/#pathway'], ['Assessments', '/#assessments'], ['Our Services', '/#services'], ['Training & Certifications', '/#certifications']];

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="container header-inner">
      <a className="brand" href="/" aria-label="I-WIN home"><img src="/assets/brand/iwin-logo.png" alt="I-WIN — Learn to Win" width="150" height="59" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><a className="btn btn-outline" href="/login">Login ↗</a><a className="btn btn-primary" href="/signup">Join ↗</a></div>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <div className="mobile-auth"><a className="btn btn-outline" href="/login">Login ↗</a><a className="btn btn-primary" href="/signup">Join ↗</a></div>
    </nav>
  </header>;
}
