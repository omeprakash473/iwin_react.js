import {authorizedRequest} from '../auth/client.js';
const object=value=>value!==null && typeof value==='object' && !Array.isArray(value);
export function validateResults(data) {
 if(!Array.isArray(data?.items) || !data.items.every(item=>object(item) && typeof item.assessment==='string' && item.assessment.trim() && typeof item.completed_at==='string' && Number.isFinite(Date.parse(item.completed_at)) && object(item.scores) && typeof item.caution==='boolean' && (item.caution_note===null || typeof item.caution_note==='string')))throw new Error('The server returned an unreadable results response. Please retry or contact support.');
 return [...data.items].sort((a,b)=>Date.parse(b.completed_at)-Date.parse(a.completed_at));
}
export async function getMyResults() {return validateResults(await authorizedRequest('/api/v1/results/me',undefined,true,'GET'));}
export async function getAssessmentStates() {
 const data=await authorizedRequest('/api/v1/assessments',undefined,true,'GET');
 if(!Array.isArray(data?.items) || !data.items.every(item=>typeof item?.id==='string' && typeof item.name==='string' && ['locked','available','in_progress','completed'].includes(item.state)))throw new Error('Assessment status is temporarily unavailable.');
 return data.items;
}
export function assessmentTitle(value) {const name=String(value).replace(/[_-]+/g,' ').trim();return name.replace(/\b\w/g,c=>c.toUpperCase());}
export function reportLink(result) {return '/reports/detail?assessment='+encodeURIComponent(result.assessment)+'&completed='+encodeURIComponent(result.completed_at);}
export function findResult(results,search) {const query=new URLSearchParams(search);return results.find(item=>item.assessment===query.get('assessment') && item.completed_at===query.get('completed')) || null;}
// The contract leaves scores untyped. Preserve values without inventing percentages or chart scales.
export function scoreRows(scores,prefix='',depth=0) {
 if(depth>8)return [[prefix,'More detail is available from support.']];
 return Object.entries(scores).flatMap(([key,value])=>{
  const label=[prefix,assessmentTitle(key)].filter(Boolean).join(' / ');
  if(value===null)return [[label,'Not provided']];
  if(typeof value==='object')return Object.keys(value).length?scoreRows(value,label,depth+1):[[label,'Not provided']];
  return [[label,String(value)]];
 });
}
