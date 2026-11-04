import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {transformSync} from 'esbuild';

const source=readFileSync(new URL('../src/payments/previewState.js',import.meta.url),'utf8');
function deploymentGate(hostname,enabled='true') {
 const {code}=transformSync(source,{format:'cjs',define:{'import.meta.env':JSON.stringify({DEV:false,VITE_ENABLE_DESIGN_PREVIEW:enabled})}});
 const module={exports:{}};
 runInNewContext(code,{module,exports:module.exports,window:{location:{hostname}}});
 return module.exports.DESIGN_PREVIEW_ENABLED;
}
test('compiled deployment gate enables staging while excluding public production hosts',()=>{
 assert.equal(deploymentGate('pathway-dev.i-winlearning.com'),true);
 assert.equal(deploymentGate('pathway-dev.i-winlearning.com','false'),false);
 for(const host of ['omeprakash473.github.io','pathway.i-winlearning.com','www.i-winlearning.com','127.0.0.1','pathway-dev.i-winlearning.com.example.com'])assert.equal(deploymentGate(host),false,host);
});
