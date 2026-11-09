// Values from /openapi/auth.json, UserCreate. Both boards currently share this list.
export const signupBoards = [['cbse', 'CBSE'], ['state', 'State Board']];
export const signupSubjects = [
  ['mathematics', 'Mathematics'], ['physics', 'Physics'], ['chemistry', 'Chemistry'],
  ['biology', 'Biology'], ['computer_science', 'Computer Science'], ['economics', 'Economics'],
  ['commerce', 'Commerce'], ['accountancy', 'Accountancy'], ['business_studies', 'Business Studies'],
  ['history', 'History'], ['political_science', 'Political Science'], ['geography', 'Geography'],
  ['psychology', 'Psychology'], ['sociology', 'Sociology'], ['english', 'English'],
  ['second_language', 'Second Language'],
];
export const minSignupSubjects = 3;
export const maxSignupSubjects = 4;

export function requiresSignupSubjects(classStandard) {
  return [11, 12].includes(Number(classStandard));
}

export function signupSelectionError(board, subjects, classStandard) {
  if (!signupBoards.some(([value]) => value === board)) return 'Please select CBSE or State Board.';
  if (!requiresSignupSubjects(classStandard)) return '';
  if (!Array.isArray(subjects) || subjects.length < minSignupSubjects || subjects.length > maxSignupSubjects) return 'Please select at least 3 and no more than 4 subjects.';
  if (new Set(subjects).size !== subjects.length) return 'Please select different subjects.';
  if (subjects.some(subject => !signupSubjects.some(([value]) => value === subject))) return 'Please select subjects from the available choices.';
  return '';
}
