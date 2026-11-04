// Preview state never grants API access and is never persisted.
export function previewAllowed(development, hostname, enabled=true) {
 return enabled === true && (hostname === 'pathway-dev.i-winlearning.com' ||
  (development === true && ['localhost','127.0.0.1','[::1]','::1'].includes(hostname)));
}
// Ordinary builds support the named test domain; every other public host is denied.
// Set VITE_ENABLE_DESIGN_PREVIEW=false at build time to disable the demo everywhere.
export const DESIGN_PREVIEW_ENABLED=previewAllowed(import.meta.env?.DEV===true,
 typeof window==='undefined'?'':window.location.hostname,
 import.meta.env?.VITE_ENABLE_DESIGN_PREVIEW!=='false');
export function previewCompleted(stage) {
 return stage === 'complete' ? 6 : stage === 'career' ? 1 : 0;
}
export function previewCardState(stage, title) {
 if (!stage) return 'locked';
 if (stage === 'complete' || (stage === 'career' && title === 'Career Interest')) return 'completed';
 return title === 'Career Interest' || stage === 'career' ? 'available' : 'locked';
}
