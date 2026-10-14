import Link from '../components/Link.jsx';
import React, { useRef, useState } from 'react';
import StudentArtwork from '../components/StudentArtwork.jsx';
import Footer from '../components/Footer.jsx';

const assets = (import.meta.env.BASE_URL + 'assets/landing/');
const stages = [
  ['Discover', 'Your interests, habits and ambitions'], ['Assess', 'Six perspectives on your potential'],
  ['Choose', 'Explore suitable directions'], ['Develop', 'Build your capabilities'],
  ['Prepare', 'Study, practise and plan ahead'], ['Succeed', 'Take your next informed step'],
];
const stageDetails = [
  ['Discover your possibilities', 'Explore careers, interests and aspirations. Learn what different careers involve and begin to imagine a future that feels right for you.', 'A clearer picture of your interests and goals.'],
  ['Assess your strengths', 'Explore your interests, aptitude, attitude, subject knowledge and communication through six assessments. Understand your strengths and the areas you can develop.', 'A personal profile to guide your next decisions.'],
  ['Choose your direction', 'Connect your assessment insights with suitable careers, subjects and study pathways. Explore your options with guidance and make an informed choice.', 'A direction that fits your strengths and aspirations.'],
  ['Develop your capabilities', 'Build the skills, habits, confidence and knowledge that support your chosen direction through learning, practice and mentoring.', 'A development plan focused on what you need next.'],
  ['Prepare for your future', 'Plan your studies, strengthen subject knowledge and practise for relevant exams. Explore courses and higher study options aligned with your goals.', 'A practical plan for your next education and career steps.'],
  ['Succeed with confidence', 'Put your learning into practice and take your next informed step. Review your progress, celebrate your growth and keep developing as your goals evolve.', 'The confidence and capabilities to move forward.'],
];
const perspectives = [
  ['Interests & aspirations', 'What do they enjoy? What do they want to become?'],
  ['Attitude & personality', 'Which habits and personal strengths can help them grow?'],
  ['Aptitude & capabilities', 'Where do their abilities shine, and what can they develop?'],
  ['Academic strengths', 'Which subjects support their future goals?'],
];
const services = [
  ['Student Profiling', 'Build your unique profile. Explore your interests, daily life, passions and goals to support personalised career guidance.'],
  ['Career Interest Assessment', 'Explore 16 career domains through approximately 100 questions and discover your top three areas of interest.'],
  ['Personality & Attitudinal Development', 'Explore 25 attitudinal traits and build positive habits through case studies, mentoring, games and guided reflection.'],
  ['Aptitude Assessment & Development', 'Discover your aptitude strengths and develop relevant skills through structured instruction and extensive practice.'],
  ['Subject Knowledge Assessment & Improvement', 'Identify learning gaps and strengthen concepts through self-study, self-assessments, AI-based doubt clearing and mentoring.'],
  ['Career Guidance', 'Explore suitable careers based on interests, personality, aptitude and capabilities. Make informed subject and stream choices.'],
  ['Personal Development', 'Build confidence, positive attitudes, values, communication and life skills through guided development.'],
  ['Academic Preparation', 'Strengthen concepts and subject knowledge, with learning support aligned to the student’s career goals.'],
  ['Competitive Exam Preparation', 'Prepare systematically with learning resources, extensive practice, mock tests and mentoring.'],
  ['Skills Development Programs', 'Build practical abilities in AI applications, business IT, digital marketing, accounting and finance applications.'],
  ['Guidance for Higher Studies', 'Explore suitable courses, colleges and universities in India and overseas, including international study pathways.'],
];

const serviceDetails = [["Students beginning their career discovery journey.",["Reflect on interests, ambitions and everyday experiences.","Create a starting point for personalised guidance."]],["Students exploring career areas and subject choices.",["Explore interests across 16 career domains.","Use your strongest interest areas to begin a guidance conversation."]],["Students who want to strengthen habits, confidence and self-awareness.",["Explore attitudinal traits and personal strengths.","Develop positive habits through reflection, activities and mentoring."]],["Students discovering and developing their aptitude strengths.",["Identify abilities that support different career pathways.","Build relevant skills through instruction and practice."]],["Students who want to understand and improve subject knowledge.",["Identify gaps in concepts and understanding.","Strengthen learning through study, practice and mentoring."]],["Students and families making education or career decisions.",["Connect interests and capabilities with suitable career options.","Discuss subjects, streams and pathways with a counsellor."]],["Students building confidence and skills for everyday life.",["Develop communication, values and positive attitudes.","Practise life skills through guided activities."]],["Students planning studies around their future goals.",["Strengthen concepts and subject understanding.","Organise learning support around a practical study plan."]],["Students preparing for relevant competitive examinations.",["Plan preparation around the examination and student’s needs.","Practise with learning resources, mock tests and mentoring."]],["Learners seeking practical skills for study and work.",["Explore programmes in AI, business IT, digital marketing and finance applications.","Develop practical abilities through learning and application."]],["Students considering courses and colleges in India or overseas.",["Explore suitable courses, institutions and study pathways.","Discuss options that align with interests and future goals."]]];

export default function Landing() {
  const [selectedService, setSelectedService] = useState(null);
  const serviceDialog = useRef(null);
  function openService(index) { setSelectedService(index); serviceDialog.current.showModal(); }
  const [activeStage, setActiveStage] = useState(0);
  const [detailTitle, detailDescription, nextStep] = stageDetails[activeStage];
  return <>
    <main id="main-content" className="landing-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">The I-WIN Student Pathway Program</p>
              <h1>There’s a future that feels like you.</h1>
              <h2>Let’s discover it together.</h2>
              <p className="hero-promise">Discover strengths. Choose the right career. Build the capabilities to succeed.</p>
              <p className="muted">Your interests, abilities and ambitions are uniquely yours. Six friendly assessments help you understand yourself, explore suitable careers and know what to develop next.</p>
              <div className="button-row"><Link className="btn btn-primary" href="/checkout">Start Assessment · ₹500 ↗</Link><Link className="btn btn-outline" href="#contact">Enquire about career Assessments</Link></div>
            </div>
            <div className="hero-story">
              <img className="photo" src={assets + '0e600.png'} alt="Two students exploring career possibilities together" />
              <div className="interest-sticker"><strong>A little curiosity. A big future.</strong><span>Create&nbsp; Explore</span></div>
              <div className="discovery-badge"><img src={assets + 'a1ff7.svg'} alt="" /></div>
              <div className="report-teaser"><strong>Not a score to live up to.</strong><p>A map of strengths to grow into.</p><div className="mini-chart" aria-hidden="true"><span /><span /><span /></div></div>
            </div>
          </div>
          <div className="reassurance-strip">
            {[[assets+'70642.svg', '16 career areas to explore'], [assets+'01db1.svg', 'Strengths, not labels'], [assets+'e5b69.svg', 'One student. One pathway. One success plan.']].map(([icon, text]) => <div key={text}><img src={icon} alt="" /><span>{text}</span></div>)}
          </div>
        </div>
      </section>

      <section id="pathway" className="pathway-section section-pad">
        <div className="container"><p className="eyebrow">The big picture</p><h2>A pathway, not a one-off test.</h2><p>These six broad stages connect your discovery to your future. They’re the pathway—not the six assessment names.</p>
          <ol className="pathway-grid">{stages.map(([title, description], index) => <li key={title}><button type="button" className="stage-card" aria-pressed={activeStage === index} aria-controls="pathway-details" onClick={() => setActiveStage(index)}><span className="stage-number">{String(index+1).padStart(2,'0')}</span><span className="stage-title">{title}</span><span className="stage-description">{description}</span></button></li>)}</ol>
        </div>
      </section>
      <div className="container"><aside id="pathway-details" className="discovery-callout" aria-live="polite" aria-atomic="true"><h3>{detailTitle}</h3><div><p>{detailDescription}</p><strong>Your next step: {nextStep}</strong></div></aside></div>

      <section className="section-pad parent-section"><div className="container two-column parent-grid"><StudentArtwork /><div><h2>A future that begins with understanding your child.</h2><ol className="perspective-list">{perspectives.map(([title, description], index) => <li key={title}><span>{index+1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></div></section>

      <section id="assessments" className="section-pad"><div className="container report-grid">
        <article className="sample-report"><p className="eyebrow">Sample report · illustrative results</p><h2>Meet your strengths.<br />Find your next move.</h2><div className="report-identity"><h3>Ananya’s discovery map</h3><span>6/6 complete</span></div>
          <div className="interest-signals">{[['Computing, AI & Digital', 63], ['Creative Arts, Architecture & Design', 55], ['Engineering & Technology', 48]].map(([label, width]) => <div key={label}><p>{label}</p><div className="progress-track"><span style={{width: `${width}%`}} /></div></div>)}</div>
          <p className="fine-print">Relative interest signals—not percentiles or admission probabilities.</p><div className="report-adventure"><h3>Your next small adventure</h3><p>Build a simple app, explain it to a friend, and reflect on what you enjoyed.</p></div>
        </article>
        <article className="pricing-card"><p className="eyebrow">Phase 1 · Complete discovery bundle</p><h2>Six perspectives.<br />One clearer picture.</h2><p>Career Interest, Aptitude, Attitude, Subject, Communication and Personal Data. Your comprehensive report unlocks after 6/6 are complete.</p><p className="fine-print">No subscription. No separate module charges. Phase 2 training is not included.</p><div className="price"><strong>₹500</strong><span>One-time · all six assessments</span></div><Link className="btn btn-white full-width" href="/checkout">Start Assessment ↗</Link><p className="fine-print">Pay once, then explore at your pace.</p></article>
      </div></section>

      <section className="section-pad"><div className="container"><p className="eyebrow">Real students, wider possibilities</p><h2>Clarity can sound like this.</h2><div className="stories-grid">
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e4100.png'} alt="Student reflecting on her interests in a library" /></div><blockquote>“I stopped asking ‘Which stream is best?’ and started asking what kind of work keeps me curious.”</blockquote><figcaption>Meher · Class 11 · Jaipur</figcaption></figure>
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e05af.png'} alt="A parent and student discussing their future together" /></div><blockquote>“My family and I finally had a calm conversation. The report gave us shared language, not a final answer.”</blockquote><figcaption>Ayesha · Class 12 · Kochi</figcaption></figure>
      </div></div></section>

      <section id="services" className="section-pad"><div className="container"><h2>Guidance that leads to growth.</h2><p className="section-description">We connect career guidance with personal development, learning and preparation—so students can turn a suitable career choice into a practical plan.</p><div className="services-grid">{services.map(([title, description], index) => <article className="service-card" key={title}><h3><span aria-hidden="true">✦</span> {title}</h3><p>{description}</p><button type="button" className="text-button service-explore" aria-label={`Explore ${title}`} onClick={() => openService(index)}>Explore ↗</button></article>)}</div><Link className="btn btn-blue" href="#contact">Enquire about training ↗</Link></div></section>

      <section id="contact" className="contact-section section-pad"><div className="container"><div className="contact-heading"><img src={assets+'b0d19.svg'} alt="" /><h2>The right path starts<br />with the right conversation</h2></div><p>Tell us about your child’s class, interests and goals. Explore how I-WIN’s assessments, guidance and development support can help them take the next step.</p><div className="button-row"><Link className="btn btn-white" href="mailto:sivaram@i-winlearning.com?subject=Career%20assessment%20enquiry">Enquire about career Assessments</Link><Link className="btn btn-blue" href="tel:+919848052547">Call a Career Counsellor</Link></div></div></section>

      <section id="schools" className="schools-section section-pad"><div className="container"><p className="eyebrow">For CBSE-affiliated schools</p><h2>Career guidance is a priority.<br />I-WIN helps schools put it into practice.</h2><p>CBSE Circular No. 02/2026, dated 19 January 2026, requires CBSE-affiliated schools to appoint one Career Counsellor for every 500 students enrolled in Classes IX–XII.</p><article className="school-support"><div><p className="eyebrow">Support for your school</p><h3>Working alongside your Career Counsellor</h3></div><div><p>I-WIN supports school career counsellors with student profiling, career interest assessments, insights into aptitude and attitudinal traits, and guidance on suitable education and career pathways.</p><p>Together, we help students and parents understand their options and make informed decisions about subjects, courses and future careers.</p></div></article><Link className="btn btn-blue" href="mailto:sivaram@i-winlearning.com?subject=School%20support%20enquiry">Discuss Support for Your School</Link></div></section>

      <section id="certifications" className="section-pad"><div className="container two-column certificate-grid"><div><p className="eyebrow">Show what you can do</p><h2>A certificate you grow into.</h2><ol className="certificate-steps">{[['Learn', 'Personalised instruction and mentoring'], ['Practise', 'Activities, application and useful feedback'], ['Demonstrate', 'Competency assessment against programme requirements'], ['Celebrate', 'I-WIN Certificate of Competence when requirements are demonstrated']].map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol></div><article className="certificate-preview"><p className="certificate-brand">I-WIN <small>Certificate preview</small></p><img src={assets+'44f71.svg'} alt="" /><h3>Certificate of Competence</h3><strong>Your name here</strong><p>Awarded for a completed programme with demonstrated required skills.</p><small>Learning → Practice → Competency assessment → Certificate<br />I-WIN Learning Solutions Private Limited</small></article></div></section>
    </main>
    <dialog ref={serviceDialog} className="preview-dialog service-dialog" aria-labelledby="service-dialog-title" onClick={event => { if (event.target === event.currentTarget) serviceDialog.current.close(); }}>
      {selectedService !== null && <>
        <div className="service-dialog-heading"><p className="eyebrow">I-WIN services</p><button type="button" className="text-button" aria-label="Close service details" onClick={() => serviceDialog.current.close()}>✕</button></div>
        <h2 id="service-dialog-title">{services[selectedService][0]}</h2>
        <p>{services[selectedService][1]}</p>
        <h3>Who it helps</h3><p>{serviceDetails[selectedService][0]}</p>
        <h3>What you can explore</h3><ul>{serviceDetails[selectedService][1].map(item => <li key={item}>{item}</li>)}</ul>
        <p>Contact our team to discuss your goals, programme availability and the right next step.</p>
        <div className="dialog-actions"><button type="button" className="btn btn-outline" onClick={() => serviceDialog.current.close()}>Close</button><Link className="btn btn-primary" href="#contact" onClick={() => serviceDialog.current.close()}>Enquire about this service ↗</Link></div>
      </>}
    </dialog>
    <Footer />
  </>;
}
