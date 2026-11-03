import Link from '../components/Link.jsx';
import React, { useRef, useState } from 'react';
import Footer from '../components/Footer.jsx';
import {faqCategories} from './Faqs.jsx';
const updatedAssets = import.meta.env.BASE_URL + 'assets/landing-v1/';
const enquiry = 'mailto:support@i-winlearning.com?subject=Career%20assessment%20enquiry';

const allFaqs = faqCategories.flatMap(([, questions]) => questions.map(([question, answer]) => ({question, answer})));
const faqPageSize = 5;

const assets = (import.meta.env.BASE_URL + 'assets/landing/');
const parentQuestions = [
  ['Is my child academically strong enough?', 'Subject assessments can identify knowledge gaps, followed by targeted learning resources and progress monitoring.'],
  ['What is my child really good at?', 'Career interest, aptitude and attitudinal assessments help identify strengths beyond examination marks.'],
  ['Which career is right for my child?', 'Career-fit analysis considers interests, aptitude, personality attributes and academic competencies to suggest suitable career pathways.'],
  ['Is my child choosing a career under peer pressure?', 'Assessments and counselling can help distinguish personal interests from external influences.'],
  ['Will my child succeed in JEE, NEET, CUET or other examinations?', 'Structured preparation, practice tests, mock examinations and performance analytics can support exam readiness, without guaranteeing results.'],
  ['My child studies hard but does not get good marks. Why?', 'Learning assessments can help identify conceptual weaknesses and areas that may need additional practice.'],
  ['My child lacks confidence or communication skills. What can help?', 'Attitudinal and communication assessments can identify development priorities and guide improvement activities.'],
  ['My child spends too much time on the mobile phone. What can I do?', 'Structured digital learning assignments and progress dashboards can encourage more purposeful screen time.'],
  ["How can I monitor my child's progress?", 'Parent dashboards can provide visibility into learning progress, assessment outcomes and areas needing attention.'],
  ['Are we spending money on the right coaching and tuition?', 'Gap-based recommendations can help families prioritise educational support rather than relying only on generalised coaching.'],
  ['What if my child does not qualify for NEET or JEE?', "Career guidance can introduce alternative courses, professional pathways and institutions aligned with the student's profile."],
  ['Will my child get a good job and become financially independent?', 'Early career awareness, capability development and educational planning can help students prepare for future opportunities, without guaranteeing employment.'],
  ["We want the best for our child, but don't know which courses, skills and careers will be relevant.", 'I-WIN provides career information, educational pathways and guidance as the student progresses.'],
  ['My child already goes to tuition. Why do we need I-WIN?', 'Tuition primarily addresses subject learning. I-WIN also assesses interests, aptitude, personal development and career fit, while supporting academics.'],
  ['Can you guarantee better marks?', 'No marks can be guaranteed. I-WIN can help identify learning gaps, recommend targeted practice and measure progress.'],
  ["Will this increase my child's workload?", 'The program is intended to complement existing studies through prioritised, manageable learning activities.'],
  ['Will the assessment label my child as weak?', 'No. Reports should describe strengths and developmental opportunities, not permanently label or restrict a child.'],
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
  const [faqSearch, setFaqSearch] = useState('');
  const [faqPage, setFaqPage] = useState(0);
  const searchTerm = faqSearch.trim().toLocaleLowerCase();
  const matchingFaqs = allFaqs.filter(({question, answer}) => `${question} ${Array.isArray(answer) ? answer.join(' ') : answer}`.toLocaleLowerCase().includes(searchTerm));
  const faqPageCount = Math.max(1, Math.ceil(matchingFaqs.length / faqPageSize));
  const visibleFaqs = matchingFaqs.slice(faqPage * faqPageSize, (faqPage + 1) * faqPageSize);
  const [circularPage, setCircularPage] = useState(0);
  const circularPageCount = 3;
  const [parentQuestionPage, setParentQuestionPage] = useState(0);
  const parentQuestionsPerPage = 5;
  const parentQuestionPageCount = Math.ceil(parentQuestions.length / parentQuestionsPerPage);
  const visibleParentQuestions = parentQuestions.slice(parentQuestionPage * parentQuestionsPerPage, (parentQuestionPage + 1) * parentQuestionsPerPage);
  const [selectedService, setSelectedService] = useState(null);
  const serviceDialog = useRef(null);
  function openService(index) { setSelectedService(index); serviceDialog.current.showModal(); }
  return <>
    <main id="main-content" className="landing-page landing-v1">
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">The I-WIN Student Pathway Program</p>
              <h1>Discover your future.</h1>
              <p className="hero-promise">Discover strengths. Choose the right career. Build the capabilities to succeed.</p>
              <p className="muted">Your interests, abilities and ambitions are uniquely yours. Six friendly assessments help you understand yourself, explore suitable careers and know what to develop next.</p>
              <div className="button-row"><Link className="btn btn-outline" href={enquiry}>Enquire about career Assessments</Link></div>
            </div>
            <div className="hero-story">
              <img className="photo" src={assets + '0e600.png'} width="1024" height="1024" loading="eager" fetchPriority="high" decoding="async" alt="Two students exploring career possibilities together" />
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

      <section id="services" className="section-pad services-section"><div className="container"><h2>Guidance that leads to growth.</h2><p className="section-description">We connect career guidance with personal development, learning and preparation — so students can turn a suitable career choice into a practical plan.</p><div className="services-grid">{[1,0,2,3,4,5,8,9,10].map(index => { const [title, description] = services[index]; return <article id={index === 1 ? "assessments" : undefined} className="service-card" key={title}><h3><span aria-hidden="true">✦</span> {index === 9 ? <>Skills Development<br/>Programs</> : title}</h3><p>{description}</p><button type="button" className="text-button service-explore" aria-label={`Explore ${title}`} onClick={() => openService(index)}>Explore</button></article>; })}</div><Link className="btn btn-blue" href={enquiry}>Enquire about training ↗</Link></div></section>

      <section id="pathway" className="section-pad parent-section"><span id="parents" className="anchor-target"/><div className="container two-column parent-grid"><img className="parent-questions-image" src={updatedAssets+'parent-questions.jpg'} width="1536" height="1024" loading="lazy" decoding="async" alt="A parent considering her child’s strengths, progress and academic results"/><div><h2>Parents’ concerns</h2><ol className="perspective-list parent-questions" start={parentQuestionPage * parentQuestionsPerPage + 1} aria-label="Questions and answers for parents">{visibleParentQuestions.map(([question, answer], index) => <li key={question}><span className="parent-question-number" aria-hidden="true">{parentQuestionPage * parentQuestionsPerPage + index + 1}</span><div><h3>{question}</h3><p>{answer}</p></div></li>)}</ol><nav className="parent-question-pagination" aria-label="Parent questions pagination"><button type="button" className="btn btn-primary" onClick={() => setParentQuestionPage(page => Math.max(0, page - 1))} disabled={parentQuestionPage === 0}>← Previous</button><span role="status" aria-live="polite" aria-atomic="true">Page {parentQuestionPage + 1} of {parentQuestionPageCount}</span><button type="button" className="btn btn-primary" onClick={() => setParentQuestionPage(page => Math.min(parentQuestionPageCount - 1, page + 1))} disabled={parentQuestionPage === parentQuestionPageCount - 1}>Next →</button></nav></div></div></section>

      <section className="section-pad stories-section"><div className="container"><p className="eyebrow">Real students, wider possibilities</p><h2>Clarity can sound like this.</h2><div className="stories-grid">
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e4100.png'} width="1376" height="768" loading="lazy" decoding="async" alt="Student reflecting on her interests in a library" /></div><blockquote>“I stopped asking “Which stream is best?” and started asking what kind of work keeps me curious.”</blockquote><figcaption>Meher · Class 11 · Jaipur</figcaption></figure>
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e05af.png'} width="1376" height="768" loading="lazy" decoding="async" alt="A parent and student discussing their future together" /></div><blockquote>“My family and I finally had a calm conversation. The report gave us shared language, not a final answer.”</blockquote><figcaption>Ayesha · Class 12 · Kochi</figcaption></figure>
      </div></div></section>

      <section id="schools" className="schools-section section-pad"><div className="container school-grid"><div className="school-copy"><p className="eyebrow">For CBSE-affiliated schools</p><h2>I-WIN helps schools put career guidance into practice</h2><p>CBSE Circular No. 02/2026, dated 19 January 2026, requires CBSE-affiliated schools to appoint one Career Counsellor for every 500 students enrolled in Classes IX–XII.</p><article className="school-support"><div><p className="eyebrow">Support for your school</p><h3>Working alongside your Career Counsellor</h3></div><div><p>I-WIN supports school career counsellors with student profiling, career interest assessments, insights into aptitude and attitudinal traits, and guidance on suitable education and career pathways.</p><p>Together, we help students and parents understand their options and make informed decisions about subjects, courses and future careers.</p></div></article><div className="school-actions"><Link className="btn btn-blue" href="mailto:support@i-winlearning.com?subject=School%20support%20enquiry">Discuss Support for Your School</Link><a className="btn btn-outline" href={updatedAssets+'cbse-circular.pdf'} target="_blank" rel="noreferrer">Read the CBSE Circular ↗</a></div></div><div className="circular-slider" role="region" aria-label="CBSE circular pages" aria-roledescription="carousel">
          <a className="circular-preview" href={updatedAssets+'cbse-circular.pdf#page='+(circularPage + 1)} target="_blank" rel="noreferrer" aria-label={`Open CBSE circular PDF at page ${circularPage + 1} in a new tab`}><img key={circularPage} src={updatedAssets+`cbse-page-${circularPage + 1}.jpg`} width="1273" height="1800" loading="lazy" decoding="async" alt={`CBSE circular on appointment of a Career Counsellor and Wellness Teacher — page ${circularPage + 1} of ${circularPageCount}`}/></a>
          <nav className="parent-question-pagination circular-pagination" aria-label="CBSE circular pagination"><button type="button" className="btn btn-primary" aria-controls="circular-page-status" disabled={circularPage === 0} onClick={() => setCircularPage(page => Math.max(0, page - 1))}>← Previous</button><span id="circular-page-status" role="status" aria-live="polite" aria-atomic="true">Page {circularPage + 1} of {circularPageCount}</span><button type="button" className="btn btn-primary" aria-controls="circular-page-status" disabled={circularPage === circularPageCount - 1} onClick={() => setCircularPage(page => Math.min(circularPageCount - 1, page + 1))}>Next →</button></nav>
        </div></div></section>

      <section id="certifications" className="section-pad certification-section"><img className="certificate-orbit" src={updatedAssets+'34594.svg'} width="499" height="499" alt="" loading="lazy"/><div className="container two-column certificate-grid"><div><p className="eyebrow">Show your skills</p><h2>A certificate you grow into.</h2><ol className="certificate-steps">{[['Learn', 'Personalised instruction and mentoring'], ['Practise', 'Activities, application and useful feedback'], ['Demonstrate', 'Competency assessment against programme requirements'], ['Celebrate', 'I-WIN Certificate of Competence when requirements are demonstrated']].map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol></div><img className="certificate-image" src={updatedAssets+'d6faa.png'} width="606" height="428" loading="lazy" decoding="async" alt="I-WIN Certificate of Competence specimen"/><img className="certificate-dot" src={updatedAssets+'3506a.svg'} width="78" height="78" loading="lazy" alt=""/></div></section>

      <section id="faqs" className="faq-section searchable-faq-section" aria-labelledby="landing-faq-heading"><div className="container">
        <div className="searchable-faq-heading"><p className="eyebrow">I-WIN Pathway Program</p><h2 id="landing-faq-heading">Frequently asked questions</h2><p>Clear answers for students and parents about assessments, learning, career planning and the I-WIN Pathway.</p></div>
        <div className="searchable-faq-card">
          <label className="faq-search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg><span className="sr-only">Search questions and answers</span><input type="search" value={faqSearch} placeholder="Search questions and answers" aria-controls="landing-faq-results" onChange={event => {setFaqSearch(event.target.value); setFaqPage(0);}}/></label>
          <div id="landing-faq-results" className="faq-search-results">{visibleFaqs.length ? visibleFaqs.map(({question, answer}, index) => <details className="faq-search-item" key={`${faqPage}-${searchTerm}-${question}`}><summary><span>{faqPage * faqPageSize + index + 1}. {question}</span><span className="faq-toggle-icon" aria-hidden="true"/></summary><div className="faq-search-answer">{(Array.isArray(answer) ? answer : [answer]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></details>) : <p className="faq-no-results">No questions found. Try a different search.</p>}</div>
          <nav className="faq-pagination" aria-label="FAQ pagination"><button type="button" className="btn btn-primary" aria-controls="landing-faq-results" disabled={faqPage === 0} onClick={() => setFaqPage(page => Math.max(0, page - 1))}>← Previous</button><span role="status" aria-live="polite" aria-atomic="true">Page {faqPage + 1} of {faqPageCount} · {matchingFaqs.length} {matchingFaqs.length === 1 ? 'question' : 'questions'}</span><button type="button" className="btn btn-primary" aria-controls="landing-faq-results" disabled={faqPage >= faqPageCount - 1} onClick={() => setFaqPage(page => Math.min(faqPageCount - 1, page + 1))}>Next →</button></nav>
        </div>
      </div></section>
    </main>
    <dialog ref={serviceDialog} className="preview-dialog service-dialog" aria-labelledby="service-dialog-title" onClick={event => { if (event.target === event.currentTarget) serviceDialog.current.close(); }}>
      {selectedService !== null && <>
        <div className="service-dialog-heading"><p className="eyebrow">I-WIN services</p><button type="button" className="text-button" aria-label="Close service details" onClick={() => serviceDialog.current.close()}>✕</button></div>
        <h2 id="service-dialog-title">{services[selectedService][0]}</h2>
        <p>{services[selectedService][1]}</p>
        <h3>Who it helps</h3><p>{serviceDetails[selectedService][0]}</p>
        <h3>What you can explore</h3><ul>{serviceDetails[selectedService][1].map(item => <li key={item}>{item}</li>)}</ul>
        <p>Contact our team to discuss your goals, programme availability and the right next step.</p>
        <div className="dialog-actions">{selectedService === 1 && <Link className="btn btn-primary" href="/checkout" onClick={() => serviceDialog.current.close()}>Start Assessment · ₹500 ↗</Link>}<button type="button" className="btn btn-outline" onClick={() => serviceDialog.current.close()}>Close</button><Link className="btn btn-primary" href={enquiry} onClick={() => serviceDialog.current.close()}>Enquire about this service ↗</Link></div>
      </>}
    </dialog>
    <Footer />
  </>;
}
