# I-WIN frontend performance review — 23 October 2026

## Outcome

Frontend loading improvements were found and fixed locally. This review does **not** certify that every page is free of performance issues or that all loads finish in 50 ms. The staging deployment measured here still serves the earlier build. Deploy the updated build and repeat browser measurements before signing off performance.

The pending payment-return work is included in the reviewed local source and staging package. Nothing was pushed or deployed during this audit.

## Frontend changes

| Finding | Fix | Evidence / scope |
| --- | --- | --- |
| Account, login, signup, dashboard and checkout code was loaded with the homepage | Separate route chunks with React lazy/Suspense and an accessible loading state | Startup JS: 293,816 → 273,093 bytes, a 7.1% reduction. Same gzip settings: 88,470 → 83,352 bytes, a 5.8% reduction. Comparison is local pre-audit build versus local staging build, not a deployed before/after speed test. |
| Offscreen story photographs and artwork loaded eagerly | Native lazy loading and asynchronous image decoding for those images | Story image downloads total 322,604 bytes; when browsers defer them depends on viewport and browser thresholds. Hero image remains eager/high priority. |
| Student artwork had a relatively large PNG | Lossless WebP copy, keeping the original | 184,803 → 101,376 bytes, a 45.1% reduction. Dimensions, transparency and every decoded RGBA pixel verified identical. |
| Font loading depended on a CSS import and external Google services | Self-host DM Sans variable fonts; preload Latin subset, use swap rendering, remove unused Inter request | Both downloaded WOFF2 files verified; font license included. No Google font requests remain in generated CSS. |
| Desktop auth image could still download while hidden on mobile | Media-qualified picture source matching the existing desktop layout breakpoint | Narrow screens use a local data-image fallback; desktop source remains the same image. Needs deployed desktop/mobile visual and network confirmation. |
| Different components could request payment status simultaneously | Share an in-flight request for the same auth-session version | New tests verify one network request for concurrent checks, a fresh request after completion, and no sharing across users. No persistent payment-status caching was added. |

No payment security gates were removed. Backend confirmation is still required to unlock access. No API contract or backend code was changed. Cashfree SDK remains loaded only when the user initiates payment. Existing polling has a bounded two-minute confirmation window and cleans up on navigation.

The photographs with `.png` filenames are already JPEG-encoded files. Re-encoding them as lossless WebP increased their size in the trial, so those trial outputs were discarded; the original photographs remain in use. Image format labels alone are not evidence of inefficient encoding.

## Staging network samples

Target: `https://pathway-dev.i-winlearning.com/`. Each resource was requested five times with curl, compression enabled. The first request opens a fresh connection; the following four reuse the connection. These are full network transfers with no browser disk cache, not browser paint or application-interactivity measurements.

| Resource | First transfer | Mean of 4 reused-connection transfers | Mean reused-connection TTFB | Transfer bytes |
| --- | ---: | ---: | ---: | ---: |
| Initial HTML | 175.2 ms | 35.3 ms | 35.2 ms | 425 |
| CSS | 171.2 ms | 40.6 ms | 37.4 ms | 11,789 |
| JavaScript | 266.2 ms | 150.7 ms | 49.3 ms | 91,640 |
| Hero photograph | 483.6 ms | 204.7 ms | 39.4 ms | 187,751 |
| Second story photograph | 391.1 ms | 180.8 ms | 42.4 ms | 188,627 |
| First story photograph | 289.8 ms | 145.2 ms | 48.9 ms | 133,977 |

The HTML is an empty React app shell. Its 35 ms reused-connection response does **not** mean the page is visible or usable in 35 ms. Fresh connections include DNS/TCP/TLS setup; TTFB includes network travel and cannot isolate backend computation. These few samples are not a load test or p95 estimate.

Staging already sends gzip for JavaScript/CSS and long-lived immutable cache headers for sampled assets. These hosting optimizations are present; this audit does not claim that they need to be added.

Detailed response samples are in `staging-response-measurements.json`.

## API calls to track with the backend developer

| Page / action | API | Current frontend behavior |
| --- | --- | --- |
| Signup | POST `/api/v1/auth/register` | One request on submission; submit disabled while pending |
| Login | POST `/api/v1/auth/token` | One request on submission; protected pages need a valid session |
| Session renewal | POST `/api/v1/auth/refresh` | Refresh requests already shared; renewed before expiry |
| Logout | POST `/api/v1/auth/logout` | Server logout attempted and local session cleared |
| Change password | POST `/api/v1/auth/password` | One request on submission |
| Signed-in access check, checkout, return page | GET `/api/v1/payments/me` | Authenticated, uncached; concurrent requests now shared; confirmation polling bounded |
| Start payment | POST `/api/v1/payments/orders` | Only after explicit user payment action; sends phone only |

Real authenticated API latencies were **not measured**: this audit did not collect user credentials, create accounts/orders, or execute a payment. No API is identified as slow without those measurements. A read-only gateway request to `/api/v1/health` returned 404 (about 196 ms including connection setup); that does not establish service health or business API latency and may simply be an unexposed gateway route.

For meaningful API timing, measure a real staging test session using the browser Network panel and record endpoint, status, total duration, waiting/TTFB, and request ID where supplied. Exclude passwords, tokens, phone numbers, and payment details from reports. The developer can correlate request IDs with server logs to distinguish backend work from network time.

## Verification and remaining checks

- 40 automated regression tests pass, including auth/session, payment contracts, checkout dismissal, payment-return behavior and concurrent payment-status checks.
- Production staging build passes with `VITE_BASE_PATH=/` and `VITE_API_BASE_URL=/backend`.
- Root asset URLs, local CSS font files and generated `/payment/return/index.html` were verified.
- Optimized artwork dimensions and decoded pixels were checked against the original.
- Existing staging image loading attributes were inspected in the browser and confirmed eager before these changes.
- Local browser preview could not be reached from the available browser environment. New-page visual checks, mobile source selection, console errors, LCP/CLS/INP, route chunk loading and real payment flow still need verification after deployment. These are open checks, not claimed passes.

The existing staging configuration still needs `/payment/notify` routed to the backend webhook and `/backend` routed to the API gateway. The frontend package cannot perform webhook verification. See `PAYMENT-STAGING.md` for deployment requirements.

## Deliverables

- `iwin-staging-frontend-audit-20261023.zip`: production root-path build including pending payment-return work and these frontend optimizations.
- `staging-response-measurements.json`: summary of the measured staging transfers.

Implementation references: [native image lazy loading](https://web.dev/articles/browser-level-image-lazy-loading), [Vite asynchronous chunk loading](https://vite.dev/guide/features.html#async-chunk-loading-optimization). The original hero is deliberately not lazy-loaded.
