import Link from './Link.jsx';
import React from 'react';

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><Link href="/" aria-label="I-WIN home"><img src={(import.meta.env.BASE_URL + "assets/brand/iwin-logo.png")} alt="I-WIN — Learn to Win" width="150" height="59" /></Link><p>The I-WIN Student Pathway Program</p></div>
      <div><h3>Quick Links</h3><Link href="/">Home</Link><Link href="/#pathway">The I-WIN Pathway</Link><Link href="/#services">Our Services</Link><Link href="/#assessments">Assessments</Link><Link href="/student-assessment-disclaimer">Student Assessment Disclaimer</Link><Link href="/#assessments">Assessments</Link></div>

<div>
  <h3>Legal Information</h3>
  <Link href="/terms-of-services">Terms and Conditions</Link>
  <Link href="/privacy-policy">Privacy Policy</Link>
  <Link href="/refund-policy">Refund Policy</Link>
  <Link href="/cookie-policy">Cookie Policy</Link>
  <Link href="/faqs">FAQs</Link>
  <Link href="/school-agreement">School-Agreement</Link>
  <Link href="/#parents">Parents</Link>
</div>


      <div><h3>Contact Info</h3><Link href="/#contact">Contact</Link><Link href="mailto:sivaram@i-winlearning.com">sivaram@i-winlearning.com</Link><Link href="tel:+919848052547">+91 98480 52547</Link></div>
    </div>
    <div className="footer-bottom"><p>© 2027 I-WIN Learning Solutions Private Limited. All rights reserved.</p><div className="social-icons" aria-label="Social channels"><img src={(import.meta.env.BASE_URL + "assets/landing/e0530.png")} alt="Facebook" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/d720b.png")} alt="Instagram" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/9b018.png")} alt="YouTube" width="24" height="24" /><img src={(import.meta.env.BASE_URL + "assets/landing/17e7f.png")} alt="LinkedIn" width="24" height="24" /></div></div>
  </div></footer>;
}
