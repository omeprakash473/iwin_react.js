import React, {useLayoutEffect, useRef, useState} from 'react';
import Link from './Link.jsx';
import Footer from './Footer.jsx';
import './InformationPage.css';

export default function InformationPage({title, description, children, className = ''}) {
  const article = useRef(null);
  const [contents, setContents] = useState([]);
  useLayoutEffect(() => {
    const headings = [...article.current.querySelectorAll('h2:not([data-toc-exclude])')];
    const entries = headings.map((heading, index) => {
      const id = 'document-section-' + (index + 1);
      heading.id = id;
      return {id, label:heading.textContent};
    });
    setContents(entries);
    let hash = '';
    try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { /* Ignore malformed anchor text. */ }
    const target = document.getElementById(hash);
    if (target && article.current.contains(target)) target.scrollIntoView();
  }, [title]);
  return <div className={'information-page ' + className}>
    <main id="main-content">
      <section className="information-page-hero" aria-labelledby="information-page-title"><div className="information-page-container">
        <nav className="information-page-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>
        <p className="information-page-eyebrow">I-WIN Pathway</p>
        <h1 id="information-page-title">{title}</h1>
        <p>{description}</p>
      </div></section>
      <div className="information-page-container information-page-document">
        <nav className="information-page-contents" aria-label="On this page"><details open><summary>On this page</summary><ul>{contents.map(({id,label}) => <li key={id}><a href={'#'+id}>{label}</a></li>)}</ul></details></nav>
        <div ref={article} className="information-page-content">{children}</div>
      </div>
    </main>
    <Footer variant="information"/>
  </div>;
}
