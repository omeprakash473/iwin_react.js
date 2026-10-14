import Link from '../components/Link.jsx';
import React, { useState } from 'react';

const modules = [
  ['Career Interest', '153f8.svg', 'blue', 'Explore what draws you in. About 100 questions across 16 career areas; your top three become starting points.'],
  ['Aptitude', '48edf.svg', 'purple', 'Discover how you reason, analyse patterns and solve problems. Find strengths and priorities for practice.'],
  ['Attitude', '3e588.svg', 'green', 'Discover how you reason, analyse patterns and solve problems. Find strengths and priorities for practice.'],
  ['Subject', '6882b.svg', 'orange', 'Understand relevant subjects, concepts and learning gaps. Build a stronger foundation for future study.'],
  ['Communication', 'a8060.svg', 'cyan', 'Explore listening, clear expression and how you respond to real communication scenarios.'],
  ['Personal Data', '8965f.svg', 'pink', 'Build your unique profile: habits, hobbies, support, goals and context.'],
];

export default function Success() {
  const [notice, setNotice] = useState('');
  return <main id="main-content" className="success-page section-pad"><div className="container success-container"><div className="success-main">
    <div className="success-heading"><img src={(import.meta.env.BASE_URL + "assets/success/66ac3.svg")} alt="" /><p className="eyebrow">Payment successful</p><h1>You’re in. Let’s explore!</h1><p className="receipt">₹500 paid · Phase 1 complete bundle · Sample receipt IWIN-261010</p><p>All six modules are now available. Choose a starting point and pause whenever you need.</p></div>
    <div className="modules-grid">{modules.map(([title, icon, color, description], index) => <article className={'module-card '+(index===0 ? 'available' : '')} key={title}><div className={'module-top '+color}><img src={(import.meta.env.BASE_URL + 'assets/success/')+icon} alt="" />{index===0 ? <button className="text-button" onClick={() => setNotice('The assessment screens are not included in this website preview.')}>Start this step →</button> : <span className="locked"><img src={(import.meta.env.BASE_URL + "assets/success/17c41.svg")} alt="" />Locked</span>}</div><h2>{title}</h2><p>{description}</p></article>)}</div>
    {notice && <p className="notice" role="status">{notice}</p>}
    <aside className="report-notice"><h2>Your report is waiting at the end of discovery</h2><p>Complete Career Interest, Aptitude, Attitude, Subject, Communication and Personal Data to unlock your comprehensive report. This is not pass/fail.</p></aside>
  </div><aside className="guidance-tip"><div><h2>Need a little guidance?</h2><img src={(import.meta.env.BASE_URL + "assets/success/4ba20.svg")} alt="" /></div><Link href="tel:+919848052547">Talk to a counsellor →</Link></aside></div></main>;
}
