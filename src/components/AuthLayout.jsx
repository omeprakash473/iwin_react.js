import React from 'react';

export default function AuthLayout({ image, title, children }) {
  return <main id="main-content" className="auth-layout">
    <aside className="auth-photo"><picture><source media="(min-width: 901px)" srcSet={image}/><img className="photo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" decoding="async" alt="Students exploring their future" /></picture><div className="auth-photo-copy"><h2>{title}</h2><p>Private, autosaved and built for reflection—not speed.</p></div></aside>
    <section className="auth-form-panel"><div className="auth-form-content">{children}</div></section>
  </main>;
}
