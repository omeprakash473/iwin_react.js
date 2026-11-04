import React,{useEffect,useRef,useState} from 'react';
import {navigateTo} from '../auth/AuthContext.jsx';
import Link from '../components/Link.jsx';
import StudentSidebar from '../components/StudentSidebar.jsx';
import {useDevelopmentPreview} from '../payments/DevelopmentPreview.jsx';
import {careerPreviewQuestions as questions,selectCareerAnswer,careerAnswerValid} from '../data/careerPreviewQuestions.js';
import './StudentDashboard.css';
import './CareerInterestPreview.css';

const emptyDraft={index:0,answers:{},paused:false,done:false};
const assets=import.meta.env.BASE_URL+'assets/career-preview/';
export default function CareerInterestPreview() {
 const preview=useDevelopmentPreview();
 const draft=preview.careerDraft || emptyDraft;
 const question=questions[draft.index] || questions[0];
 const answer=draft.answers[question.id] || [];
 const answered=questions.filter(q=>careerAnswerValid(q,draft.answers[q.id])).length;
 const [error,setError]=useState('');
 const [popup,setPopup]=useState(draft.paused?'resume':draft.done?'complete':null);
 const dialog=useRef(null);const title=useRef(null);
 useEffect(()=>{if(popup)dialog.current?.showModal();},[popup]);
 useEffect(()=>{setError('');if(!popup)title.current?.focus();},[draft.index,popup]);
 const update=patch=>preview.setCareerDraft(previous=>({...emptyDraft,...previous,...patch}));
 function choose(value) {update({answers:{...draft.answers,[question.id]:selectCareerAnswer(question,answer,value)}});setError('');}
 function next(event) {
  event.preventDefault();
  if(!careerAnswerValid(question,answer)){setError('Choose at least one answer to continue.');return;}
  if(draft.index<questions.length-1){update({index:draft.index+1});return;}
  if(answered!==questions.length){setError('Answer all three sample questions before finishing.');return;}
  update({done:true,paused:false});preview.setStage('career');setPopup('complete');
 }
 function closePopup() {dialog.current?.close();setPopup(null);if(popup==='complete')navigateTo('/dashboard');else update({paused:false});}
 if(!preview.available || !preview.stage)return <main id="main-content" className="account-page"><section className="account-card"><h1>Career Interest design preview</h1><p>Start the local payment preview from checkout to explore these sample screens. Real assessment integration is still pending.</p><Link className="btn btn-primary" href="/dashboard">Back to dashboard</Link></section></main>;
 return <div className="student-dashboard-shell career-preview-shell"><StudentSidebar onReports={()=>setPopup('reports')}/>
  <main id="main-content" className="career-preview-main">
   <div className="career-preview-notice" role="status">Local design preview · 3 sample questions · answers stay in this tab’s memory and clear on reload.</div>
   <div className="career-question-progress"><span>Question {draft.index+1} of {questions.length}</span><div role="progressbar" aria-label="Sample questions answered" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answered}><span style={{width:answered/questions.length*100+'%'}}/></div><span>Untimed preview</span></div>
   <div className="career-preview-body"><aside className="career-guidance"><section className="career-info-card"><p className="career-eyebrow">Discovery stop 01 / 06</p><h2>Career Interest</h2><p>{draft.done?'1 of 6 sections completed in this demo.':'0 of 6 sections completed · Career Interest in progress.'} Your report unlocks after all 6.</p></section><section className="career-guidance-card"><h2>There’s room to be yourself.</h2><p>This sample helps you explore your preferences and habits. It is not a label or a final career decision. Pause whenever you need to.</p><img src={assets+'115db.svg'} alt=""/></section></aside>
   <form className="career-question-form" onSubmit={next}>
    <section className="career-question-heading"><p className="career-eyebrow">Sample question</p><h1 id="career-question-title" ref={title} tabIndex={-1}>{question.title}</h1><p id="career-question-help">{question.type==='multiple'?'Choose all that apply. Select at least one activity, or “None of these” on its own.':'Choose one answer. Think about what you would genuinely enjoy—not what others expect.'}</p><strong>Sample question {draft.index+1} of {questions.length} · Illustrative content</strong></section>
    <fieldset className={'career-answers'+(question.type==='image'?' career-image-answers':'')} aria-labelledby="career-question-title" aria-describedby="career-question-help"><legend className="career-sr-only">Choose your answer</legend>{question.options.map(([id,label,image])=><label key={id} className={'career-answer'+(answer.includes(id)?' selected':'')+(image?' image-answer':'')}>
     {image && <img className="career-activity-image" src={assets+image} alt=""/>}
     <span className="career-answer-label"><input type={question.type==='multiple'?'checkbox':'radio'} name={question.id} value={id} checked={answer.includes(id)} onChange={()=>choose(id)}/><span className={'career-choice-mark'+(question.type==='multiple'?' checkbox':'')} aria-hidden="true">{answer.includes(id) && (question.type==='multiple'?'✓':<img src={assets+'5d4ce.svg'} alt=""/>)}</span><span>{label}</span></span>
    </label>)}</fieldset>
    {error && <p className="field-error" role="alert">{error}</p>}
    <div className="career-question-actions"><button type="button" className="btn btn-outline" disabled={draft.index===0} onClick={()=>update({index:draft.index-1})}>← Back</button><div><button type="button" className="btn btn-outline career-pause" onClick={()=>{update({paused:true});navigateTo('/dashboard');}}>Pause &amp; return later <img src={assets+'06ba6.svg'} alt=""/></button><button type="submit" className="btn btn-primary">{draft.index===questions.length-1?'Finish demo →':'Next →'}</button></div></div>
   </form></div>
  </main>
  <dialog ref={dialog} className="career-discovery-dialog" aria-labelledby="career-discovery-title" onCancel={event=>{event.preventDefault();closePopup();}}><button className="career-dialog-close" type="button" aria-label="Close discovery popup" onClick={closePopup}><img src={assets+'b9ba7.svg'} alt=""/></button><p className="career-eyebrow">{popup==='complete'?'A small celebration':'Next step guidance'} · local demo</p><div className={'career-discovery-mascot'+(popup==='complete'?' celebration':'')}><img src={assets+'115db.svg'} alt=""/>{popup==='complete'&&<img src={assets+'41a30.svg'} alt=""/>}</div><p className="career-eyebrow">{popup==='complete'?'1':'0'}/6 sections completed · simulated</p><h2 id="career-discovery-title">{popup==='complete'?'Career Interest complete!':popup==='reports'?'Complete all six sections first':'Complete Career Interest first'}</h2><p>{popup==='complete'?'You’ve explored all three sample questions. The remaining assessment cards are now available in the demo dashboard. No real assessment was submitted and no report was generated.':popup==='reports'?'Reports unlock after all six assessments. This preview does not create real results.':'Your sample answers are kept while this tab stays open. Pick up where you left off; a reload clears this local preview.'}</p><div className="career-resume-progress"><strong>Career Interest · {popup==='complete'?'Completed in demo':'In progress'}</strong><progress value={answered} max={questions.length}/><p>{answered} of {questions.length} sample responses selected</p></div><div className="career-discovery-actions">{popup==='resume'&&<button type="button" className="btn btn-primary" onClick={closePopup}>Continue Career Interest →</button>}<button type="button" className={popup==='complete'?'btn btn-primary':'btn btn-outline'} onClick={()=>{dialog.current.close();navigateTo('/dashboard');}}>Dashboard</button></div></dialog>
 </div>;
}
