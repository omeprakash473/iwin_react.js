import React from 'react';
import Link from '../components/Link.jsx';
import Footer from '../components/Footer.jsx';
import '../components/InformationPage.css';
import './Contact.css';

export default function Contact() {
  return <div className="information-contact">
    <main id="main-content">
      <section className="information-hero" aria-labelledby="contact-page-title"><div className="information-container">
        <nav className="information-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Contact</span></nav>
        <p className="information-eyebrow">I-WIN Pathway</p>
        <h1 id="contact-page-title">Contact</h1>
        <p>Support for your I-WIN journey.</p>
      </div></section>
      <div className="information-container contact-document">
        <nav className="information-contents" aria-label="On this page">
          <h2>On this page</h2>
          <a href="#customer-support">1. Customer support</a>
          <a href="#privacy-grievances">2. Privacy and grievances</a>
          <p>B. Vasantha Laxmi<br/>Assistant Vice President<br/><a href="mailto:vasantha@i-winlearning.com">vasantha@i-winlearning.com</a></p>
          <a href="#registered-office">3. Registered office</a>
        </nav>
        <img className="contact-document-divider" src={import.meta.env.BASE_URL+'assets/information/contact-divider.svg'} width="1" height="654" alt=""/>
        <article className="contact-document-content">
          <section id="customer-support"><h2>1. Customer support</h2><p>Users may contact I-WIN for assistance regarding subscriptions, payments, technical issues, assessment reports, privacy concerns or complaints.</p><p>Customer Support Email: <a href="mailto:support@i-winlearning.com">support@i-winlearning.com</a></p><p>Telephone: <a href="tel:+919491953078">+91-9491953078</a></p><p>Website: <a href="https://www.i-winlearning.com">www.i-winlearning.com</a></p></section>
          <section id="privacy-grievances"><h2>2. Privacy and grievances</h2><address className="privacy-officer">B. Vasantha Laxmi<br/>Assistant Vice President<br/><a href="mailto:vasantha@i-winlearning.com">vasantha@i-winlearning.com</a></address></section>
          <section id="registered-office"><h2>3. Registered office</h2><address>I-WIN Learning Solutions Private Limited<br/>4th Floor – Pent House, NSL Residency, Sai Nagar, Chaitanyapuri, Hyderabad - 500060, Telangana, India</address></section>
        </article>
      </div>
    </main>
    <Footer variant="information"/>
  </div>;
}
