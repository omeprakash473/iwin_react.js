import Link from './Link.jsx';
import Logo from './Logo.jsx';
import React, {useRef} from 'react';

export default function Footer() {
  const contactDialog = useRef(null);
  return <footer className="site-footer landing-v1-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><img className="footer-logo-circle" src={import.meta.env.BASE_URL+'assets/landing-v1/473a6.svg'} width="134" height="134" loading="lazy" alt=""/><Link href="/" aria-label="I-WIN home"><Logo/></Link><p>The I-WIN Student Pathway Program</p></div>
      <div><h3>Quick Links</h3><Link href="/">Home</Link><Link href="/#pathway">The I-WIN Pathway</Link><Link href="/#services">Our Services</Link><Link href="/#assessments">Assessments</Link><Link href="/student-assessment-disclaimer">Student Assessment Disclaimer</Link></div>
      <div><h3>Legal Information</h3><Link href="/terms-of-services">Terms and Conditions</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/faqs">FAQs</Link><Link href="/school-agreement">School-Agreement</Link><Link href="/#parents">Parents</Link></div>
      <div id="contact"><h3>Contact Info</h3><Link href="/#contact" onClick={event => {event.preventDefault(); contactDialog.current.showModal();}}>Contact</Link></div>
    </div>
    <div className="footer-bottom"><p>© 2027 I-WIN Learning Solutions Private Limited. All rights reserved.</p><div className="social-icons" aria-label="Social channels"><img src={(import.meta.env.BASE_URL + "assets/landing/e0530.png")} alt="Facebook" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/d720b.png")} alt="Instagram" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/9b018.png")} alt="YouTube" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/17e7f.png")} alt="LinkedIn" width="24" height="24" /></div></div>
  </div><dialog ref={contactDialog} className="preview-dialog" aria-labelledby="contact-dialog-title" onClick={event => {if(event.target === event.currentTarget) contactDialog.current.close();}}><h2 id="contact-dialog-title">Contact I-WIN</h2><p><a href="mailto:support@i-winlearning.com">support@i-winlearning.com</a></p><p><a href="tel:+919848052547">+91 98480 52547</a></p><div className="dialog-actions"><button type="button" className="btn btn-primary" onClick={() => contactDialog.current.close()}>Close</button></div></dialog></footer>;
}
