# Payment callback deployment

The frontend implements `/payment/return`. It polls the authenticated `GET /api/v1/payments/me` endpoint every three seconds for up to two minutes, then offers a manual recheck. Backend `account_unlocked: true` is required before rendering success and the dashboard link. Callback query parameters do not grant access. No callback token or account information is placed in the URL by the frontend.

The existing inline checkout now opens this page when the provider finishes. Closing or failing the payment dialog retains checkout recovery. A failed backend payment status offers a recheck and checkout link. A paid payment awaiting account unlock remains pending and does not request a new order.

## Staging build

For `https://pathway-dev.i-winlearning.com`, build with:

```text
VITE_BASE_PATH=/
VITE_API_BASE_URL=/backend
VITE_CASHFREE_MODE=sandbox
```

Use the Cashfree mode that matches the backend; sandbox is the current testing default. These are public build-time variables, not secret credentials. Leaving `VITE_BASE_PATH` unset preserves the existing GitHub Pages path `/iwin_react.js/`.

Deploy `dist/` and serve the React application on `/payment/return`. Configure SPA fallback or use the generated `dist/payment/return/index.html`. The staging server must proxy `/backend/*` to `https://api-dev.i-winlearning.com/*`, stripping `/backend`, or use an API URL whose backend allows the staging origin through CORS. Vite's development proxy is not included in a production build.

The backend developer configures these server-side values when creating Cashfree orders:

```text
PAYMENT_RETURN_URL=https://pathway-dev.i-winlearning.com/payment/return
PAYMENT_NOTIFY_URL=https://pathway-dev.i-winlearning.com/payment/notify
```

The frontend continues to send only `{phone}` when requesting an order. It does not override backend callback URLs.

## Notify routing

`/payment/notify` is NOT a React page. Route POST requests there to the payment service's signed webhook handler before the SPA fallback. The supplied payment-service API contract names that handler `/api/v1/payments/webhook`; confirm the deployed upstream with the backend developer. Forward the raw request body and Cashfree signature/timestamp headers unchanged. The backend verifies the signature, records payment, and unlocks the account. Returning frontend HTML from this URL would not process the webhook.

## Sessions and testing

Login state is in sessionStorage and belongs to a specific origin and tab. A user redirected from a local IP or GitHub Pages to the staging domain may need to sign in again. The return page provides a fixed login link that resumes `/payment/return` after sign-in; it never accepts arbitrary post-login redirects.

Test a full payment from the staging origin after deployment and webhook configuration. Verify pending → unlocked, failure/cancellation, delayed webhook, unavailable API, signed-out return, and retry without duplicate payment. Automated tests use mocked payment responses; they do not prove that Cashfree delivers notifications to staging.
