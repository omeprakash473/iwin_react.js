const scoredRows = [['Duration:', '100 Minutes'], ['Correct Response:', '+1 mark'], ['Wrong Response:', '0 marks'], ['Unattempted Question:', '0 marks']];
export const serviceAssessments = {
  personality: {
    title: 'Personality Assessment',
    intro: 'Personality is an important aspect in the life and career of a student. Right attitude can help a student to fit into good careers and attain success. Employers hire for attitude.',
    paragraphs: ['The I-WIN Personality Assessment evaluates 25 attitudinal traits like Curiosity, Intrinsic Motivation, Perseverance / Grit, Growth Mindset, Self-Confidence etc.', 'I-WIN first conducts an assessment of your attitudinal traits and then identifies aspects that need improvement. I-WIN provides the needed interventions to improve the aspects identified.'],
    tables: [[['Assessment Name:', 'I-WIN Personality Assessment'], ['Assessment Component:', 'Attitudinal Traits'], ['Total Questions:', '125'], ['Total Traits:', '25'], ['Duration:', '120 Minutes'], ['Pass/Fail:', 'No pass or fail']]],
  },
  aptitude: {
    title: 'Aptitude Development',
    intro: 'Mastery in aptitudinal skills is required for success in any career. Basic aptitude includes Numerical Skills, Analytical Skills, Critical Thinking Skills, and many more.',
    paragraphs: ['I-WIN imparts instruction in 16 aptitudes through mentoring and practice. Many tests are conducted during the instruction to determine the progress made by the student.', 'When these skills are mastered, the student tends to demonstrate a superior performance in the competitive examinations and in career.'],
    tables: [[['Assessment Name:', 'I-WIN Aptitude Assessment'], ['Assessment Component:', 'Aptitude Skills'], ['Total Questions:', '100'], ...scoredRows, ['Maximum Score:', '100 marks']]],
  },
  subject: {
    title: 'Subject Knowledge Assessment',
    lead: false,
    intro: 'I-WIN imparts instruction in core subjects through combination of self-learning through I-WIN Learning Portal, Online instruction, and weekly tests. This is aimed at bringing thoroughness in the learning of each subject through repeat questioning and revision.',
    paragraphs: ['To begin with students knowledge in each subject is assessed and students guided to the right resources at I-WIN to gain expertise in the subject.', 'I-WIN schedules the instruction and mentoring to students and constantly improves their performance through continuous testing. Reports on improvement are shared with the student and the parent.'],
    tables: [
      [['Assessment Name:', 'I-WIN Subject Knowledge Assessment'], ['Applicable Classes:', '6th to 10th'], ['Assessment Component:', 'Subject Knowledge'], ['Total Questions:', '100'], ['Duration:', '100 Minutes'], ['Subjects covered:', 'core subjects'], ...scoredRows.slice(1), ['Maximum Score:', '100 marks']],
      [['Assessment Name:', 'I-WIN Subject Knowledge Assessment'], ['Applicable Classes:', '11th and 12th'], ['Assessment Component:', 'Subject Knowledge'], ['Total Questions:', '40'], ...scoredRows, ['Maximum Score:', '100 marks']],
    ],
  },
  student: {
    title: 'Student Profile',
    intro: 'Every registered student will complete the personal profile. The purpose of profiling is to understand the unique background of each student and guide the student into appropriate career paths.',
    paragraphs: ['Profile captures the usual habits, hobbies, domestic and family relationships, parents support, financial status and more importantly student’s passion and life goals.'],
    tables: [[['Assessment Name:', 'I-WIN Student Personal Profile Assessment'], ['Applicable Classes:', 'All Classes'], ['Assessment Component:', 'Student Personal Profiling'], ['Total Questions:', '62'], ['Duration:', '45 Minutes'], ['Assessment Result:', 'No pass or fail']]],
  },
  communication: {
    title: 'Communication Assessment',
    intro: 'Effective communication is essential for academic success, personal development, higher education, and future career opportunities. Strong communication skills help students express their ideas clearly, understand information accurately, interact confidently, and communicate effectively in academic and professional environments.',
    paragraphs: ['The I-WIN Communication Assessment evaluates students’ English language knowledge and communication abilities across 12 key areas. The assessment helps identify strengths and areas requiring improvement in vocabulary, grammar, reading, listening, speaking, and writing.', 'Based on the assessment results, I-WIN recommends suitable learning resources, practice activities, and developmental interventions to improve students’ communication skills and confidence.'],
    tables: [[['Assessment Name:', 'I-WIN Communication Assessment'], ['Applicable Classes:', '8th to 12th'], ['Assessment Component:', 'Communication Skills'], ['Total Questions:', '100'], ...scoredRows]],
  },
};
