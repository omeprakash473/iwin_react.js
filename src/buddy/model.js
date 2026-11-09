export const BUDDY_PREFERENCE='iwin.buddy.enabled';
export function readBuddyPreference(storage) {try{return storage?.getItem(BUDDY_PREFERENCE)!=='off';}catch{return true;}}
export function saveBuddyPreference(storage,enabled) {try{storage?.setItem(BUDDY_PREFERENCE,enabled?'on':'off');}catch{/* The switch still works when browser storage is unavailable. */}}
export const buddyReactions={
 hello:{pose:'wave',text:'Hi there! It’s lovely to see you. 🐾'},
 curious:{pose:'thinking',text:'What will you discover today? Stay curious!'},
 playful:{pose:'support',text:'A small step can lead to a big adventure.'},
 cheer:{pose:'celebrate',text:'A little happy hop, just for you!'},
 selected:{pose:'support',text:'Your selection is updated. You can change your mind.'},
 next:{pose:'thinking',text:'A new question. Take your time and be yourself.'},
 back:{pose:'reading',text:'You can revisit your choices at your own pace.'},
 choose:{pose:'thinking',text:'Choose an answer when you’re ready. There’s no rush.'},
 'sample-complete':{pose:'celebrate',text:'You’ve finished the sample questions! Time for a little celebration.'},
 'account-created':{pose:'celebrate',text:'Your account is ready! Log in whenever you’re ready.'},
 support:{pose:'support',text:'Let’s take it one step at a time. You can try again.'},
 pause:{pose:'rest',text:'A little break is okay. Come back when you’re ready.'}
};
export function buddyContext(route,signedIn,hour=12) {
 if(route.startsWith('/assessment/'))return {pose:'reading',text:'Take your time. Pick what feels like you.'};
 if(['/checkout','/payment/return'].includes(route))return {pose:'reading',text:'Take your time to review the details.'};
 if(route.startsWith('/reports'))return {pose:'reading',text:'Explore your progress at your own pace.'};
 if(route==='/dashboard')return {pose:'wave',text:'Welcome back! One small step at a time.'};
 if(['/login','/signup','/forgot-password','/change-password'].includes(route))return {pose:'wave',text:'Hello! Let’s get you ready for your journey.'};
 const greeting=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
 return {pose:'wave',text:greeting+'! Let’s discover something new together.'};
}
export const buddyPosePosition={wave:['0%','0%'],reading:['50%','0%'],thinking:['100%','0%'],support:['0%','100%'],celebrate:['50%','100%'],rest:['100%','100%']};

export function buddyCanExplore(route){return ['/','/landing','/dashboard'].includes(route);}
export function buddyIdlePose(route,index=0){const poses=['thinking','support','wave','reading'];return buddyCanExplore(route)?poses[Math.abs(index)%poses.length]:'reading';}
