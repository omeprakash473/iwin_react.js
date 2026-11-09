// Preview state never grants API access and is never persisted.
export function previewAllowed(development, hostname) {
 return development === true && ['localhost','127.0.0.1','[::1]','::1'].includes(hostname);
}
export function previewCompleted(stage) {
 return stage === 'complete' ? 6 : stage === 'career' ? 1 : 0;
}
export function previewCardState(stage, title) {
 if (!stage) return 'locked';
 if (stage === 'complete' || (stage === 'career' && title === 'Career Interest')) return 'completed';
 return title === 'Career Interest' || stage === 'career' ? 'available' : 'locked';
}
