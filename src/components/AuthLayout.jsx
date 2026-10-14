import React from 'react';

export default function AuthLayout({ image, title, children }) {
  return <main id="main-content" className="auth-layout">
    <aside className="auth-photo"><img className="photo" src={image} alt="Students exploring their future" /><div className="auth-photo-copy"><h2>{title}</h2><p>Private, autosaved and built for reflection—not speed.</p></div></aside>
    <section className="auth-form-panel"><div className="auth-form-content">{children}</div></section>
  </main>;
}
