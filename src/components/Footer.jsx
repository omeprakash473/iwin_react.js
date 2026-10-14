import React from 'react';

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-brand"><a href="/" aria-label="I-WIN home"><img src="/assets/brand/iwin-logo.png" alt="I-WIN — Learn to Win" width="150" height="59" /></a><p>The I-WIN Student Pathway Program</p></div>
      <div><h3>Quick Links</h3><a href="/">Home</a><a href="/#pathway">The I-WIN Pathway</a><a href="/#services">Our Services</a><a href="/#assessments">Assessments</a></div>
      <div><h3>Information</h3><a href="/#schools">For Schools</a><a href="/#certifications">Certifications</a><a href="/#contact">Contact Us</a></div>
      <div><h3>Contact Info</h3><a href="mailto:sivaram@i-winlearning.com">sivaram@i-winlearning.com</a><a href="tel:+919848052547">+91 98480 52547</a></div>
    </div>
    <div className="footer-bottom"><p>© 2027 I-WIN Learning Solutions Private Limited. All rights reserved.</p><div className="social-icons" aria-label="Social channels"><img src="/assets/landing/e0530.png" alt="Facebook" width="24" height="24" /><img src="/assets/landing/d720b.png" alt="Instagram" width="24" height="24" /><img src="/assets/landing/9b018.png" alt="YouTube" width="24" height="24" /><img src="/assets/landing/17e7f.png" alt="LinkedIn" width="24" height="24" /></div></div>
  </div></footer>;
}
