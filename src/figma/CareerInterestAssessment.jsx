import React from 'react';
import Link from '../components/Link.jsx';
import Footer from '../components/Footer.jsx';
import './CareerInterestAssessment.css';

const enquiry = 'mailto:support@i-winlearning.com?subject=Career%20Interest%20Assessment%20enquiry';
const steps = [
  ['01 / Respond', 'Explore your preferences', 'Answer approximately 100 questions about activities, situations and choices. Your honest responses help us understand what interests you.'],
  ['02 / Discover', 'See your strongest interests', 'Your responses are mapped across 16 career domains. The three domains showing your highest interests are highlighted for further exploration.'],
  ['03 / Discuss', 'Understand your results', 'The findings are shared with you and your parents to support informed conversations about your career direction and next steps.'],
];

export default function CareerInterestAssessment() {
  return <div className="career-interest-page">
    <main id="main-content">
      <section className="career-interest-hero">
        <div className="career-interest-container">
          <nav className="career-interest-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span><Link href="/#services">Our Services</Link><span> / </span><span aria-current="page">Career Interest Assessment</span></nav>
          <div className="career-interest-intro">
            <div><p className="career-interest-eyebrow">Career Interest Assessment / Phase 1 Assessments</p><h1>Career Interest Assessment</h1><p className="career-interest-lead">Discover the career areas that interest you most.</p><p>What do you enjoy doing? Which activities draw your attention? Our structured assessment helps you explore your career preferences and identify areas you would like to pursue.</p></div>
            <img className="career-interest-photo" src={import.meta.env.BASE_URL+'assets/landing/0e600.png'} alt="Two students exploring career interests together" width="1024" height="1024" fetchPriority="high"/>
          </div>
          <dl className="career-interest-stats">{[['About 100','Carefully designed questions'],['16','Career domains explored'],['Top 3','Interest domains highlighted']].map(([value,label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
        </div>
      </section>
      <section className="career-interest-how career-interest-container" aria-labelledby="career-how-heading">
        <p className="career-interest-eyebrow">How it works</p><h2 id="career-how-heading">Turn your interests into a starting point.</h2>
        <div className="career-interest-steps">{steps.map(([label,title,description]) => <article key={title}><p className="career-interest-eyebrow">{label}</p><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="career-interest-direction" aria-labelledby="career-direction-heading"><div className="career-interest-container">
        <p className="career-interest-eyebrow">Connecting interests with your future</p>
        <div className="career-interest-direction-content"><svg className="career-interest-compass" width="132" height="132" viewBox="0 0 132 132" fill="none" aria-hidden="true"><path d="M27 65 8 52M105 65l19-20" stroke="#4266FF" strokeWidth="9" strokeLinecap="round"/><path d="m50 108-9 17H24m59-17 9 17h16" stroke="#11175C" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/><circle cx="66" cy="65" r="49" fill="#4266FF"/><circle cx="66" cy="65" r="38" fill="white"/><path d="m66 31 20 33-20-8-20 8 20-33Z" fill="#FFE249"/><path d="m66 99 20-33-20 8-20-8 20 33Z" fill="#FFE249"/><circle cx="55" cy="63" r="3" fill="#282F87"/><circle cx="77" cy="63" r="3" fill="#282F87"/><path d="M57 76q9 10 18 0" stroke="#282F87" strokeWidth="3" strokeLinecap="round"/></svg><div><h2 id="career-direction-heading">Explore a direction that reflects you.</h2><p>We consider your leading interest domains alongside your passions and career goals. This helps us explore pathways that connect with what you enjoy and what you hope to achieve.</p><p>Your aptitude, attitudinal traits and subject knowledge provide further insight into how these pathways may suit you and which capabilities you need to develop.</p><p><strong>Your top three domains indicate interest. They are a starting point for career exploration, rather than a final career decision.</strong></p></div></div>
      </div></section>
      <section className="career-interest-yourself career-interest-container" aria-labelledby="career-yourself-heading"><p className="career-interest-eyebrow">Be yourself</p><h2 id="career-yourself-heading">There are no right or wrong answers.</h2><p>Answer according to what you genuinely enjoy, rather than what others expect. The aim is to understand your preferences and help you explore your future with greater clarity.</p><div className="career-interest-actions"><a className="btn btn-primary" href={enquiry}>Enquire About the Assessment</a><Link className="btn btn-outline" href="/#assessments">Explore Phase-1 Assessments</Link></div></section>
      <section className="career-interest-schools" aria-labelledby="career-school-heading"><div className="career-interest-container">
        <p className="career-interest-eyebrow">For CBSE-affiliated schools</p><h2 id="career-school-heading">Career guidance is a priority.<br/>I-WIN helps schools put it into practice.</h2><p>CBSE Circular No. 02/2026, dated 19 January 2026, requires CBSE-affiliated schools to appoint one Career Counsellor for every 500 students enrolled in Classes IX–XII.</p>
        <article className="career-interest-school-support"><div><p className="career-interest-eyebrow">Support for your school</p><h3>Working alongside your<br/>Career Counsellor</h3></div><div><p>I-WIN supports school career counsellors with student profiling, career interest assessments, insights into aptitude and attitudinal traits, and guidance on suitable education and career pathways.</p><p>Together, we help students and parents understand their options and make informed decisions about subjects, courses and future careers.</p></div></article>
        <div className="career-interest-actions"><a className="btn btn-primary" href="mailto:support@i-winlearning.com?subject=School%20support%20enquiry">Discuss Support for Your School</a><a className="btn btn-outline" href={import.meta.env.BASE_URL+'assets/landing-v1/cbse-circular.pdf'} target="_blank" rel="noopener noreferrer">Read the CBSE Circular</a></div>
      </div></section>
    </main>
    <Footer/>
  </div>;
}
