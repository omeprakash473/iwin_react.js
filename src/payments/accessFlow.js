import {hasPaymentAccess} from './api.js';

// Browsing the dashboard is free; payment protects assessment access.
export function routeRequiresPayment(path) {
  return path === '/success';
}

export function careerStartAction(payment) {
  return hasPaymentAccess(payment) ? 'start' : 'checkout';
}
