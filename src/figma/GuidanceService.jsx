import React from 'react';
import ServicePageLayout, {ServiceHero} from '../components/ServicePageLayout.jsx';
import Link from '../components/Link.jsx';
import {guidanceServices} from '../data/guidanceServices.js';
import './GuidanceService.css';

export default function GuidanceService({service}) {
  const page = guidanceServices[service];
  return <ServicePageLayout>
    <ServiceHero title={page.title} eyebrow={page.eyebrow} lead={page.lead} intro={page.intro} servicesBreadcrumb/>
    <section className="service-detail-container guidance-section" aria-labelledby="guidance-overview-heading">
      <p className="service-detail-eyebrow">Explore your possibilities</p><h2 id="guidance-overview-heading">{page.heading}</h2><p>{page.description}</p>
      <div className="guidance-card-grid">{page.cards.map(([title,text],index) => <article key={title}><span className="guidance-card-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="guidance-process"><div className="service-detail-container"><p className="service-detail-eyebrow">How it works</p><h2>{page.processHeading}</h2><ol>{page.steps.map(([title,text],index) => <li key={title}><span aria-hidden="true">{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
    <section className="guidance-highlight"><div className="service-detail-container"><p className="service-detail-eyebrow">Your pathway, your progress</p><h2>{page.bandHeading}</h2><p>{page.bandText}</p></div></section>
    <section className="service-detail-container guidance-next"><p className="service-detail-eyebrow">Your next step</p><h2>{page.nextHeading}</h2><p>{page.nextText}</p><div className="skills-actions"><a className="btn btn-primary" href={'mailto:support@i-winlearning.com?subject='+encodeURIComponent(page.subject)}>Enquire About This Service</a><Link className="btn btn-outline" href="/contact">Talk to a Counsellor</Link></div><nav className="guidance-related" aria-label="Related services">{page.related.map(([title,href]) => <Link key={href} href={href}>{title} →</Link>)}</nav></section>
  </ServicePageLayout>;
}
