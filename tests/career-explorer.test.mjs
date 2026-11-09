import test from 'node:test';
import assert from 'node:assert/strict';
import {careers,explorerLocation,explorerLink,indiaColleges,internationalColleges,explorerResources} from '../src/data/careerExplorer.js';
test('all five career cards have distinct navigable summaries',()=>{
 assert.equal(careers.length,5);assert.equal(new Set(careers.map(c=>c.id)).size,5);
 for(const career of careers){assert.equal(explorerLocation(explorerLink(career.id).split('?')[1]).career.id,career.id);assert.ok(career.title&&career.description&&career.study);}
});
test('invalid career/view query parameters cannot show another career pathway',()=>{
 assert.equal(explorerLocation('?career=unknown&view=study').career,undefined);
 assert.equal(explorerLocation('?career=aerospace&view=unknown').view,'about');
 assert.equal(explorerLocation('?career=robotics&view=india').view,'about');
 for(const view of ['about','study','india','international','skills','roadmap','resources','opportunities'])assert.equal(explorerLocation('?career=aerospace&view='+view).view,view);
 assert.equal(explorerLocation('?q=%20physics%20').search,'physics');
});
test('college bookmarks have unique keys and reference links use secure official destinations',()=>{
 const colleges=[...indiaColleges,...internationalColleges];
 assert.equal(new Set(colleges.map(c=>c.id)).size,8);
 for(const url of [...colleges.map(c=>c.url),...explorerResources.map(r=>r[3])])assert.equal(new URL(url).protocol,'https:');
});
