import {DESIGN_PREVIEW_ENABLED} from '../payments/previewState.js';
import {useAuth, navigateTo} from '../auth/AuthContext.jsx';
import {usePayment} from '../payments/PaymentContext.jsx';
import {careerStartAction} from '../payments/accessFlow.js';
import React, {lazy, useEffect, useRef, useState} from 'react';
import Link from '../components/Link.jsx';
import './StudentDashboard.css';
import {useDevelopmentPreview,DashboardPreviewBar} from '../payments/DevelopmentPreview.jsx';
import {previewCompleted,previewCardState} from '../payments/previewState.js';
import StudentSidebar from '../components/StudentSidebar.jsx';
import {exampleSession,exampleEvent} from '../data/dashboardExamples.js';

const assets = import.meta.env.BASE_URL+'assets/';
const graphics = assets+'dashboard/';
const AssessmentPreviewGuidance=DESIGN_PREVIEW_ENABLED ? lazy(()=>import('../components/AssessmentPreviewGuidance.jsx')) : null;
const modules = [
  ['Career Interest','153f8.svg','#eef3ff','Explore what draws you in. About 100 questions across 16 career areas; your top three become starting points.'],
  ['Personal Data','8965f.svg','#fceff4','Build your unique profile: habits, hobbies, support, goals and context.'],
  ['Aptitude','48edf.svg','#f3efff','Discover how you reason, analyse patterns and solve problems. Find strengths and priorities for practice.'],
  ['Subject','6882b.svg','#fff4e9','Understand relevant subjects, concepts and learning gaps. Build a stronger foundation for future study.'],
  ['Communication','a8060.svg','#eaf6fc','Explore listening, clear expression and how you respond to real communication scenarios.'],
  ['Attitude','3e588.svg','#eaf8f2','Explore your habits, mindset and responses to everyday situations. Discover personal strengths and areas for growth.'],
];
const resources = [
  ['Explore Careers','Discover career domains, job roles and future opportunities.','Explore Careers','/career-explorer','dashboard/7c2a2.png','8bfbb.svg'],
  ['Courses & Colleges','Find suitable courses, eligibility, entrance exams and top colleges.','Search Courses & Colleges','/guidance-for-higher-studies','dashboard/05617.png','ef26b.svg'],
  ['Entrance Exams','Get information on JEE, NEET, CUET, SAT and other exams.','Explore Entrance Exams','/competitive-exam-preparation','dashboard/46678.png','36bca.svg'],
];


export default function Dashboard() {
  const {session} = useAuth();
  const payment = usePayment();
  const preview = useDevelopmentPreview();
  const completed = previewCompleted(preview.stage);
  const name = session?.identity || 'Student';
  const [starting,setStarting] = useState(false);
  const [error,setError] = useState('');
  const [dialogContent,setDialogContent] = useState(null);
  const dialog = useRef(null);
  const mounted = useRef(true);
  const busy = useRef(false);
  const autoOpened = useRef(false);
  const search = new URLSearchParams(window.location.search).get('q')?.trim().toLowerCase() || '';
  const visibleModules = modules.filter(([title,,,description])=>(title+' '+description).toLowerCase().includes(search));
  const visibleResources = resources.filter(([title,description])=>(title+' '+description).toLowerCase().includes(search));
  const showSkillsResult = Boolean(search && 'skills development programs ai business it digital marketing accounting finance'.includes(search));

  function showInfo(title,message) {setDialogContent({title,message});dialog.current?.showModal();}
  const openAssessment = () => showInfo('Career Interest Assessment','Your payment is confirmed. The question-taking screen is not connected in this frontend yet. Your assessment progress has not changed.');
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
  useEffect(()=>{
    if(new URLSearchParams(window.location.search).get('career')==='start' && payment.unlocked && !autoOpened.current) {
      autoOpened.current=true;openAssessment();
    }
  },[payment.unlocked]);
  function openPreviewAssessment(title) {
    if(title==='Career Interest'){navigateTo('/assessment/career-interest');return;}
    setDialogContent({title:title+' — design preview',message:'This previews assessment access only. No answers, results or completion will be sent to the backend.',career: title==='Career Interest' && preview.stage==='paid'});
    dialog.current?.showModal();
  }
  async function startCareer() {
    if(preview.stage){openPreviewAssessment('Career Interest');return;}
    if(busy.current)return;
    busy.current=true;setStarting(true);setError('');
    try {
      const current = await payment.refresh();
      if(!mounted.current)return;
      if(careerStartAction(current)==='checkout')navigateTo('/checkout');
      else openAssessment();
    } catch(error) {if(mounted.current)setError(error.message);}
    finally {busy.current=false;if(mounted.current)setStarting(false);}
  }

  return <div className="student-dashboard-shell">
    {DESIGN_PREVIEW_ENABLED && <DashboardPreviewBar/>}
    <StudentSidebar onReports={()=>showInfo('My Reports',completed===6?'Design preview only. No real reports or results have been generated.':'Your report unlocks after all six assessments are completed.')}/>
    <main id="main-content" className="student-dashboard-main"><div className="student-dashboard-center">
      <section className="student-welcome"><div><p>Welcome, {name}</p><h1>One student. One pathway.<br/>Your own pace.</h1><a href="#dashboard-assessments">Keep going →</a></div><img src={graphics+'0e600.png'} alt="Students exploring their future together"/><img className="student-buddy" src={graphics+'8ff9f.svg'} alt=""/></section>
      <section className="student-pathway" aria-labelledby="student-pathway-heading"><div><h2 id="student-pathway-heading">Your Career Pathway</h2><span>{completed===6?'All 6 completed':completed===1?'Stage 2 of 6':'Step 1 of 6'}</span></div><ol tabIndex={0} aria-label="Six stages of your career pathway">{[['Career','Explore possibilities'],['Personal','Know your strengths'],['Choose','Find your direction'],['Develop','Build capabilities'],['Prepare','Work towards goals'],['Succeed','Take the next step']].map(([label,description],index)=><li className={index<completed?'done':index===completed?'current':''} key={label}><span>{index<completed?'✓':index+1}</span><strong>{label}</strong><small>{description}</small></li>)}</ol><p className="student-pathway-hint">Swipe to explore all six stages →</p></section>
      {error && <p role="alert" className="student-start-error">Unable to check assessment access. {error} Please select Start to retry.</p>}
      {search && <p className="student-search-status" role="status">Results for “{search}” · <Link href="/dashboard">Clear search</Link></p>}
      <section id="dashboard-assessments" className="student-assessment-grid" aria-label="Your six assessments">{visibleModules.map(([title,icon,color,description])=>{const cardState=previewCardState(preview.stage,title);return <article className={'student-assessment-card'+(title==='Career Interest'?' available':'')} key={title}><div className="student-assessment-card-top" style={{background:color}}><img src={graphics+icon} alt=""/>{cardState==='completed'?<span className="student-assessment-completed">✓ Completed</span>:title==='Career Interest' || cardState==='available'?<button type="button" aria-label={'Start '+title+' assessment'} disabled={starting} onClick={()=>preview.stage?openPreviewAssessment(title):startCareer()}>{starting?'Checking…':'Start →'}</button>:DESIGN_PREVIEW_ENABLED && preview.stage==='paid'?<AssessmentPreviewGuidance assessment={title}/>:<span className="student-assessment-locked"><img src={graphics+'17c41.svg'} alt=""/>Locked</span>}</div><h2>{title}</h2><p>{description}</p></article>;})}</section>
      {search && !visibleModules.length && !visibleResources.length && !showSkillsResult && <p className="student-empty">No matching assessments or services. Try another search.</p>}
      {showSkillsResult && <Link className="student-search-result" href="/skills-development-programs">Skills Development Programs →</Link>}
      <Link className="student-counsellor-banner" href="/contact"><span aria-hidden="true"><img src={graphics+'44bfd.svg'} alt=""/></span><div><strong>Need a little guidance? Talk to a counsellor.</strong><p>Book a session with your career counsellor anytime.</p></div><b>Book Session →</b></Link>
      <section className="student-resource-grid" aria-label="Explore your options">{visibleResources.map(([title,description,label,href,image,icon],index)=><article className={'student-resource resource-'+index} key={title}><h2><span aria-hidden="true"><img src={graphics+icon} alt=""/></span>{title}</h2><p>{description}</p><img src={assets+image} alt="" loading="lazy"/><Link href={href}>{label} →</Link></article>)}</section>
    </div><aside className="student-dashboard-right" aria-label="Your profile and updates">
      <section className="student-profile-card"><div className="student-aside-heading"><h2>My Profile</h2><Link href="/profile">View Profile →</Link></div><div className="student-profile-summary"><span className="student-avatar">{name.charAt(0).toUpperCase()}</span><div><strong>{name}</strong><p>Student</p></div></div><div className="student-progress-label"><span>Overall Progress</span><strong>{completed}/6</strong></div><div className="student-progress-bar" role="progressbar" aria-label="Assessments completed" aria-valuemin={0} aria-valuemax={6} aria-valuenow={completed}><span style={{width:(completed/6*100)+'%'}}/></div><p className="student-report-note">{completed===6?'Demo report access · no real results':'Full report unlocks after 6/6'}</p></section>
      <section className="student-locked-panel"><h2><span aria-hidden="true"><img src={graphics+'562f3.svg'} alt=""/></span>My Reports</h2><p>View detailed assessment reports</p><span className="student-big-lock" aria-hidden="true">{completed===6?'✓':<img src={graphics+'f35c9.svg'} alt=""/>}</span><p>{completed===6?'Demo report access unlocked':'Unlocks after all 6 assessments'}</p><button type="button" onClick={()=>navigateTo('/reports'+(preview.stage==='complete'?'?preview=1':''))}>View Reports →</button></section>
      <section className="student-locked-panel student-careers-panel"><h2><span aria-hidden="true"><img src={graphics+'23c68.svg'} alt=""/></span>Top 5 Career Options</h2><p>Based on your profile</p><span className="student-big-lock" aria-hidden="true">{completed===6?'✓':<img src={graphics+'7c4f3.svg'} alt=""/>}</span><p>{completed===6?'Demo career options access unlocked':'Unlocks after all 6 assessments'}</p><button type="button" disabled={completed!==6} onClick={()=>showInfo('Career options — design preview','This previews access only. No personal career recommendations have been generated.')}>View My Top 5 Careers →</button></section>
      <section className="student-upcoming" aria-describedby="session-example-note"><h2><span aria-hidden="true"><img src={graphics+'0e320.svg'} alt=""/></span>Upcoming Sessions</h2><p id="session-example-note" className="student-example-label">Design example · not your booking</p><div className="student-session-state"><span>Booked</span><span><img src={graphics+'7c56e.svg'} alt=""/>Online</span></div><div className="student-session-details"><time className="student-session-date" dateTime={exampleSession.dateTime}><small>{exampleSession.month}</small><strong>{exampleSession.day}</strong></time><div><h3>{exampleSession.title}</h3><p>Career guidance<br/>• 1:1 session</p><p className="student-session-time"><img src={graphics+'8d25b.svg'} alt=""/>{exampleSession.time}</p></div></div><button type="button" onClick={()=>showInfo('Upcoming Sessions — design example','Discover your strengths · 7 November 2026, 4:00–4:45 PM IST. This is sample Figma content, not an actual booking. Contact our team to request a session.')}>View All →</button></section>
      <section id="dashboard-events" className="student-events" aria-describedby="event-example-note"><h2><span aria-hidden="true"><img src={graphics+'0e320.svg'} alt=""/></span>Events</h2><p id="event-example-note" className="student-example-label">Design example · not a live event</p><div className="student-webinar"><span>Live webinar</span><h3>{exampleEvent.title}</h3><p>{exampleEvent.date}</p></div><button type="button" onClick={()=>showInfo('Webinar — design example','Your future, your possibilities. · 14 November 2026, 11:00 AM IST. This is sample Figma content. There is no live joining link or registration associated with this example.')}>Join →</button></section>
    </aside></main>
    <dialog className="preview-dialog" ref={dialog} aria-labelledby="dashboard-dialog-title"><h2 id="dashboard-dialog-title">{dialogContent?.title}</h2><p>{dialogContent?.message}</p><button className="btn btn-primary" type="button" onClick={()=>dialog.current.close()}>Back to dashboard</button></dialog>
  </div>;
}

export function DashboardProgress() {return <Dashboard/>;}
