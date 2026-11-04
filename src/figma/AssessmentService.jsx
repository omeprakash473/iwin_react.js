import React from 'react';
import ServicePageLayout, {ServiceHero} from '../components/ServicePageLayout.jsx';
import Link from '../components/Link.jsx';
import {serviceAssessments} from '../data/serviceAssessments.js';

export default function AssessmentService({assessment}) {
  const page = serviceAssessments[assessment];
  return <ServicePageLayout>
    <ServiceHero title={page.title} intro={page.intro} lead={page.lead === false ? null : 'Discover the career areas that interest you most.'}/>
    <section className="service-detail-container service-detail-body" aria-label={page.title+' details'}>
      {page.paragraphs.map(text => <p key={text}>{text}</p>)}
      <div className={'service-detail-tables'+(page.tables.length > 1 ? ' service-detail-tables-pair' : '')}>
        {page.tables.map((rows,index) => <section className="service-detail-table-card" key={index} aria-label={'Assessment details'+(page.tables.length > 1 ? ' for '+rows[1][1] : '')}><h2>Assessment Details</h2><table><caption className="sr-only">{page.title}{page.tables.length > 1 ? ' — '+rows[1][1] : ''}</caption><colgroup><col className="service-detail-label-column"/><col/></colgroup><tbody>{rows.map(([label,value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></section>)}
      </div>
      {assessment === 'student' && <nav className="service-detail-related" aria-label="Related assessment"><Link href="/communication-assessment">Explore Communication Assessment →</Link></nav>}
    </section>
  </ServicePageLayout>;
}
