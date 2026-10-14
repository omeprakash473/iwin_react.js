const fs=require('fs');
for(const route of ['landing','login','signup','forgot-password','checkout','success']) { fs.mkdirSync('dist/'+route,{recursive:true}); fs.copyFileSync('dist/index.html','dist/'+route+'/index.html'); }
fs.writeFileSync('dist/.nojekyll','');
