import {PaymentProvider,usePayment} from './payments/PaymentContext.jsx';
import { AuthProvider, useAuth, navigateTo } from './auth/AuthContext.jsx';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Landing from './figma/Landing.jsx';
import Login from './figma/Login.jsx';
import Dashboard, { DashboardProgress } from './figma/Dashboard.jsx';
import Account, { ChangePassword } from './figma/Account.jsx';
import ForgotPassword from './figma/ForgotPassword.jsx';
import Signup from './figma/Signup.jsx';
import Checkout from './figma/Checkout.jsx';
import Success from './figma/Success.jsx';
import './styles.css';

const screens = { '/': Landing, '/landing': Landing, '/login': Login, '/dashboard': Dashboard, '/dashboard-progress': DashboardProgress, '/profile': Account, '/change-password': ChangePassword, '/forgot-password': ForgotPassword, '/signup': Signup, '/checkout': Checkout, '/success': Success };

function routePath(url) {
 const base = import.meta.env.BASE_URL;
 const pathname = new URL(url).pathname;
 return (base !== '/' && pathname.startsWith(base) ? '/' + pathname.slice(base.length) : pathname).toLowerCase().replace(/\/$/, '') || '/';
}
export default function App() { return <AuthProvider><PaymentProvider><AppContent /></PaymentProvider></AuthProvider>; }
function AppContent() {
  const {session, ready, error:sessionError} = useAuth();
  const payment=usePayment();
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

  const protectedPage = ['/dashboard','/dashboard-progress','/profile','/change-password','/checkout','/success'].includes(routePath(location));
  useEffect(() => { if(ready && protectedPage && !session) navigateTo('/login', true); }, [ready, protectedPage, session]);
  const requiresPayment=['/dashboard','/dashboard-progress','/success'].includes(routePath(location));
  const paymentPage=requiresPayment || routePath(location)==='/checkout';
  useEffect(()=>{
   if(!ready || !session || payment.status!=='ready')return;
   if(requiresPayment && !payment.unlocked)navigateTo('/checkout',true);
   else if(routePath(location)==='/checkout' && payment.unlocked)navigateTo('/dashboard',true);
  },[ready,session,payment.status,payment.unlocked,requiresPayment,location]);
  if (protectedPage && !ready) return <main className="account-page" role="status">Restoring your session…</main>;
  if (protectedPage && !session) return null;
  if (protectedPage && sessionError) return <main className="account-page"><p role="alert">{sessionError}</p><button className="btn btn-primary" onClick={()=>window.location.reload()}>Retry connection</button></main>;
  if(paymentPage && session && payment.status==='error')return <><Header/><main className="account-page"><section className="account-card"><h1>Unable to check payment status</h1><p role="alert">{payment.error}</p><p>Your account has not been charged by this check. Please retry to confirm access.</p><button className="btn btn-primary" onClick={()=>payment.refresh().catch(()=>{})}>Retry payment check</button></section></main></>;
  if(paymentPage && session && (payment.status!=='ready' || (requiresPayment && !payment.unlocked) || (routePath(location)==='/checkout'&&payment.unlocked)))return <><Header/><main className="account-page" role="status">Checking your registration payment…</main></>;
  const Screen = screens[routePath(location)] || Landing;
  return <div onClick={navigate}><Header dashboardHome={(routePath(location) === '/dashboard-progress' || sessionStorage.getItem('iwin-dashboard-preview') === '1') ? '/dashboard-progress' : '/dashboard'} key={new URL(location).pathname} /><Screen /></div>;
}
