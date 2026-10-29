import Link from '../components/Link.jsx';

const refundSchedule = [
  ['Cancellation within 7 calendar days of payment, before accessing paid services', '100% refund'],
  ['Cancellation within 7 calendar days after completing one or more assessments', 'No refund'],
  ['Cancellation after 7 calendar days but before completing one or more assignments', '50% refund'],
  ['Duplicate payment or payment collected in error', '100% refund of the excess or erroneous payment'],
  ['I-WIN is unable to provide the purchased service', 'Refund of the proportion for the undelivered service'],
];

const sections = [
  {
    title: '1. Introduction',
    paragraphs: [
      'I-WIN Learning Solutions Private Limited (“I-WIN”, “Company”, “we”, “us” or “our”) is committed to providing high-quality educational assessments, academic learning resources, competitive examination preparation and career guidance services through the I-WIN Pathway Program.',
      'We recognise that parents and students may occasionally need to cancel their enrolment or request a refund.',
      'This Fee Refund and Cancellation Policy explains the circumstances under which cancellations and refunds may be requested, the applicable deductions, the refund procedure and the expected processing timelines.',
      'This Policy forms part of the Terms and Conditions governing subscriptions to the I-WIN Pathway Program.',
    ],
  },
  {
    title: '2. Applicability',
    paragraphs: [
      'This Policy applies to individual subscriptions purchased directly from I-WIN through its website, authorised payment channels or sales representatives.',
      'The Program may include student profiling and individual assessments; career interest, personality, attitudinal and aptitude assessments; communication skills assessments; academic learning resources and online practice tests; competitive examination preparation; individual student development reports; career guidance and counselling; and printed books or other educational materials, where included.',
      'Institutional subscriptions purchased by schools, government departments or other organisations may be governed by separate written agreements.',
    ],
  },
  {
    title: '3. Subscription confirmation',
    paragraphs: [
      'A subscription is considered confirmed when the applicable payment has been successfully received, registration has been completed, and I-WIN has issued confirmation of enrolment or activated the subscribed services.',
      'The subscription validity period and included services shall be communicated at the time of purchase.',
    ],
  },
  {
    title: '4. Cancellation and refund eligibility',
    paragraphs: [
      'I-WIN proposes the following refund structure for individual subscriptions:',
    ],
    table: true,
    ending: [
      'For the purposes of this Policy, the seven-day period begins on the date of successful payment.',
      'Where multiple services have been used, the applicable refund category shall be determined by the most advanced service stage completed, subject to the terms disclosed at purchase and applicable law.',
      'These percentages are proposed commercial terms and should be approved by I-WIN management before publication.',
    ],
  },
  {
    title: '5. Assessment and report services',
    paragraphs: [
      'Assessment services involve questionnaire administration, scoring, analysis, report preparation and associated technology resources.',
      'Where a student has completed an assessment or received an individual report, the applicable refund may be reduced according to Section 4.',
      'If an assessment cannot be completed because of a verified I-WIN system failure, I-WIN shall provide a reasonable opportunity to complete it without additional charges.',
      'Where I-WIN is unable to remedy a material service failure, an appropriate refund or other remedy shall be provided in accordance with applicable law.',
    ],
  },
  {
    title: '6. Digital learning portal subscriptions',
    paragraphs: [
      'The I-WIN Learning Portal may include study notes, animated lessons, practice questions, previous examination papers, mock examinations and performance analytics.',
      'Refund eligibility for voluntary cancellation shall follow the schedule in Section 4.',
      'A student’s decision not to use the available learning resources does not automatically entitle the purchaser to a refund after the applicable cancellation period.',
      'However, where purchased services are not supplied, are materially deficient or are unavailable due to a failure attributable to I-WIN, statutory rights and applicable remedies shall remain available.',
    ],
  },
  {
    title: '7. Printed books and educational materials',
    paragraphs: [
      'Where the subscription includes printed books or other physical materials:',
      '7.1 If the order is cancelled before dispatch, the cancellation shall be considered under Section 4.',
      '7.2 If materials have been dispatched, any refund calculation may take account of the disclosed value of materials supplied and reasonable non-recoverable delivery costs, subject to applicable law.',
      '7.3 Where books are delivered damaged, defective or materially different from those ordered, the purchaser may request replacement or an appropriate refund.',
      '7.4 Such issues should preferably be reported within seven calendar days of delivery, with relevant details or photographs where available. This reporting preference does not limit statutory rights.',
      '7.5 Returns, where required, shall be arranged according to the instructions provided by I-WIN.',
    ],
  },
  {
    title: '8. Career counselling services',
    paragraphs: [
      'Where individual counselling sessions are included in a subscription:',
      '8.1 A scheduled session may be rescheduled with reasonable advance notice, subject to counsellor availability.',
      '8.2 If I-WIN cancels a session, an alternative appointment shall be offered.',
      '8.3 If I-WIN cannot provide the purchased counselling service within a reasonable period, the purchaser may request an appropriate refund for the undelivered service.',
      '8.4 Counselling sessions already delivered may be considered when determining a voluntary cancellation refund, as disclosed under Section 4.',
    ],
  },
  {
    title: '9. Refunds for technical problems',
    paragraphs: [
      'If a subscriber experiences a material technical problem preventing access to a purchased service, the subscriber should contact I-WIN customer support. I-WIN shall investigate the issue and, where appropriate, offer:',
    ],
    list: [
      'Restoration of access.',
      'Extension of subscription validity.',
      'An alternative method of delivering the service.',
      'A proportionate refund for an undelivered service.',
    ],
    ending: [
      'Temporary interruptions caused by the subscriber’s internet connection or incompatible devices will ordinarily be addressed through technical assistance and do not automatically qualify for a refund.',
      'Nothing in this section restricts rights arising from deficient services under applicable law.',
    ],
  },
  {
    title: '10. Duplicate or erroneous payments',
    paragraphs: [
      'If a payment is deducted more than once for the same transaction, or an amount is collected in error, the purchaser should contact I-WIN with the transaction details.',
      'Following verification, I-WIN shall arrange a full refund of the excess or erroneous amount.',
      'The purchaser shall not be charged a cancellation fee for a verified duplicate or erroneous payment.',
    ],
  },
  {
    title: '11. Institutional and bulk subscriptions',
    paragraphs: [
      'Subscriptions purchased by schools, educational societies, government departments or other institutions may be subject to separate contractual terms.',
      'Such agreements may specify the number of students enrolled; program commencement and implementation schedules; assessment and learning service milestones; pricing and payment schedules; cancellation and refund provisions; treatment of unused licences; and responsibilities for printed materials and delivered services.',
      'Where a separate agreement applies, its refund provisions shall govern to the extent permitted by applicable law.',
    ],
  },
  {
    title: '12. Procedure for requesting a refund',
    paragraphs: [
      'A parent, lawful guardian or other authorised purchaser may submit a refund request through the designated customer support email. The request should include:',
    ],
    list: [
      'Student name and registered Student ID, if available.',
      'Name of the purchaser.',
      'Registered email address or mobile number.',
      'Subscription or program name.',
      'Payment date, amount and transaction reference.',
      'Reason for cancellation or refund request.',
    ],
    ending: [
      'I-WIN may request additional information reasonably necessary to verify the transaction or the requester’s authority.',
    ],
    ending: ['Refund Request Email: support@i-winlearning.com'],
  },
  {
    title: '13. Refund processing timelines',
    paragraphs: ['I-WIN shall ordinarily:'],
    list: [
      'Acknowledge a refund request within 3 working days.',
      'Communicate its decision within 7 working days after receiving the necessary information.',
      'Initiate an approved refund within 7 working days of approval.',
    ],
    ending: [
      'The time taken for the amount to appear in the purchaser’s account may depend on the bank, card issuer, payment gateway or other payment provider.',
      'Refunds shall ordinarily be made through the original payment method unless another lawful arrangement is agreed.',
      'Where applicable law requires a shorter period or a different procedure, the statutory requirement shall prevail.',
    ],
  },
  {
    title: '14. Non-transferability',
    paragraphs: [
      'Individual subscriptions are ordinarily non-transferable to another student.',
      'Requests involving exceptional circumstances may be considered by I-WIN on a case-by-case basis.',
      'Any approved transfer shall be subject to identity verification, applicable service restrictions and data protection requirements.',
    ],
  },
  {
    title: '15. Changes to this Policy',
    paragraphs: [
      'I-WIN may update this Policy periodically. The updated version shall be published on the website with its effective date.',
      'Changes shall not retrospectively reduce refund rights applicable to subscriptions already purchased, except where permitted by law and appropriately agreed.',
    ],
  },
  {
    title: '16. Consumer rights',
    paragraphs: [
      'Nothing in this Policy excludes, limits or overrides any statutory rights available under the Consumer Protection Act, 2019, or other applicable Indian laws.',
      'Where services are not delivered as promised, are materially deficient or involve unfair trade practices, the purchaser shall retain the remedies available under applicable law.',
    ],
  },
  {
    title: '17. Customer support and grievance redressal',
    paragraphs: [
      'For cancellations, refund requests or related complaints, please contact:',
      'I-WIN Learning Solutions Private Limited',
      'Hyderabad, Telangana, India',
      'Website: www.i-winlearning.com',
      'Support Email: support@i-winlearning.com',
      'Telephone: +91-9491953078',
      'Registered Office: 4th Floor – Pent House, NSL Residency, Sai Nagar, Chaitanyapuri, Hyderabad - 500060, Telangana, India',
      'Grievance Officer: B. Vasantha Laxmi',
      'Grievance Email: vasantha@i-winlearning.com',
      'Complaints shall be handled in accordance with applicable legal requirements and prescribed timelines.',
    ],
  },
];

function renderPolicyParagraph(paragraph) {
  const contacts = [
    ['Refund Request Email: ', 'support@i-winlearning.com'],
    ['Support Email: ', 'support@i-winlearning.com'],
    ['Grievance Email: ', 'vasantha@i-winlearning.com'],
  ];
  const contact = contacts.find(([label]) => paragraph.startsWith(label));
  if (contact) {
    const [label, email] = contact;
    return <>{label}<a href={`mailto:${email}`}>{email}</a></>;
  }
  if (paragraph.startsWith('Website: ')) {
    return <>Website: <a href="https://www.i-winlearning.com">www.i-winlearning.com</a></>;
  }
  return paragraph;
}

export default function RefundPolicy() {
  return (
    <main id="main-content" className="account-page">
      <article className="account-card policy-card refund-policy">
        <Link href="/">← Back to home</Link>
        <header className="form-heading">
          <p className="eyebrow">I-WIN Pathway Program</p>
          <h1>Fee Refund and Cancellation Policy</h1>
          <p><strong>I-WIN Learning Solutions Private Limited</strong></p>
          <p>Website: <a href="https://www.i-winlearning.com">www.i-winlearning.com</a></p>
          <p>Effective Date: October 23rd 2026</p>
          <p>Last Updated: October 23rd 2026</p>
        </header>

        {sections.map(section => (
          <section className="refund-policy-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map(paragraph => <p key={paragraph}>{renderPolicyParagraph(paragraph)}</p>)}
            {section.list && (
              <ul>
                {section.list.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
            {section.table && (
              <div className="refund-table-wrap">
                <table className="refund-table">
                  <thead>
                    <tr><th scope="col">Circumstances</th><th scope="col">Refund eligibility</th></tr>
                  </thead>
                  <tbody>
                    {refundSchedule.map(([circumstance, eligibility]) => (
                      <tr key={circumstance}><td>{circumstance}</td><td>{eligibility}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.ending?.map(paragraph => <p key={paragraph}>{renderPolicyParagraph(paragraph)}</p>)}
          </section>
        ))}

        <footer className="cookie-policy-footer">
          <p><strong>I-WIN Learning Solutions Private Limited</strong></p>
          <p><em>Discover Strengths. Develop Capabilities. Build a Successful Future.</em></p>
          <p>© 2026 I-WIN Learning Solutions Private Limited. All Rights Reserved.</p>
        </footer>
      </article>
    </main>
  );
}
