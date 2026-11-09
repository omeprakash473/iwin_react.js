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

From checkout, select “Preview payment success · demo preview”, then open Career Interest from the demo dashboard. Its three Figma sample questions support single, multiple and image choice; Back/Next retain selections and Pause resumes in the same tab. Completing the sample updates only the demo dashboard. The 0/6, 1/6 and 6/6 stage controls allow design review. Locked assessment cards show prerequisite guidance. Other assessment screens remain labelled placeholders. My Reports now has a separate result list and sample detail screen described below.

No demo control calls payment orders, attempts, answers or result APIs. Real payment state and API access rules are unchanged. The feature requires sign-in; sample state is scoped to that session in React memory and clears on reload, exit or sign-out. The sample route `/assessment/career-interest` has a generated static entry for staging refreshes and shows no sample assessment without an active demo session. The demo does not create actual reports or payment receipts.

## Payment return page

In the staging or local dashboard preview, the Locked buttons on Personal Data, Aptitude, Subject, Communication and Attitude open the Figma prerequisite guidance dialog until Career Interest is completed. The dialog names the selected assessment and shows the selected sample-response count; Continue resumes the saved question without a second resume dialog, while Dashboard or Close dismisses it. This does not change backend assessment permissions.

`/payment/return` checks backend payment confirmation and supports re-sign-in on a new origin. Inline checkout completion opens this page. See PAYMENT-STAGING.md for root-domain build settings and the required backend routing for `/payment/notify`.


### Career Explorer design preview

The authenticated `/career-explorer` route contains the five-career overview and Aerospace About, Study Path, India Colleges, International Colleges, Skills, Roadmap and Resources screens based on Figma. Opportunities is explicitly labelled a design draft pending the complete design. The other four careers open their supplied summaries; they do not reuse Aerospace college or study details.

All careers, profile strengths and pathways are labelled design examples, not assessment recommendations. College links open official university homepages; exact courses and eligibility must be checked there. Opportunities does not list live vacancies. Search filters the sample careers. College bookmarks and roadmap checkboxes remain in React memory until reload; they are not synced to an account or API. Real personalised recommendations, saved plans and consolidated reports still require backend integration.


### My Reports

Signed-in students can open `/reports` from the sidebar or header. The list reads `GET /api/v1/results/me` and `GET /api/v1/assessments` through the existing authenticated client. Result links use `/reports/detail?assessment=...&completed=...` and match an exact result returned for the current student. Requests are read-only, are not cached, and use the existing session-change protection. Empty, loading, unavailable-result and retry states do not fall back to example results. Caution notes are retained. Score fields are presented as returned; the backend contract does not yet define the scale and interpretation needed for personalised charts or a consolidated report.

On the permitted local/staging preview hosts, `/reports?preview=1` and `/reports/detail?preview=1` show a separately labelled illustrative six-assessment report. This preview does not call result APIs, grant assessment access or persist reports. It is unavailable on public production hosts and when `VITE_ENABLE_DESIGN_PREVIEW=false`. Leaving preview clears its displayed data before loading real results. Print/save PDF uses the browser print dialog; sample notices are retained in print. The counsellor action opens Contact and sends no report data.

The report screens currently follow the existing dashboard style. Fresh high-fidelity Figma report access was blocked by the plan limit, so exact visual comparison is pending. Backend-generated consolidated reports, score-to-chart mapping, server PDF exports and counsellor sharing remain pending.


### I-WIN Buddy rabbit companion

The header has an accessible Buddy on/off switch before and after sign-in. Its browser-only preference is `iwin.buddy.enabled` (`on` or `off`); it does not save a name, answers or progress. No new network service, microphone, sound or chat model is used. The switch works even if browser storage is blocked. The companion is a visual guide, not an answer-checking tutor.

Six consistent rabbit poses cover welcoming, reading, thinking, reassurance, celebration and rest. Explicit question events select a pose; all selections receive the same neutral response. Sample completion is labelled as such. Password fields cause an eyes-closed pose without reading their values, including when a password is revealed. Short CSS movements settle quickly; calm idle blinking pauses in a hidden tab and reduced motion disables movement and blinking.

On desktop, the rabbit sits in a small corner dock. On mobile and account/payment forms it uses normal document flow. Assessment questions use an inline companion in the guidance panel, so the rabbit cannot cover answer choices or Next. Switching Buddy off removes the rabbit; the header switch remains available. Print layouts omit the companion.

The production sprite is `public/assets/buddy/rabbit-poses.webp` (six equal cells, three columns and two rows; about 335 KiB), encoded without resizing from the generated transparent source. Generation notes are in `docs/buddy-art.md`.


Buddy expression update: the welcome now lasts longer, and the landing page/dashboard use curious, encouraging, waving and reading poses in a 12-second cycle. Automatic changes pause in hidden tabs, while a form field is active, and while a native dialog is open. Assessment, payment, account and report screens do not run this exploration cycle. Reduced motion disables the cycle. The larger rabbit is a keyboard-accessible button: hover for a greeting, or tap/click to cycle through four friendly reactions. The header on/off preference continues to apply to every pose and interaction.
