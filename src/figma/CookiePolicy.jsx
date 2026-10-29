import Link from '../components/Link.jsx';

const policySections = [
  {
    title: '1. Introduction',
    paragraphs: [
      'I-WIN Learning Solutions Private Limited (“I-WIN”, “Company”, “we”, “us” or “our”) respects the privacy of visitors and users of its website and educational platforms.',
      'This Cookie Policy explains how cookies and similar technologies may be used on the I-WIN website, Learning Portal and associated digital services.',
      'The Policy describes the types of cookies that may be used, their purposes, the information they may collect and the choices available to users.',
      'This Policy should be read together with our Privacy Policy, Terms and Conditions and, where applicable, Parental Consent Notice.',
    ],
  },
  {
    title: '2. What are cookies?',
    paragraphs: [
      'Cookies are small text files stored on a user’s computer, smartphone, tablet or other device when accessing a website.',
      'They help websites recognise a browser, maintain login sessions, remember preferences and support website functionality.',
      'Some cookies are deleted when the browser is closed, while others remain on the device for a defined period.',
      'I-WIN may also use similar technologies, such as local storage or session identifiers, where necessary for website or platform functionality.',
    ],
  },
  {
    title: '3. How I-WIN uses cookies',
    intro: 'Depending on the website’s configuration, I-WIN may use cookies and similar technologies for the following purposes:',
    subsections: [
      ['3.1 Website Functionality', 'To enable essential website features and support navigation.'],
      ['3.2 Secure Student Login', 'To maintain authenticated sessions and help protect student, parent, teacher and administrator accounts.'],
      ['3.3 Learning Portal Functionality', 'To support access to learning resources, assessments, practice tests and authorised dashboards.'],
      ['3.4 User Preferences', 'To remember permitted preferences, such as language, display settings and other selected options.'],
      ['3.5 Website Performance', 'To identify technical problems, improve loading performance and maintain reliable platform operation.'],
      ['3.6 Website Analytics', 'Where enabled and lawfully authorised, to understand how visitors use the website and improve its usability and educational services.'],
    ],
    paragraphs: ['I-WIN shall not use cookies for undisclosed purposes.'],
  },
  {
    title: '4. Types of cookies',
    intro: 'The following categories may be used, depending on the services and technologies deployed.',
    subsections: [
      ['4.1 Strictly Necessary Cookies', 'These cookies support essential website and platform operations. Examples include login authentication, session management, security protections, account access, essential website navigation and preservation of assessment sessions. Disabling these cookies may prevent certain website features from functioning correctly.'],
      ['4.2 Functional Cookies', 'These cookies remember user preferences and support optional convenience features. Examples may include language selection and display preferences. Where required by applicable law, these cookies shall be activated only after appropriate consent.'],
      ['4.3 Performance and Analytics Cookies', 'These cookies may help I-WIN understand website usage, identify technical errors and improve platform performance. Analytics technologies shall be used only where appropriate under applicable law, particularly when children’s information may be involved.'],
      ['4.4 Third-Party Cookies', 'Certain authorised technology providers may place cookies or use similar technologies in connection with services integrated into the website. Such providers may include payment gateways, security services or other approved service providers. The identity, purpose and duration of relevant third-party cookies shall be disclosed in the website’s current cookie inventory.'],
    ],
  },
  {
    title: '5. Cookies and children’s privacy',
    intro: 'I-WIN recognises that the Pathway Program is intended primarily for school students, many of whom are below 18 years of age. We are committed to protecting children’s personal information.',
    list: [
      'I-WIN shall not use cookies for targeted advertising directed at children where prohibited by applicable law.',
      'I-WIN shall not undertake prohibited tracking or behavioural monitoring of children.',
      'Cookies and similar technologies used in student accounts shall be limited to lawful and appropriately authorised purposes.',
      'Where parental consent is legally required for processing a child’s personal information, I-WIN shall implement an appropriate consent and verification mechanism.',
      'Non-essential analytics and third-party tracking technologies shall not be activated in children’s accounts unless their use is lawful and the necessary authorisations and safeguards are in place.',
      'The use of cookies for essential platform functionality does not, by itself, remove any applicable data protection obligations.',
    ],
  },
  {
    title: '6. Information collected through cookies',
    intro: 'Depending on the technology used, cookies and similar tools may process:',
    list: [
      'Session identifiers.',
      'Browser and device information.',
      'Language and display preferences.',
      'Website navigation information.',
      'Login status.',
      'Technical error information.',
      'IP address or related network information.',
      'Limited usage information where analytics are enabled.',
    ],
    paragraphs: [
      'Some of this information may constitute personal data when it identifies, or can be linked to, an individual.',
      'Such information shall be processed in accordance with the I-WIN Privacy Policy and applicable law.',
    ],
  },
  {
    title: '7. Third-party services',
    paragraphs: [
      'I-WIN may use authorised third-party services for payment processing, website security, hosting, communications or other necessary functions.',
      'Where such services use cookies, I-WIN shall assess the relevant privacy implications and implement appropriate contractual and technical safeguards.',
      'Third-party cookies shall not be used for undisclosed advertising or unrelated commercial profiling of students.',
      'Where required, users shall be informed about the relevant third-party providers and their privacy practices.',
    ],
  },
  {
    title: '8. Cookie consent and user choices',
    paragraphs: [
      'Where cookies or similar technologies require consent under applicable law, I-WIN shall provide users with clear information and an appropriate mechanism for making their choices.',
    ],
    list: [
      'Accept optional cookies.',
      'Reject optional cookies.',
      'Select permitted cookie categories.',
      'Change or withdraw previous cookie choices.',
    ],
    ending: [
      'Strictly necessary cookies may remain active where their use is lawful and required for essential website functionality.',
      'Refusing optional cookies shall not prevent access to core services where those cookies are not necessary.',
      'Where consent is required, merely continuing to browse the website shall not be treated as consent.',
    ],
  },
  {
    title: '9. Managing cookies through browser settings',
    intro: 'Most web browsers allow users to manage cookies through their privacy or security settings. Users can generally:',
    list: [
      'View stored cookies.',
      'Delete existing cookies.',
      'Block certain cookies.',
      'Restrict third-party cookies.',
      'Configure cookie preferences.',
    ],
    paragraphs: [
      'Disabling essential cookies may affect login functionality, assessment sessions or other important platform features.',
    ],
  },
  {
    title: '10. Cookie retention',
    paragraphs: [
      'Cookies may be stored for different periods depending on their purpose.',
    ],
    subsections: [
      ['Session Cookies', 'Generally expire when the browser session ends or the session is otherwise terminated.'],
      ['Persistent Cookies', 'Remain for a specified period unless deleted earlier by the user or the website.'],
    ],
    ending: [
      'I-WIN shall maintain a cookie inventory identifying the actual cookies used, their purposes, providers and retention periods.',
      'Cookie retention shall be limited to periods appropriate for their intended purposes and applicable legal requirements.',
    ],
  },
  {
    title: '11. Security of cookie information',
    intro: 'I-WIN shall implement appropriate safeguards for cookie-related information. These may include:',
    list: [
      'Secure transmission protocols.',
      'Appropriate cookie security attributes.',
      'Session expiration controls.',
      'Restricted access to relevant information.',
      'Measures to reduce unauthorised session access.',
      'Periodic review of cookies and integrated services.',
    ],
    paragraphs: [
      'No website technology can guarantee absolute security, but I-WIN shall take reasonable measures to protect information processed through its platforms.',
    ],
  },
  {
    title: '12. Changes to this Cookie Policy',
    paragraphs: [
      'I-WIN may update this Cookie Policy to reflect changes in website technology, services, legal requirements or privacy practices.',
      'The revised Policy shall be published with an updated effective date.',
      'Where a change requires additional consent, I-WIN shall obtain the necessary authorisation before activating the relevant processing.',
    ],
  },
  {
    title: '13. Contact information',
    paragraphs: [
      'For questions regarding cookies or website privacy, please contact:',
      'I-WIN Learning Solutions Private Limited',
      'Hyderabad, Telangana, India',
      'Website: www.i-winlearning.com (http://www.i-win.in/)',
      'Privacy Email: vasantha@i-winlearning.com',
      'Registered Office: 4th Floor – Pent House, NSL Residency, Sai Nagar, Chaitanyapuri, Hyderabad - 500060, Telangana, India',
      'Privacy / Grievance Contact: B. Vasantha Laxmi, Assistant Vice President',
    ],
  },
  {
    title: '14. Related policies',
    intro: 'This Cookie Policy should be read together with:',
    list: [
      'I-WIN Terms and Conditions.',
      'I-WIN Privacy Policy.',
      'I-WIN Parental Consent Notice.',
      'I-WIN Student Assessment Disclaimer.',
    ],
    paragraphs: [
      'In the event of any inconsistency, mandatory provisions of applicable law shall prevail.',
    ],
  },
];

export default function CookiePolicy() {
  return (
    <main id="main-content" className="account-page">
      <article className="account-card policy-card cookie-policy">
        <Link href="/">← Back to home</Link>
        <header className="form-heading">
          <p className="eyebrow">I-WIN Pathway Program</p>
          <h1>Cookie Policy</h1>
          <p><strong>I-WIN Learning Solutions Private Limited</strong></p>
          <p>Website: <a href="http://www.i-win.in/">www.i-winlearning.com</a></p>
          <p>Effective Date: October 23rd 2026</p>
          <p>Last Updated: October 23rd 2026</p>
        </header>

        {policySections.map(section => (
          <section className="cookie-policy-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.intro && <p>{section.intro}</p>}
            {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.subsections?.map(([title, body]) => (
              <div className="cookie-policy-subsection" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
            {section.list && (
              <ul>
                {section.list.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
            {section.ending?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <footer className="cookie-policy-footer">
          <p><strong>I-WIN Learning Solutions Private Limited</strong></p>
          <p><em>Discover Strengths. Develop Capabilities. Choose the Right Career.</em></p>
          <p>© 2026 I-WIN Learning Solutions Private Limited. All Rights Reserved.</p>
        </footer>
      </article>
    </main>
  );
}
