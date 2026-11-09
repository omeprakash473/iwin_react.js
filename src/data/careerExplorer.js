export const careers=[
 {id:'aerospace',title:'Aerospace Engineer',category:'Aircraft & space',description:'Design and test aircraft, satellites and the systems that help them fly.',interests:'Maths · Physics · Building & testing',study:'Aerospace, Aeronautical or related engineering'},
 {id:'robotics',title:'Robotics Engineer',category:'Robots & automation',description:'Combine machines, electronics and code to make robots work.',interests:'Mechanics · Logic · Coding',study:'Robotics, Mechatronics or related engineering'},
 {id:'ai',title:'AI / Machine Learning Engineer',category:'Data & software',description:'Use data and code to build systems that recognise patterns and learn.',interests:'Maths · Patterns · Coding',study:'Computer Science, AI, Data Science or Maths'},
 {id:'mechanical',title:'Mechanical Engineer',category:'Design & machines',description:'Design and improve machines, parts and systems used in everyday life.',interests:'Mechanics · Spatial thinking · Design',study:'Mechanical or related engineering'},
 {id:'data',title:'Data Scientist',category:'Data & analytics',description:'Use data and statistics to find patterns and help people make better decisions.',interests:'Maths · Patterns · Data thinking',study:'Maths, Statistics, Computer Science or Data Science'},
];
export const explorerViews=['about','study','india','international','opportunities','skills','roadmap','resources'];
export function explorerLocation(search) {
 const query=new URLSearchParams(search);
 const career=careers.find(item=>item.id===query.get('career'));
 const view=explorerViews.includes(query.get('view'))?query.get('view'):'about';
 return {career,view:career && career.id!=='aerospace'?'about':view,search:query.get('q')?.trim()||''};
}
export function explorerLink(career,view='about') {
 return '/career-explorer?'+new URLSearchParams({career,view}).toString();
}
export const indiaColleges=[
 {id:'iitb',name:'IIT Bombay',initial:'B',place:'Mumbai, Maharashtra',course:'BTech · Aerospace Engineering',description:'Explore aircraft and space systems, design and testing.',url:'https://www.iitb.ac.in/'},
 {id:'iitm',name:'IIT Madras',initial:'M',place:'Chennai, Tamil Nadu',course:'BTech · Aerospace Engineering',description:'Look at the curriculum, labs and engineering projects.',url:'https://www.iitm.ac.in/'},
 {id:'iitk',name:'IIT Kanpur',initial:'K',place:'Kanpur, Uttar Pradesh',course:'BTech · Aerospace Engineering',description:'Read the undergraduate course and admission guidance.',url:'https://www.iitk.ac.in/'},
 {id:'iitkgp',name:'IIT Kharagpur',initial:'KGP',place:'Kharagpur, West Bengal',course:'BTech · Aerospace Engineering',description:'Explore the department’s aircraft and space technology work.',url:'https://www.iitkgp.ac.in/'},
];
export const internationalColleges=[
 {id:'mit',name:'MIT',initial:'US',place:'United States',course:'BS · Aerospace Engineering',description:'Explore Course 16, its core subjects and hands-on learning.',url:'https://www.mit.edu/'},
 {id:'stanford',name:'Stanford University',initial:'US',place:'United States',course:'BS · Aeronautics & Astronautics',description:'See how physics, computing and design come together.',url:'https://www.stanford.edu/'},
 {id:'delft',name:'TU Delft',initial:'NL',place:'Netherlands',course:'BSc · Aerospace Engineering',description:'Check the programme, language track and selection process.',url:'https://www.tudelft.nl/en/'},
 {id:'cambridge',name:'University of Cambridge',initial:'UK',place:'United Kingdom',course:'Engineering · BA (Hons) / MEng',description:'Broad engineering first; aerospace specialisation later.',url:'https://www.cam.ac.uk/'},
];
export const explorerResources=[
 ['ADMISSIONS','JEE Main','Official notices, syllabus and application information.','https://jeemain.nta.nic.in/',8],
 ['ADMISSIONS','JEE Advanced','Check current IIT entry eligibility and notices.','https://jeeadv.ac.in/',9],
 ['LEARNING','NPTEL','Explore science and engineering learning materials.','https://nptel.ac.in/',13],
 ['LEARNING','MIT OpenCourseWare','Browse open course materials in subjects you enjoy.','https://ocw.mit.edu/',12],
 ['CAREERS','ISRO careers','See real role requirements and recruitment notices.','https://www.isro.gov.in/CareerOpportunities.html',17],
 ['FUNDING','MIT financial aid','Read funding guidance for international applicants.','https://sfs.mit.edu/undergraduate-students/apply-for-aid/international/',16],
];
