# I-WIN React website

Run `npm install` and `npm run dev`. Build with `npm run build`.

Responsive React layouts for home, login, signup, checkout, and assessment overview. Layouts adapt at 1100, 900, and 600 pixels with a mobile navigation menu, stacked sections, and accessible form controls. Original Figma assets are served locally from public/assets.

Login, token refresh, logout and change password are connected to the development authentication API. Registration is connected to the auth API. Payment status and Cashfree hosted checkout are connected to the development APIs. Profile updates and assessments still need their backend integration. Cashfree defaults to sandbox mode.

## Backend integration

Login, refresh, logout and password updates use the documented auth service at https://api-dev.i-winlearning.com. Run npm test for mocked authentication contract checks.

Local development proxies /backend to that gateway using Vite. Set VITE_API_BASE_URL to override the gateway. Environment variables in Vite builds are public: never add client secrets or private API keys.

Sessions and refresh tokens are kept in sessionStorage for the current tab; passwords are never persisted. Existing preview authentication is removed. Dashboard and account routes now require sign-in. Dashboard progress and profile saving remain previews pending their backend contracts. Forgot-password and Google sign-in APIs are not supplied.

The auth registration contract accepts only username, email, password and class_standard (8–12). Sign up now collects these four supported fields. Name, phone and city will need the separate profile service before they can be collected and saved.

Production CORS must allow https://omeprakash473.github.io. Development direct API calls from http://127.0.0.1:5173 currently fail CORS; npm run dev uses the proxy instead. No real-account successful login or password change was performed during development.

## Payment flow

Sign up → Login → server payment check → unpaid users go to /checkout; account_unlocked=true users go to /dashboard. Direct dashboard and success URLs require both authentication and backend payment confirmation. Profile and password pages remain accessible before payment.

GET /api/v1/payments/me is authenticated and uncached. A paid timestamp without account unlock waits for backend synchronization; it does not launch another payment. POST /api/v1/payments/orders sends only a validated phone number. The backend owns the amount, currency, identity, order reuse and Cashfree credentials. The client verifies INR 500 before opening checkout.

Cashfree JavaScript SDK v3 opens a hosted modal; I-WIN never collects card numbers, CVV or UPI PINs. Completion callbacks and URL parameters never unlock the account. Status is polled every 3 seconds for at most 2 minutes after checkout, and rechecked on focus or with the Check status button. already_paid and order_in_progress errors recheck status rather than opening another payment.

Set VITE_CASHFREE_MODE=sandbox for the development backend. Confirm the backend Cashfree mode and merchant domain configuration before changing it to production. No Cashfree secret or database credentials belong in frontend configuration. Production API CORS must allow the website origin.

SDK reference: https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout

No real transaction was executed during integration. Automated payment tests mock API responses. The development browser environment was unavailable for a visual checkout test.
