export const careerPreviewQuestions=[
 {id:'activity',type:'single',title:'Which activity would you most like to try?',options:[['design','Design a poster for the school festival'],['robot','Find out how a robot works'],['teach','Help a younger student learn something new'],['budget','Organise the event budget and supplies']]},
 {id:'club',type:'multiple',title:'What would you enjoy doing in a school club?',options:[['posters','Make posters or short videos'],['experiment','Build a model or try an experiment'],['explain','Explain an idea to other students'],['team','Plan activities and organise the team'],['none','None of these']]},
 {id:'afternoon',type:'image',title:'Which activity feels most like your kind of afternoon?',options:[['art','Create art and designs','b5d11.png'],['build','Build and experiment','91d5a.png'],['help','Help someone learn','7388c.png'],['nature','Care for nature','5c0b0.png']]},
];

export function selectCareerAnswer(question,current,value) {
 if(!question.options.some(([id])=>id===value))return current;
 if(question.type!=='multiple')return [value];
 if(current.includes(value))return current.filter(id=>id!==value);
 return value==='none' ? ['none'] : [...current.filter(id=>id!=='none'),value];
}
export function careerAnswerValid(question,answer=[]) {
 return answer.length>0 && new Set(answer).size===answer.length &&
  answer.every(id=>question.options.some(([option])=>option===id)) &&
  (question.type==='multiple' || answer.length===1) &&
  !(answer.includes('none') && answer.length>1);
}
