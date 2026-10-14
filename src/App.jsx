import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Landing from './figma/Landing.jsx';
import Login from './figma/Login.jsx';
import ForgotPassword from './figma/ForgotPassword.jsx';
import Signup from './figma/Signup.jsx';
import Checkout from './figma/Checkout.jsx';
import Success from './figma/Success.jsx';
import './styles.css';

const screens = { '/': Landing, '/landing': Landing, '/login': Login, '/forgot-password': ForgotPassword, '/signup': Signup, '/checkout': Checkout, '/success': Success };

function routePath(url) {
 const base = import.meta.env.BASE_URL;
 const pathname = new URL(url).pathname;
 return (base !== '/' && pathname.startsWith(base) ? '/' + pathname.slice(base.length) : pathname).toLowerCase().replace(/\/$/, '') || '/';
}
export default function App() {
  const [location, setLocation] = useState(() => window.location.href);

  useEffect(() => {
    const update = () => setLocation(window.location.href);
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);

  useLayoutEffect(() => {
    const hash = new URL(location).hash;
    if (hash) {
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      document.getElementById(id)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);

  function navigate(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const next = new URL(link.href, window.location.href);
    if (next.origin !== window.location.origin || !screens[routePath(next.href)]) return;
    event.preventDefault();
    if (next.href !== window.location.href) window.history.pushState(null, '', next.href);
    setLocation(next.href);
  }

  const Screen = screens[routePath(location)] || Landing;
  return <div onClick={navigate}><Header key={new URL(location).pathname} /><Screen /></div>;
}
