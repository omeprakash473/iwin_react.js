import Link from './Link.jsx';
import Logo from './Logo.jsx';
import React from 'react';

export default function Footer({variant = 'landing'}) {
  const information = variant === 'information';
  return <footer className={'site-footer landing-v1-footer' + (information ? ' information-footer' : '')}><div className="container">
    <div className="footer-grid">
      <div className="footer-brand">{!information && <img className="footer-logo-circle" src={import.meta.env.BASE_URL+'assets/landing-v1/473a6.svg'} width="134" height="134" loading="lazy" alt=""/>}<Link href="/" aria-label="I-WIN home"><Logo/></Link><p>The I-WIN Student Pathway Program</p></div>
      <div><h3>Quick Links</h3><Link href="/">Home</Link><Link href="/#pathway">The I-WIN Pathway</Link><Link href="/#services">Our Services</Link><Link href="/#assessments">Assessments</Link><Link href="/about-us">About Us</Link><Link href="/student-assessment-disclaimer">Student Assessment Disclaimer</Link></div>
      <div><h3>Legal Information</h3><Link href="/terms-of-services">Terms and Conditions</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/faqs">FAQs</Link><Link href="/school-agreement">School Agreement</Link><Link href="/parents-concerns">Parents’ concerns</Link></div>
      <div id="contact"><h3>Contact Info</h3><Link href="/contact">Contact</Link>{information && <div className="information-footer-contact-details"><a href="mailto:sivaram@i-winlearning.com">sivaram@i-winlearning.com</a><a href="tel:+919848052547">+91 98480 52547</a></div>}</div>
    </div>
    <div className="footer-bottom"><p>© 2027 I-WIN Learning Solutions Private Limited. All rights reserved.</p><div className="social-icons" aria-label="Social channels"><a href="https://www.facebook.com/iwinappofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src={(import.meta.env.BASE_URL + "assets/landing/e0530.png")} alt="Facebook" width="24" height="24" /></a><a href="https://www.instagram.com/iwinacademyofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={(import.meta.env.BASE_URL + "assets/landing/d720b.png")} alt="Instagram" width="24" height="24" /></a><a href="https://www.youtube.com/@i-winclassvideos/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src={(import.meta.env.BASE_URL + "assets/landing/9b018.png")} alt="YouTube" width="24" height="24" /></a><img src={(import.meta.env.BASE_URL + "assets/landing/17e7f.png")} alt="LinkedIn" width="24" height="24" /></div></div>
  </div></footer>;
}
