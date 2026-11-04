import React from 'react';
import Link from './Link.jsx';
import Footer from './Footer.jsx';
import '../figma/ServicePages.css';

export function ServiceHero({title, intro, lead, eyebrow, image = 'landing/0e600.png', servicesBreadcrumb = false}) {
  return <section className="service-detail-hero"><div className="service-detail-container">
    <nav className="service-detail-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span>{servicesBreadcrumb && <><Link href="/#services">Our Services</Link><span> / </span></>}<span aria-current="page">{title}</span></nav>
    <div className="service-detail-hero-grid"><div>{eyebrow && <p className="service-detail-eyebrow">{eyebrow}</p>}<h1>{title}</h1>{lead && <p className="service-detail-lead">{lead}</p>}<p>{intro}</p></div><img src={import.meta.env.BASE_URL+'assets/'+image} alt={image === 'landing/e4100.png' ? 'Student developing her knowledge in a library' : 'Two students exploring their future together'} width="1024" height="1024" fetchPriority="high"/></div>
  </div></section>;
}

export default function ServicePageLayout({children}) {
  return <div className="service-detail-page"><main id="main-content">{children}</main><Footer/></div>;
}
