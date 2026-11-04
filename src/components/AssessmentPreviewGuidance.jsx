import React,{useId,useRef} from 'react';
import {navigateTo} from '../auth/AuthContext.jsx';
import {useDevelopmentPreview} from '../payments/DevelopmentPreview.jsx';
import {careerPreviewQuestions,careerAnswerValid} from '../data/careerPreviewQuestions.js';
import '../figma/CareerInterestPreview.css';

const assets=import.meta.env.BASE_URL+'assets/';
export default function AssessmentPreviewGuidance({assessment}) {
 const preview=useDevelopmentPreview();
 const dialog=useRef(null);
 const id=useId();
 if(!preview.available || preview.stage!=='paid')return null;
 const answered=careerPreviewQuestions.filter(question=>careerAnswerValid(question,preview.careerDraft?.answers?.[question.id])).length;
 function resume() {
  dialog.current.close();
  preview.setCareerDraft(previous=>({index:0,answers:{},done:false,...previous,paused:false}));
  navigateTo('/assessment/career-interest');
 }
 return <><button className="student-assessment-locked aptitude-guidance-trigger" type="button" aria-label={assessment+' locked — complete Career Interest first'} onClick={()=>dialog.current.showModal()}><img src={assets+'dashboard/17c41.svg'} alt=""/>Locked</button>
 <dialog ref={dialog} className="career-discovery-dialog" aria-labelledby={id+'-title'} aria-describedby={id+'-description'}>
  <button type="button" className="career-dialog-close" aria-label="Close next step guidance" onClick={()=>dialog.current.close()}><img src={assets+'career-preview/b9ba7.svg'} alt=""/></button>
  <p className="career-eyebrow">Next step guidance · demo preview</p>
  <div className="career-discovery-mascot"><img src={assets+'career-preview/115db.svg'} alt=""/></div>
  <p className="career-eyebrow">0/6 sections completed · simulated</p>
  <h2 id={id+'-title'}>Complete Career Interest first</h2>
  <p id={id+'-description'}>{assessment} opens when you finish Career Interest. {answered?'You’re already on your way—pick up where you left off.':'Start with Career Interest to explore what you enjoy.'}</p>
  <div className="career-resume-progress"><strong>Career Interest · {answered?'In progress':'Not started'}</strong><progress value={answered} max={careerPreviewQuestions.length}/><p>{answered} of {careerPreviewQuestions.length} sample responses selected · local memory only</p></div>
  <div className="career-discovery-actions"><button type="button" className="btn btn-primary" onClick={resume}>Continue Career Interest →</button><button type="button" className="btn btn-outline" onClick={()=>dialog.current.close()}>Dashboard</button></div>
 </dialog></>;
}
