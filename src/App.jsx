import {PaymentProvider,usePayment} from './payments/PaymentContext.jsx';
import {routeRequiresPayment} from './payments/accessFlow.js';
import { AuthProvider, useAuth, navigateTo } from './auth/AuthContext.jsx';
import React, { Suspense, lazy, useEffect, useLayoutEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Landing from './figma/Landing.jsx';
import Success from './figma/Success.jsx';
import PaymentReturn from './figma/PaymentReturn.jsx';
import './styles.css';
import './landing-v1.css';
import {DevelopmentPreviewProvider} from './payments/DevelopmentPreview.jsx';

const AssessmentService=lazy(()=>import('./figma/AssessmentService.jsx'));
const SkillsDevelopment=lazy(()=>import('./figma/SkillsDevelopment.jsx'));
const GuidanceService=lazy(()=>import('./figma/GuidanceService.jsx'));
const serviceScreens = { '/career-guidance':()=> <GuidanceService service="career"/>, '/competitive-exam-preparation':()=> <GuidanceService service="exams"/>, '/guidance-for-higher-studies':()=> <GuidanceService service="studies"/>, '/personality-assessment':()=> <AssessmentService assessment="personality"/>, '/aptitude-assessment-development':()=> <AssessmentService assessment="aptitude"/>, '/subject-knowledge-assessment':()=> <AssessmentService assessment="subject"/>, '/student-profile':()=> <AssessmentService assessment="student"/>, '/communication-assessment':()=> <AssessmentService assessment="communication"/>, '/skills-development-programs':SkillsDevelopment };
const CareerInterestAssessment=lazy(()=>import('./figma/CareerInterestAssessment.jsx'));
const AboutUs=lazy(()=>import('./figma/AboutUs.jsx'));
const PrivacyPolicy=lazy(()=>import('./figma/PrivacyPolicy.jsx'));
const ParentsConcerns=lazy(()=>import('./figma/ParentsConcerns.jsx'));
const Contact=lazy(()=>import('./figma/Contact.jsx'));
const LegalPage=lazy(()=>import('./figma/LegalPages.jsx').then(module=>({default:module.LegalPage})));
const CookiePolicy=lazy(()=>import('./figma/CookiePolicy.jsx'));
const RefundPolicy=lazy(()=>import('./figma/RefundPolicy.jsx'));
const Faqs=lazy(()=>import('./figma/Faqs.jsx'));
const StudentAssessmentDisclaimer=lazy(()=>import('./figma/StudentAssessmentDisclaimer.jsx'));
const Login=lazy(()=>import('./figma/Login.jsx'));
const Dashboard=lazy(()=>import('./figma/Dashboard.jsx'));
const DashboardProgress=lazy(()=>import('./figma/Dashboard.jsx').then(module=>({default:module.DashboardProgress})));
const Account=lazy(()=>import('./figma/Account.jsx'));
const ChangePassword=lazy(()=>import('./figma/Account.jsx').then(module=>({default:module.ChangePassword})));
const ForgotPassword=lazy(()=>import('./figma/ForgotPassword.jsx'));
const Signup=lazy(()=>import('./figma/Signup.jsx'));
const Checkout=lazy(()=>import('./figma/Checkout.jsx'));
const CareerInterestPreview=import.meta.env.DEV ? lazy(()=>import('./figma/CareerInterestPreview.jsx')) : null;

const screens = { ...(import.meta.env.DEV ? {'/assessment/career-interest':CareerInterestPreview} : {}), ...serviceScreens, '/career-interest-assessment':CareerInterestAssessment, '/about-us':AboutUs, '/about':AboutUs, '/parents-concerns':ParentsConcerns, '/parents':ParentsConcerns, '/terms-and-conditions':()=> <LegalPage page="terms"/>, '/contact':Contact, '/contact-us':Contact, '/cookie-policy':CookiePolicy, '/refund-policy':RefundPolicy, '/faqs':Faqs, '/student-assessment-disclaimer':StudentAssessmentDisclaimer, '/terms-of-services':()=> <LegalPage page="terms"/>, '/privacy-policy':PrivacyPolicy, '/school-agreement':()=> <LegalPage page="school"/>, '/': Landing, '/landing': Landing, '/login': Login, '/dashboard': Dashboard, '/dashboard-progress': DashboardProgress, '/profile': Account, '/change-password': ChangePassword, '/forgot-password': ForgotPassword, '/signup': Signup, '/checkout': Checkout, '/success': Success, '/payment/return': PaymentReturn };

function routePath(url) {
 const base = import.meta.env.BASE_URL;
 const pathname = new URL(url).pathname;
 return (base !== '/' && pathname.startsWith(base) ? '/' + pathname.slice(base.length) : pathname).toLowerCase().replace(/\/$/, '') || '/';
}
export default function App() { return <AuthProvider><PaymentProvider>{import.meta.env.DEV ? <DevelopmentPreviewProvider><AppContent /></DevelopmentPreviewProvider> : <AppContent />}</PaymentProvider></AuthProvider>; }
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

  const protectedPage = ['/dashboard','/dashboard-progress','/profile','/change-password','/checkout','/success','/assessment/career-interest'].includes(routePath(location));
  useEffect(() => { if(ready && protectedPage && !session) navigateTo('/login', true); }, [ready, protectedPage, session]);
  const requiresPayment=routeRequiresPayment(routePath(location));
  const paymentPage=requiresPayment || routePath(location)==='/checkout';
  useEffect(()=>{
   if(!ready || !session || payment.status!=='ready')return;
   if(requiresPayment && !payment.unlocked)navigateTo('/checkout',true);
   else if(routePath(location)==='/checkout' && payment.unlocked)navigateTo('/dashboard?career=start',true);
  },[ready,session,payment.status,payment.unlocked,requiresPayment,location]);
  if (protectedPage && !ready) return <main className="account-page" role="status">Restoring your session…</main>;
  if (protectedPage && !session) return null;
  if (protectedPage && sessionError) return <main className="account-page"><p role="alert">{sessionError}</p><button className="btn btn-primary" onClick={()=>window.location.reload()}>Retry connection</button></main>;
  if(paymentPage && session && payment.status==='error')return <><Header/><main className="account-page"><section className="account-card"><h1>Unable to check payment status</h1><p role="alert">{payment.error}</p><p>Your account has not been charged by this check. Please retry to confirm access.</p><button className="btn btn-primary" onClick={()=>payment.refresh().catch(()=>{})}>Retry payment check</button></section></main></>;
  if(paymentPage && session && (payment.status!=='ready' || (requiresPayment && !payment.unlocked) || (routePath(location)==='/checkout'&&payment.unlocked)))return <><Header/><main className="account-page" role="status">Checking your registration payment…</main></>;
  const Screen = screens[routePath(location)] || Landing;
  const careerExplorer = routePath(location)==='/career-guidance';
  return <div onClick={navigate}><Header careerExplorer={careerExplorer} studentDashboard={careerExplorer || ['/dashboard','/dashboard-progress','/assessment/career-interest'].includes(routePath(location))} searchAction={careerExplorer?'/career-guidance':'/dashboard'} landing={Screen === Landing || Screen === CareerInterestAssessment || Boolean(serviceScreens[routePath(location)]) || ['/contact','/contact-us','/about-us','/about','/parents-concerns','/parents','/terms-and-conditions','/terms-of-services','/privacy-policy','/refund-policy','/cookie-policy','/faqs','/school-agreement','/student-assessment-disclaimer'].includes(routePath(location))} dashboardHome="/dashboard" key={new URL(location).pathname} /><Suspense fallback={<main id="main-content" className="account-page" role="status">Loading page…</main>}><Screen /></Suspense></div>;
}
