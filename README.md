# I-WIN React website

Run `npm install` and `npm run dev`. Build with `npm run build`.

Responsive React layouts for home, login, signup, checkout, and assessment overview. Layouts adapt at 1100, 900, and 600 pixels with a mobile navigation menu, stacked sections, and accessible form controls. Original Figma assets are served locally from public/assets.

Login, token refresh, logout and change password are connected to the development authentication API. Registration is connected to the auth API. Payment status and Cashfree hosted checkout are connected to the development APIs. Profile updates and assessments still need their backend integration. Cashfree defaults to sandbox mode.

## Backend integration

Login, refresh, logout and password updates use the documented auth service at https://api-dev.i-winlearning.com. Run npm test for mocked authentication contract checks.

Local development proxies /backend to that gateway using Vite. Set VITE_API_BASE_URL to override the gateway. Environment variables in Vite builds are public: never add client secrets or private API keys.

Sessions and refresh tokens are kept in sessionStorage for the current tab; passwords are never persisted. Existing preview authentication is removed. Dashboard and account routes now require sign-in. Dashboard progress and profile saving remain previews pending their backend contracts. Forgot-password and Google sign-in APIs are not supplied.

Registration sends username, email, password, class_standard (8–12) and board (cbse/state). Classes 11–12 also select 3–4 subjects from the Swagger list. Classes 8–10 do not see or send subjects. Both boards use the shared subject list until board-specific groups are supplied. Name, phone and city need the separate profile service before they can be collected and saved.

Production CORS must allow https://omeprakash473.github.io. Development direct API calls from http://127.0.0.1:5173 currently fail CORS; npm run dev uses the proxy instead. No real-account successful login or password change was performed during development.

## Payment flow

Sign up → Login → Dashboard, including unpaid accounts. The dashboard remains visible while a background payment check is loading or fails. Career Interest → Start refreshes backend payment status: unpaid accounts go to /checkout; account_unlocked=true accounts bypass checkout and open the existing assessment preview. No questions or assessment progress are recorded by that preview; assessment-taking integration is still pending. Other assessment cards and reports remain locked. The dashboard no longer simulates a completed assessment through /dashboard-progress.

Checkout redirects an already-paid account to /dashboard?career=start. Successful payment return offers Continue to Career Interest, and only backend-confirmed access can open the assessment preview. The success page remains protected by authentication and payment confirmation. Profile and password pages remain accessible before payment.

GET /api/v1/payments/me is authenticated and uncached. A paid timestamp without account unlock waits for backend synchronization; it does not launch another payment. POST /api/v1/payments/orders sends only a validated phone number. The backend owns the amount, currency, identity, order reuse and Cashfree credentials. The client verifies INR 500 before opening checkout.

Cashfree JavaScript SDK v3 opens a hosted modal; I-WIN never collects card numbers, CVV or UPI PINs. Completion callbacks and URL parameters never unlock the account. Status is polled every 3 seconds for at most 2 minutes after checkout, and rechecked on focus or with the Check status button. already_paid and order_in_progress errors recheck status rather than opening another payment.

Set VITE_CASHFREE_MODE=sandbox for the development backend. Confirm the backend Cashfree mode and merchant domain configuration before changing it to production. No Cashfree secret or database credentials belong in frontend configuration. Production API CORS must allow the website origin.

SDK reference: https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout

No real transaction was executed during integration. Automated payment tests mock API responses. The development browser environment was unavailable for a visual checkout test.

## Staging and local design preview

The signed-in demo is enabled on the exact staging hostname `pathway-dev.i-winlearning.com` and on loopback hosts during Vite development. Ordinary `npm run build` deployments support staging without an additional build step. GitHub Pages and other public/production hostnames never enable it. Set `VITE_ENABLE_DESIGN_PREVIEW=false` at build time to turn it off everywhere. The deployment still needs the existing root-path staging settings and API configuration below.

From checkout, select “Preview payment success · demo preview”, then open Career Interest from the demo dashboard. Its three Figma sample questions support single, multiple and image choice; Back/Next retain selections and Pause resumes in the same tab. Completing the sample updates only the demo dashboard. The 0/6, 1/6 and 6/6 stage controls allow design review. Locked assessment cards show prerequisite guidance. Other assessment and report screens remain labelled placeholders.

No demo control calls payment orders, attempts, answers or result APIs. Real payment state and API access rules are unchanged. The feature requires sign-in; sample state is scoped to that session in React memory and clears on reload, exit or sign-out. The sample route `/assessment/career-interest` has a generated static entry for staging refreshes and shows no sample assessment without an active demo session. The demo does not create actual reports or payment receipts.

## Payment return page

In the staging or local dashboard preview, the Locked buttons on Personal Data, Aptitude, Subject, Communication and Attitude open the Figma prerequisite guidance dialog until Career Interest is completed. The dialog names the selected assessment and shows the selected sample-response count; Continue resumes the saved question without a second resume dialog, while Dashboard or Close dismisses it. This does not change backend assessment permissions.

`/payment/return` checks backend payment confirmation and supports re-sign-in on a new origin. Inline checkout completion opens this page. See PAYMENT-STAGING.md for root-domain build settings and the required backend routing for `/payment/notify`.
