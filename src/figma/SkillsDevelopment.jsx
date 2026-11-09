import React from 'react';
import ServicePageLayout, {ServiceHero} from '../components/ServicePageLayout.jsx';
import Link from '../components/Link.jsx';

const programs = [
  ['AI Applications', 'Use AI tools to support learning, productivity and problem-solving.', 'spark'],
  ['Business IT Applications', 'Explore how ERP and CRM systems help organisations manage operations and customer relationships.', 'screen'],
  ['Digital Marketing', 'Learn the foundations of digital content, online promotion and customer engagement.', 'speaker'],
  ['Accounting', 'Build practical foundations in bookkeeping and accounting.', 'calculator'],
  ['Finance Applications', 'Use tools for financial calculations, budgeting and analysis.', 'chart'],
];

function ProgramIcon({type}) {
  const paths = {spark:'m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Zm7-1v4m-2-2h4',screen:'M3 4h18v13H3V4Zm5 17h8m-4-4v4',speaker:'M4 9h5l10-5v16L9 15H4V9Zm3 6 2 6h3l-2-6',calculator:'M6 2h12v20H6V2Zm3 4h6M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1',chart:'M3 3v18h18M7 16V9m5 7V5m5 11v-5'};
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]}/></svg>;
}

export default function SkillsDevelopment() {
  return <ServicePageLayout>
    <ServiceHero title="Skills Development Programs" eyebrow="Hands-on learning / Practical abilities" lead={<>Learn useful skills. Apply your knowledge.<br/>Explore new possibilities.</>} intro="I-WIN helps students gain hands-on experience in emerging disciplines and practical applications. These programs complement academic learning and support preparation for higher education and the world of work." image="landing/e4100.png" servicesBreadcrumb/>
    <section className="service-detail-container skills-programs"><p className="service-detail-eyebrow">Explore your interests</p><h2>Practical learning for a changing world.</h2><p>Programs draw on relevant CBSE skill education curricula, alongside additional training in useful workplace applications.</p><div className="skills-program-grid">{programs.map(([title,description,type],index) => <article key={title}><ProgramIcon type={type}/><p className="service-detail-eyebrow">{String(index+1).padStart(2,'0')} / Practical learning</p><h3>{title}</h3><p>{description}</p></article>)}</div><p>Additional programs offer opportunities to explore other skill areas relevant to students’ interests and goals.</p></section>
    <section className="skills-confidence"><div className="service-detail-container"><p className="service-detail-eyebrow">Connect learning with real life</p><h2>Build confidence by doing.</h2><p>Skill-based learning helps students connect classroom knowledge with practical tasks, explore career interests and develop useful abilities through hands-on practice.</p><p>These experiences can strengthen readiness for further study and help students understand how skills are applied in different workplaces.</p></div></section>
    <section className="service-detail-container skills-certificate"><p className="service-detail-eyebrow">Recognise your achievement</p><h2>I-WIN Certificate of Competence</h2><p>Students who complete a skill-based program and demonstrate the required skills receive an I-WIN Certificate of Competence.</p><div><h3>A record of the skills you have developed</h3><p>The certificate recognises competence demonstrated in the completed I-WIN program.</p></div></section>
    <section className="service-detail-container skills-next"><p className="service-detail-eyebrow">Your next step</p><h2>Build useful skills today.<br/>Create possibilities for tomorrow.</h2><p>Speak with I-WIN about the available programs and the learning areas that suit your interests and goals.</p><div className="skills-actions"><a className="btn btn-primary" href="mailto:support@i-winlearning.com?subject=Skills%20programs%20enquiry">Enquire About Skills Programs</a><Link className="btn btn-outline" href="/contact">Talk to a Counsellor</Link></div></section>
  </ServicePageLayout>;
}
