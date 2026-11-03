const fs=require('fs');
for(const route of ['cookie-policy','refund-policy','faqs','student-assessment-disclaimer','terms-of-services','privacy-policy','school-agreement','landing','dashboard','dashboard-progress','profile','change-password','login','signup','forgot-password','checkout','success','payment/return']) { fs.mkdirSync('dist/'+route,{recursive:true}); fs.copyFileSync('dist/index.html','dist/'+route+'/index.html'); }
fs.writeFileSync('dist/.nojekyll','');
