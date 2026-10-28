import React, { useRef, useState } from 'react';
import Link from '../components/Link.jsx';
import Footer from '../components/Footer.jsx';

const services = [
  {
    title: 'Career Interest Assessment',
    description: 'Explore 16 career domains through approximately 100 questions and discover your top three areas of interest.',
    who: 'Students beginning to explore career areas and interests.',
    explore: ['Explore interests across 16 career domains.', 'Use your strongest interest areas to begin a guidance conversation.'],
  },
  {
    title: 'Student Profiling',
    description: 'Build your unique profile. Explore your interests, daily life, passions and goals to support personalised career guidance.',
    who: 'Students building a profile for personalised career guidance.',
    explore: ['Reflect on interests, ambitions and everyday experiences.', 'Create a starting point for personalised guidance.'],
  },
  {
    title: 'Personality & Attitudinal Development (Personal Development)',
    description: 'Explore 25 attitudinal traits and build positive habits through case studies, mentoring, games and guided reflection.',
    who: 'Students who want to strengthen habits, confidence and self-awareness.',
    explore: ['Explore attitudinal traits and personal strengths.', 'Develop positive habits through reflection, activities and mentoring.'],
  },
  {
    title: 'Aptitude Assessment & Development',
    description: 'Discover your aptitude strengths and develop relevant skills through structured instruction and extensive practice.',
    who: 'Students discovering and developing their aptitude strengths.',
    explore: ['Identify abilities that support different career pathways.', 'Build relevant skills through instruction and practice.'],
  },
  {
    title: 'Subject Knowledge Assessment & Improvement (Academic Preparation)',
    description: 'Identify learning gaps and strengthen concepts through self-study, self-assessments, AI-based doubt clearing and mentoring.',
    who: 'Students who want to understand and improve subject knowledge.',
    explore: ['Identify gaps in concepts and understanding.', 'Strengthen learning through study, practice and mentoring.'],
  },
  {
    title: 'Career Guidance',
    description: 'Explore suitable careers based on interests, personality, aptitude and capabilities. Make informed subject and stream choices.',
    who: 'Students and families making education or career decisions.',
    explore: ['Connect interests and capabilities with suitable career options.', 'Discuss subjects, streams and pathways with a counsellor.'],
  },
  {
    title: 'Personal Development',
    description: 'Build confidence, positive attitudes, values, communication and life skills through guided development.',
    who: 'Students building confidence and skills for everyday life.',
    explore: ['Develop communication, values and positive attitudes.', 'Practise life skills through guided activities.'],
  },
  {
    title: 'Academic Preparation',
    description: 'Strengthen concepts and subject knowledge, with learning support aligned to the student’s career goals.',
    who: 'Students planning studies around their future goals.',
    explore: ['Strengthen concepts and subject understanding.', 'Organise learning support around a practical study plan.'],
  },
  {
    title: 'Competitive Exam Preparation',
    description: 'Prepare systematically with learning resources, extensive practice, mock tests and mentoring.',
    who: 'Students preparing for relevant competitive examinations.',
    explore: ['Plan preparation around the examination and student’s needs.', 'Practise with learning resources, mock tests and mentoring.'],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const serviceDialog = useRef(null);

  function openService(index) {
    setSelectedService(index);
    serviceDialog.current?.showModal();
  }

  return (
    <>
      <main id="main-content" className="services-page section-pad">
        <div className="container">
          <p className="eyebrow">OUR SERVICES</p>
          <h1>Guidance that leads to growth.</h1>
          <p className="section-description">
            We connect career guidance with personal development, learning and preparation—so students can turn a suitable career choice into a practical plan.
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <h3><span aria-hidden="true">✦</span> {service.title}</h3>
                <p>{service.description}</p>
                <button
                  type="button"
                  className="text-button service-explore"
                  aria-label={`Explore ${service.title}`}
                  onClick={() => openService(index)}
                >
                  Explore ↗
                </button>
              </article>
            ))}
          </div>

          <div className="services-cta">
            <Link className="btn btn-blue" href="/#contact">Enquire about training ↗</Link>
          </div>
        </div>
      </main>

      <dialog
        ref={serviceDialog}
        className="preview-dialog service-dialog"
        aria-labelledby="service-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) serviceDialog.current?.close();
        }}
      >
        {selectedService !== null && (
          <>
            <div className="service-dialog-heading">
              <p className="eyebrow">I-WIN services</p>
              <button type="button" className="text-button" aria-label="Close service details" onClick={() => serviceDialog.current?.close()}>✕</button>
            </div>
            <h2 id="service-dialog-title">{services[selectedService].title}</h2>
            <p>{services[selectedService].description}</p>
            <h3>Who it helps</h3>
            <p>{services[selectedService].who}</p>
            <h3>What you can explore</h3>
            <ul>{services[selectedService].explore.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>Contact our team to discuss your goals, programme availability and the right next step.</p>
            <div className="dialog-actions">
              <button type="button" className="btn btn-outline" onClick={() => serviceDialog.current?.close()}>Close</button>
              <Link className="btn btn-primary" href="/#contact" onClick={() => serviceDialog.current?.close()}>Enquire about this service ↗</Link>
            </div>
          </>
        )}
      </dialog>
      
    </>
  );
}
