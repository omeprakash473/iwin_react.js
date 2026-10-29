import Link from '../components/Link.jsx';

const sections = [
  {
    title: '1. Purpose of student assessments',
    paragraphs: [
      'The I-WIN Pathway Program provides educational assessments designed to help students, parents, teachers and counsellors understand individual interests, strengths, aptitudes, attitudes, communication abilities, academic competencies and potential educational and career pathways.',
      'These assessments are intended exclusively for educational, developmental and career guidance purposes.',
      'The assessments provide structured insights that may assist in identifying areas of strength, opportunities for improvement and suitable learning or career options.',
      'Assessment results are indicative and advisory. They are not definitive judgments of a student’s intelligence, personality, capabilities, future performance or career success.',
    ],
  },
  {
    title: '2. Scope of assessments',
    intro: 'Depending on the subscribed program, I-WIN may administer the following assessments.',
    subsections: [
      ['2.1 Career Interest Assessment', 'Designed to identify the student’s interests, preferences and potential alignment with different career domains. Career interests may evolve with age, experience, education and exposure to new opportunities.'],
      ['2.2 Personality and Attitudinal Assessment', 'Designed to examine behavioural tendencies, attitudes and attributes that may influence learning, personal development and career preferences. Results do not constitute a clinical personality diagnosis or a permanent classification of the student.'],
      ['2.3 Aptitude and Capability Assessment', 'Designed to evaluate selected abilities such as numerical reasoning, logical thinking, verbal reasoning, spatial reasoning, analytical ability and problem-solving. Performance reflects the particular skills and tasks assessed and may be influenced by preparation, familiarity, language proficiency and testing conditions.'],
      ['2.4 Communication Skills Assessment', 'Designed to evaluate selected aspects of English communication, including grammar, vocabulary, comprehension, writing and speaking, where included. Assessment outcomes are intended to identify developmental priorities rather than permanently classify communication ability.'],
      ['2.5 Academic Competency Assessment', 'Designed to evaluate knowledge and understanding of selected academic subjects and identify areas requiring further learning or practice. Scores represent performance on the assessed content at a particular point in time.'],
    ],
  },
  {
    title: '3. Nature and limitations of assessment results',
    paragraphs: [
      'Assessment results are generated from student responses, applicable scoring methodologies and other relevant educational information. Their interpretation may be influenced by:',
    ],
    list: [
      'Accuracy and honesty of student responses.',
      'Age and educational background.',
      'Language comprehension.',
      'Motivation, concentration and familiarity with the assessment format.',
      'Testing environment and technical conditions.',
      'The scope and limitations of the assessment instrument.',
    ],
    ending: [
      'No single assessment can comprehensively measure a student’s full potential.',
      'I-WIN recommends that assessment results be interpreted alongside academic records, personal interests, teacher observations, student aspirations and appropriate counselling.',
    ],
  },
  {
    title: '4. Career-fit recommendations',
    paragraphs: [
      'I-WIN may generate career-fit indicators and recommend potentially suitable career domains based on the student’s assessed interests, aptitudes, attitudinal characteristics and academic competencies.',
      'These recommendations are intended to help students explore educational and career opportunities.',
      'A high career-fit score does not guarantee success in a particular profession. A low score does not mean that a student is incapable of pursuing that profession.',
      'Career-fit indicators reflect the methodology, information and assumptions used at the time of assessment.',
      'They should not be interpreted as eligibility certificates, professional suitability certifications or predictions of future employment.',
    ],
  },
  {
    title: '5. Developmental gaps and improvement recommendations',
    paragraphs: [
      'I-WIN may identify differences between a student’s current assessed capabilities and the competencies considered relevant to particular academic or career pathways.',
      'Such differences are described as developmental gaps.',
      'Developmental gaps are intended to guide learning and improvement. They are not permanent deficiencies or judgments about a student’s worth or potential.',
      'I-WIN may recommend educational resources, exercises, practice activities or counselling to address identified needs.',
      'Actual improvement depends on several factors, including student participation, quality of instruction, practice, learning environment and individual circumstances.',
      'I-WIN does not guarantee that every identified gap can be eliminated or that a specific improvement level will be achieved.',
    ],
  },
  {
    title: '6. Automated scoring and report generation',
    paragraphs: [
      'The I-WIN Pathway Program may use software-based scoring systems, analytical models and automated report-generation processes.',
      'These systems may calculate assessment scores, compare results with defined competency requirements and generate educational recommendations.',
      'Although reasonable efforts are made to maintain accuracy and consistency, automated results may contain limitations, errors or interpretations requiring clarification.',
      'Students and parents are encouraged to seek guidance from an authorised counsellor when assessment findings are unclear, unexpected or materially inconsistent with other information about the student.',
    ],
  },
  {
    title: '7. Scientific validity and reliability',
    paragraphs: [
      'I-WIN seeks to develop and improve its assessment instruments using appropriate educational and assessment principles.',
      'However, the reliability, validity and suitability of any particular assessment depend on its design, administration, scoring, target population and available supporting evidence.',
      'Unless expressly supported by documented validation studies, I-WIN does not represent that an assessment has been clinically validated, standardised against a nationally representative population or independently certified by a professional body.',
      'Assessment results, including any percentile scores or comparative rankings, should be interpreted only within the reference population and methodology disclosed in the relevant report.',
    ],
  },
  {
    title: '8. No medical or psychological diagnosis',
    paragraphs: ['I-WIN assessments are educational tools. They are not intended to diagnose or treat:'],
    list: [
      'Mental health conditions.',
      'Learning disabilities or neurodevelopmental disorders.',
      'Behavioural or psychiatric conditions.',
      'Medical or neurological disorders.',
      'Clinical personality disorders.',
    ],
    ending: ['Where a student requires medical, psychological or specialised educational evaluation, parents should consult appropriately qualified professionals.'],
  },
  {
    title: '9. Academic performance and competitive examinations',
    paragraphs: [
      'Academic assessments and performance analytics may help identify learning gaps and guide preparation for school examinations and competitive entrance examinations.',
      'However, assessment scores and predicted performance indicators do not guarantee:',
    ],
    list: [
      'Higher examination marks.',
      'Qualification in JEE, NEET, CUET, CLAT or other examinations.',
      'A particular rank or percentile.',
      'Admission to any school, college or university.',
      'Scholarships or financial assistance.',
    ],
    ending: ['Examination outcomes depend on the student’s preparation, performance, examination conditions and the requirements of the relevant authorities.'],
  },
  {
    title: '10. Career guidance and educational decisions',
    paragraphs: ['I-WIN’s recommendations are advisory and should not be the sole basis for important educational or career decisions. Students and parents should independently consider:'],
    list: [
      'The student’s interests and aspirations.',
      'Academic strengths and preparedness.',
      'Course eligibility requirements.',
      'Institutional recognition and accreditation.',
      'Financial and geographical considerations.',
      'Current and emerging career opportunities.',
      'Guidance from qualified educators and counsellors.',
    ],
    ending: ['The final decision regarding academic streams, courses, institutions and careers remains with the student and, where appropriate, the parent or lawful guardian.'],
  },
  {
    title: '11. Age-appropriate interpretation',
    paragraphs: [
      'The interests, capabilities and attitudes of school-age students may change as they grow and gain experience.',
      'Assessment results should therefore be interpreted in an age-appropriate manner.',
      'I-WIN recommends periodic reassessment where appropriate, particularly before significant educational decisions.',
      'Earlier assessment results should not permanently restrict the student’s future academic or career choices.',
    ],
  },
  {
    title: '12. Responsible use of student reports',
    paragraphs: [
      'Student assessment reports are intended for the student’s educational and developmental benefit.',
      'Parents, teachers, counsellors and institutions receiving authorised access are encouraged to use the findings constructively.',
      'Reports should not be used to:',
    ],
    list: [
      'Label students as permanently weak or incapable.',
      'Discriminate against students.',
      'Exclude students from educational opportunities solely on the basis of assessment scores.',
      'Publicly disclose sensitive individual assessment findings without appropriate authorisation.',
      'Apply inappropriate pressure to pursue or abandon a particular career.',
    ],
    ending: ['Assessment findings should support encouragement, informed guidance and developmental planning.'],
  },
  {
    title: '13. Confidentiality and data protection',
    paragraphs: [
      'Student assessment responses, scores and reports may constitute personal information.',
      'Their collection, processing, storage, disclosure and retention are governed by the I-WIN Privacy Policy and applicable law.',
      'Access to individual student information shall be restricted to authorised persons for legitimate purposes.',
      'For students below 18 years of age, applicable parental consent and children’s data protection requirements shall be observed.',
    ],
  },
  {
    title: '14. Third-party information',
    paragraphs: [
      'I-WIN may provide information about careers, courses, universities, entrance examinations and professional opportunities.',
      'Such information may change over time.',
      'Students and parents should verify admission requirements, eligibility conditions, course recognition, institutional accreditation and other relevant details directly with official sources.',
      'I-WIN does not guarantee the accuracy or continued availability of independently maintained third-party information.',
    ],
  },
  {
    title: '15. Limitation of liability',
    paragraphs: [
      'I-WIN shall exercise reasonable care in the development, administration and interpretation of its educational assessments.',
      'To the extent permitted by applicable law, I-WIN shall not be responsible for outcomes arising solely from treating advisory assessment recommendations as guaranteed predictions or professional certifications.',
      'Nothing in this Disclaimer shall exclude or restrict liability for deficient services, misleading representations, negligence where liability cannot lawfully be excluded, or any other rights and remedies available under applicable consumer protection laws.',
    ],
  },
  {
    title: '16. Clarifications and review of results',
    paragraphs: [
      'Students and parents who believe an assessment result is inaccurate, incomplete or inconsistent may contact I-WIN for clarification.',
      'Where appropriate and available under the subscribed package, I-WIN may offer:',
    ],
    list: [
      'Explanation of scoring and interpretation.',
      'Review of relevant responses or report-generation errors.',
      'Correction of verified administrative or technical errors.',
      'Guidance on the limitations of the results.',
      'Information regarding reassessment options.',
    ],
    ending: ['A request for clarification does not guarantee a different score or recommendation.'],
  },
  {
    title: '17. Acceptance and acknowledgement',
    paragraphs: ['By participating in an I-WIN assessment, the student and, where required, the parent or lawful guardian acknowledge that:'],
    list: [
      'The assessments are intended for educational and developmental guidance.',
      'Results are indicative and may change over time.',
      'Career recommendations are advisory and not guarantees of success.',
      'Assessment findings should be interpreted alongside other relevant information.',
      'Important educational and career decisions should not rely solely on automated assessment results.',
      'Student information will be handled in accordance with the applicable Privacy Policy.',
    ],
    ending: ['Where consent is legally required, it shall be obtained separately through an appropriate consent process.'],
  },
  {
    title: '18. Contact information',
    paragraphs: [
      'For clarification regarding assessments or individual student reports, please contact:',
      'I-WIN Learning Solutions Private Limited',
      'Hyderabad, Telangana, India',
      'Website: www.i-win.in',
      'Email: support@i-winlearning.com',
      'Telephone: +91-9491953078',
      'Registered Office: 4th Floor – Pent House, NSL Residency, Sai Nagar, Chaitanyapuri, Hyderabad - 500060, Telangana, India',
    ],
  },
];

export default function StudentAssessmentDisclaimer() {
  return (
    <main id="main-content" className="account-page">
      <article className="account-card policy-card assessment-disclaimer">
        <Link href="/">← Back to home</Link>
        <header className="form-heading">
          <p className="eyebrow">I-WIN Pathway Program</p>
          <h1>Student Assessment Disclaimer</h1>
          <p><strong>I-WIN Learning Solutions Private Limited</strong></p>
          <p>Website: <a href="https://www.i-win.in">www.i-win.in</a></p>
          <p>Effective Date: October 23rd 2026</p>
          <p>Last Updated: October 23rd 2026</p>
        </header>
        {sections.map(section => (
          <section className="assessment-disclaimer-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.intro && <p>{section.intro}</p>}
            {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.list && (
              <ul>
                {section.list.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
            {section.subsections?.map(([title, body]) => (
              <div className="assessment-disclaimer-subsection" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
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
