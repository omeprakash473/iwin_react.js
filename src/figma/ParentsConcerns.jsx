import React from 'react';
import InformationPage from '../components/InformationPage.jsx';
import {parentQuestions} from '../data/parentQuestions.js';

export default function ParentsConcerns() {
  return <InformationPage title="Parents’ Concerns" description="Parents’ concerns and how I-WIN Pathway can help."><article>
    <section><h2>Parents’ concerns and how I-WIN can help</h2><div className="school-agreement-table-wrap"><table className="parent-concerns-table"><thead><tr><th scope="col">Parents’ concerns</th><th scope="col">How I-WIN Pathway can help</th></tr></thead><tbody>{parentQuestions.slice(0,12).map(([question,answer],index) => <tr key={question}><td className="concern-question">{index+1}. {question}</td><td>{answer}</td></tr>)}</tbody></table></div>
      {parentQuestions.slice(12).map(([question,answer]) => <div className="parent-concern-extra" key={question}><h3>{question}</h3><p>{answer}</p></div>)}
    </section>
  </article></InformationPage>;
}
