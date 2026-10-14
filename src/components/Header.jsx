import Link from './Link.jsx';
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
    <Link className="skip-link" href="#main-content">Skip to content</Link>
    <div className="container header-inner">
      <Link className="brand" href="/" aria-label="I-WIN home"><img src={(import.meta.env.BASE_URL + "assets/brand/iwin-logo.png")} alt="I-WIN — Learn to Win" width="150" height="59" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <div className="header-actions"><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></div>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <div className="mobile-auth"><Link className="btn btn-outline" href="/login">Login ↗</Link><Link className="btn btn-primary" href="/signup">Join ↗</Link></div>
    </nav>
  </header>;
}
