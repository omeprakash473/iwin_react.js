import test from 'node:test';
import assert from 'node:assert/strict';
import {careerPreviewQuestions as questions,selectCareerAnswer,careerAnswerValid} from '../src/data/careerPreviewQuestions.js';
test('single and image questions replace the previous selection',()=>{
 for(const q of [questions[0],questions[2]]) {
  const first=q.options[0][0],second=q.options[1][0];
  assert.deepEqual(selectCareerAnswer(q,[first],second),[second]);
  assert.equal(careerAnswerValid(q,[first,second]),false);
  assert.equal(careerAnswerValid(q,[second]),true);
 }
});
test('None of these is mutually exclusive and can be deselected',()=>{
 const q=questions[1];
 assert.deepEqual(selectCareerAnswer(q,['posters','team'],'none'),['none']);
 assert.deepEqual(selectCareerAnswer(q,['none'],'posters'),['posters']);
 assert.deepEqual(selectCareerAnswer(q,['none'],'none'),[]);
 assert.equal(careerAnswerValid(q,['none','posters']),false);
 assert.equal(careerAnswerValid(q,['none']),true);
});
test('multiple choices toggle independently and invalid answer ids cannot complete a question',()=>{
 const q=questions[1];
 assert.deepEqual(selectCareerAnswer(q,['posters'],'team'),['posters','team']);
 assert.deepEqual(selectCareerAnswer(q,['posters','team'],'posters'),['team']);
 assert.deepEqual(selectCareerAnswer(q,['posters'],'unknown'),['posters']);
 for(const answer of [[],['unknown'],['posters','posters']])assert.equal(careerAnswerValid(q,answer),false);
 assert.equal(careerAnswerValid(q,['posters','team']),true);
});
