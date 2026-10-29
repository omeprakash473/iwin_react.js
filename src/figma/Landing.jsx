import Services from './Services';
import Link from '../components/Link.jsx';
import { useRef, useState } from 'react';
import StudentArtwork from '../components/StudentArtwork.jsx';
import Footer from '../components/Footer.jsx';
import { faqCategories } from './Faqs.jsx';

const allFaqs = faqCategories.flatMap(([category, questions]) =>
  questions.map(([question, answer]) => ({ category, question, answer }))
);
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
  {
    title: 'Career Interest Assessment',
    description:
      'Explore 16 career domains through approximately 100 questions and discover your top three areas of interest.',
  },
  {
    title: 'Student Profiling',
    description:
      'Build your unique profile. Explore your interests, daily life, passions and goals to support personalised career guidance.',
  },
  {
    title: 'Personality & Attitudinal Development (Personal Development)',
    description:
      'Explore 25 attitudinal traits and build positive habits through case studies, mentoring, games and guided reflection.',
  },
  {
    title: 'Aptitude Assessment & Development',
    description:
      'Discover your aptitude strengths and develop relevant skills through structured instruction and extensive practice.',
  },
  {
    title: 'Subject Knowledge Assessment & Improvement (Academic Preparation)',
    description:
      'Identify learning gaps and strengthen concepts through self-study, self-assessments, AI-based doubt clearing and mentoring.',
  },
  {
    title: 'Career Guidance',
    description:
      'Explore suitable careers based on interests, personality, aptitude and capabilities. Make informed subject and stream choices.',
  },
  {
    title: 'Career Guidance',
    description: 'Explore suitable careers based on interests, personality, aptitude and capabilities. Make informed subject and stream choices.',
  },
  {
    title: 'Competitive Exam Preparation',
    description: 'Prepare systematically with learning resources, extensive practice, mock tests and mentoring.',
  },
  {
    title: 'Skills Development Programs',
    description: 'Build practical abilities in AI applications, business IT, digital marketing, accounting and finance.',
  },
  {
    title: 'Guidance for Higher Studies',
    description: 'Explore suitable courses, colleges and universities in India and overseas, including international study pathways.',
  },
];


const serviceDetails = [
  [
    "Students exploring career areas and interests.",
    [
      "Explore interests across 16 career domains.",
      "Use your strongest interest areas to begin a guidance conversation."
    ]
  ],
  [
    "Students building a profile for personalised career guidance.",
    [
      "Reflect on interests, ambitions and everyday experiences.",
      "Create a starting point for personalised guidance."
    ]
  ],
  [
    "Students who want to strengthen habits, confidence and self-awareness.",
    [
      "Explore attitudinal traits and personal strengths.",
      "Develop positive habits through reflection, activities and mentoring."
    ]
  ],
  [
    "Students discovering and developing their aptitude strengths.",
    [
      "Identify abilities that support different career pathways.",
      "Build relevant skills through instruction and practice."
    ]
  ],
  [
    "Students who want to understand and improve subject knowledge.",
    [
      "Identify gaps in concepts and understanding.",
      "Strengthen learning through study, practice and mentoring."
    ]
  ],
  [
    "Students and families making education or career decisions.",
    [
      "Connect interests and capabilities with suitable career options.",
      "Discuss subjects, streams and pathways with a counsellor."
    ]
  ],
  [
    "Students preparing for relevant competitive examinations.",
    [
      "Plan preparation around the examination and student's needs.",
      "Practise with learning resources, mock tests and mentoring."
    ]
  ],
  [
    "Students building practical skills for career development.",
    [
      "Build practical abilities in AI applications, business IT, digital marketing, accounting and finance.",
      "Develop skills through practical training and activities."
    ]
  ],
  [
    "Students planning their future higher education.",
    [
      "Explore suitable courses, colleges and universities in India and overseas.",
      "Discover international study pathways."
    ]
  ]
];

export default function Landing() {
  const [selectedService, setSelectedService] = useState(null);
  const serviceDialog = useRef(null);
  function openService(index) { setSelectedService(index); serviceDialog.current.showModal(); }
  const [activeStage, setActiveStage] = useState(0);
  const [parentQuestionPage, setParentQuestionPage] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [faqPage, setFaqPage] = useState(0);
  const [detailTitle, detailDescription, nextStep] = stageDetails[activeStage];
  const parentQuestionsPerPage = 5;
  const parentQuestionPageCount = Math.ceil(parentQuestions.length / parentQuestionsPerPage);
  const visibleParentQuestions = parentQuestions.slice(
    parentQuestionPage * parentQuestionsPerPage,
    (parentQuestionPage + 1) * parentQuestionsPerPage
  );
  const matchingFaqs = allFaqs.filter(({ category, question, answer }) => {
    const searchText = `${category} ${question} ${Array.isArray(answer) ? answer.join(' ') : answer}`.toLowerCase();
    return searchText.includes(faqSearch.trim().toLowerCase());
  });
  const faqPageSize = 5;
  const faqPageCount = Math.ceil(matchingFaqs.length / faqPageSize);
  const visibleFaqs = matchingFaqs.slice(faqPage * faqPageSize, (faqPage + 1) * faqPageSize);
  const visibleFaqGroups = visibleFaqs.reduce((groups, faq, index) => {
    let group = groups[groups.length - 1];
    if (!group || group.category !== faq.category) {
      group = { category: faq.category, questions: [] };
      groups.push(group);
    }
    group.questions.push({ ...faq, number: faqPage * faqPageSize + index + 1 });
    return groups;
  }, []);
  return <>
    <main id="main-content" className="landing-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">The I-WIN Student Pathway Program</p>
              <h1>Discover your future.</h1>
             
              <p className="hero-promise">Discover strengths. Choose the right career. Build the capabilities to succeed.</p>
              <p className="muted">Your interests, abilities and ambitions are uniquely yours. Six friendly assessments help you understand yourself, explore suitable careers and know what to develop next.</p>
     
<div className="button-row">
  <Link className="btn btn-primary" href="#contact">
    Enquire about career Assessments ↗
  </Link>
</div>

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
      <Services />


      <section id="parents" className="section-pad parent-section"><div className="container two-column parent-grid"><StudentArtwork /><div><h2>Parents’ concerns </h2><ol className="perspective-list parent-questions" aria-label="Questions and answers for parents">{visibleParentQuestions.map(([question, answer], index) => <li key={question}><span>{parentQuestionPage * parentQuestionsPerPage + index + 1}</span><div><h3>{question}</h3><p>{answer}</p></div></li>)}</ol><nav className="parent-question-pagination" aria-label="Parent questions pagination"><button type="button" className="btn btn-primary" onClick={() => setParentQuestionPage(page => page - 1)} disabled={parentQuestionPage === 0}>← Previous</button><span aria-live="polite">Page {parentQuestionPage + 1} of {parentQuestionPageCount}</span><button type="button" className="btn btn-primary" onClick={() => setParentQuestionPage(page => page + 1)} disabled={parentQuestionPage === parentQuestionPageCount - 1}>Next →</button></nav></div></div></section>

<section id="assessments" className="section-pad landing-faq-section">
  <div id="faqs" className="container landing-faqs">
    <header className="landing-faq-heading">
      <p className="eyebrow">I-WIN Pathway Program</p>
      <h2>Frequently asked questions</h2>
      <p>Clear answers for students and parents about assessments, learning, career planning and the I-WIN Pathway.</p>
    </header>
    <div className="landing-faq-card">
      <label className="landing-faq-search">
        <span aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg></span>
        <input
          type="search"
          value={faqSearch}
          onChange={event => {
            setFaqSearch(event.target.value);
            setFaqPage(0);
          }}
          placeholder="Search questions and answers"
          aria-label="Search frequently asked questions"
        />
      </label>
      {visibleFaqGroups.length > 0 ? visibleFaqGroups.map(({ category, questions }) => (
        <section className="landing-faq-category" key={category}>
          <div className="landing-faq-list">
            {questions.map(({ number, question, answer }) => {
              const answerParagraphs = Array.isArray(answer) ? answer : [answer];
              return (
                <details className="landing-faq-item" key={question}>
                  <summary><span className="landing-faq-question">{number}. {question}</span><span className="landing-faq-toggle" aria-hidden="true">+</span></summary>
                  <div className="landing-faq-answer">
                    {answerParagraphs.map((paragraph, paragraphIndex) => <p key={`${question}-${paragraphIndex}`}>{paragraph}</p>)}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      )) : <p className="landing-faq-empty">No questions match your search. Try another keyword.</p>}
      <nav className="landing-faq-pagination" aria-label="FAQ pagination">
        <button type="button" className="btn btn-primary" onClick={() => setFaqPage(page => page - 1)} disabled={faqPage === 0 || faqPageCount === 0}>← Previous</button>
        <span aria-live="polite">{matchingFaqs.length === 0 ? '0 questions' : `Page ${faqPage + 1} of ${faqPageCount} · ${matchingFaqs.length} questions`}</span>
        <button type="button" className="btn btn-primary" onClick={() => setFaqPage(page => page + 1)} disabled={faqPage >= faqPageCount - 1}>Next →</button>
      </nav>
    </div>
  </div>
</section>

      <section className="section-pad"><div className="container"><p className="eyebrow">Real students, wider possibilities</p><h2>Clarity can sound like this.</h2><div className="stories-grid">
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e4100.png'} alt="Student reflecting on her interests in a library" /></div><blockquote>“I stopped asking ‘Which stream is best?’ and started asking what kind of work keeps me curious.”</blockquote><figcaption>Meher · Class 11 · Jaipur</figcaption></figure>
        <figure className="story-card"><div className="story-photo"><img className="photo" src={assets+'e05af.png'} alt="A parent and student discussing their future together" /></div><blockquote>“My family and I finally had a calm conversation. The report gave us shared language, not a final answer.”</blockquote><figcaption>Ayesha · Class 12 · Kochi</figcaption></figure>
      </div></div></section>

  

      

<section id="schools" className="schools-section section-pad">
  <div className="container">
    <div className="school-image-layout">
      <div className="school-left-content">
        <p className="eyebrow">For CBSE-affiliated schools</p>

        <h2>I-WIN helps schools put career guidance into practice</h2>

        <p className="school-circular-copy">
          CBSE Circular No. 02/2026, dated 19 January 2026, requires
          CBSE-affiliated schools to appoint one Career Counsellor for
          every 500 students enrolled in Classes IX–XII.
        </p>

        <article className="school-support">
          <p className="eyebrow">Support for your school</p>
          <h3>Working alongside your Career Counsellor</h3>
          <p>
            I-WIN supports school career counsellors with student
            profiling, career interest assessments, insights into
            aptitude and attitudinal traits, and guidance on suitable
            education and career pathways.
          </p>
          <p>
            Together, we help students and parents understand their
            options and make informed decisions about subjects,
            courses and future careers.
          </p>
        </article>

        <div className="school-actions">
          <Link
            className="btn btn-blue"
            href="mailto:sivaram@i-winlearning.com?subject=School%20support%20enquiry"
          >
            Discuss Support for Your School
          </Link>
          <a className="btn btn-outline" href="https://www.cbse.gov.in/" target="_blank" rel="noreferrer">
            Visit the CBSE website ↗
          </a>
        </div>
      </div>

      <div className="school-image-placeholder" role="img" aria-label="Placeholder for a school or career guidance photo">
        <div className="school-image-placeholder-content">
          <span className="school-image-plus">+</span>
          <p>Add your school photo here</p>
          <small>Replace this box with your school or career guidance image</small>
        </div>
      </div>
    </div>
  </div>
</section>
      <section id="certifications" className="section-pad"><div className="container two-column certificate-grid"><div><p className="eyebrow">Show your skills</p><h2>A certificate you grow into.</h2><ol className="certificate-steps">{[['Learn', 'Personalised instruction and mentoring'], ['Practise', 'Activities, application and useful feedback'], ['Demonstrate', 'Competency assessment against programme requirements'], ['Celebrate', 'I-WIN Certificate of Competence when requirements are demonstrated']].map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol></div><article className="certificate-preview"><p className="certificate-brand">I-WIN <small>Certificate preview</small></p><img src={assets+'44f71.svg'} alt="" /><h3>Certificate of Competence</h3><strong>Your name here</strong><p>Awarded for a completed programme with demonstrated required skills.</p><small>Learning → Practice → Competency assessment → Certificate<br />I-WIN Learning Solutions Private Limited</small></article></div></section>
    </main>
    <dialog ref={serviceDialog} className="preview-dialog service-dialog" aria-labelledby="service-dialog-title" onClick={event => { if (event.target === event.currentTarget) serviceDialog.current.close(); }}>
      {selectedService !== null && <>
        <div className="service-dialog-heading"><p className="eyebrow">I-WIN services</p><button type="button" className="text-button" aria-label="Close service details" onClick={() => serviceDialog.current.close()}>✕</button></div>
        <h2 id="service-dialog-title">{services[selectedService].title}</h2>
        <p>{services[selectedService].description}</p>
        <h3>Who it helps</h3><p>{serviceDetails[selectedService][0]}</p>
        <h3>What you can explore</h3><ul>{serviceDetails[selectedService][1].map(item => <li key={item}>{item}</li>)}</ul>
        <p>Contact our team to discuss your goals, programme availability and the right next step.</p>
        <div className="dialog-actions"><button type="button" className="btn btn-outline" onClick={() => serviceDialog.current.close()}>Close</button><Link className="btn btn-primary" href="#contact" onClick={() => serviceDialog.current.close()}>Enquire about this service ↗</Link></div>
      </>}
    </dialog>

           
      <Footer />
    </>;
}
    
