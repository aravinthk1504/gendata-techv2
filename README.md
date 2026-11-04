# GenData Tech Website

Next.js website for GenData Tech, including English and German pages, Firebase-backed enquiries, and an authenticated article CMS.

## Local development

1. Install Node.js 22 and run `npm ci`.
2. Create a local `.env.local` (never commit credentials).
3. Configure Firebase Admin's application-default credentials and project ID.
4. Run `npm run dev`, or `npm run build` to check production compilation.

## Server configuration

- `GOOGLE_CLOUD_PROJECT`: Firebase / Google Cloud project ID
- `GOOGLE_APPLICATION_CREDENTIALS`: **local path** to a service-account JSON file stored outside this repository
- `FIREBASE_WEB_API_KEY`: Firebase Auth web API key for admin sign-in
- `ADMIN_UIDS`: comma-separated allowlist of approved Firebase Auth user UIDs
- `RATE_LIMIT_SECRET`: secret used by the contact form rate limiter

Keep `.env.local`, service-account JSON files, private keys and tokens out of source control. Do not expose server credentials using `NEXT_PUBLIC_` variables.

## Cloudinary Free image uploads

Create a Cloudinary account and find the **Cloud name**, **API Key**, and **API Secret** in its console. Add the following **server-only** variables to your local `.env.local` (do not commit values):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Restart the Next.js server. Authorized administrators can upload JPG, PNG, or WebP cover images or inline photos (up to 5 MB each) from Blog Management. The authenticated upload endpoint is `/api/admin/media`; it returns HTTPS Cloudinary image URLs which are saved as Firestore text references when the article is saved.

Do not expose the API secret in client components or any `NEXT_PUBLIC_` variable. Keep Cloudinary credits and bandwidth within the free plan. The current uploader does **not** implement image deletion, gallery reordering, or an infinite carousel yet.

## Content management

- `/en/admin` and `/de/admin`: restricted administrator dashboard
- Articles: `cmsBlogs` Firestore collection, with draft / scheduled / published status
- Public Insights: `/en/blog` and `/de/blog`
- Media: authenticated Cloudinary uploads and a reusable library in the Blog CMS.
- `scripts/migrate-legacy-blogs.mjs`: optional **one-time** import of legacy summaries as drafts; do not run repeatedly unless intended.

## Admin Blog CMS draft and publishing workflow

- **Draft autosave:** Draft articles with a title of 5+ characters and a valid URL slug are
  saved to Firestore approximately 2 seconds after the latest edit. A saving/saved/error
  indicator appears in the editor. Drafts may have incomplete content or metadata.
- **Publishing:** Publishing remains **manual** via Save. The API (not only the UI)
  requires a title, category, summary, body, cover image, image alt text, SEO title,
  and SEO description. Existing published articles never auto-unpublish.
- **Slug generation:** A new article's URL slug is derived from its title, with
  German character support. The slug can be customized before the first save and
  is locked afterward to avoid breaking published links.
- **Preview:** Preview renders an article-style hero, metadata, cover and Markdown
  using the current unsaved editor content; it does not publish a draft.
- **Navigation protection:** Unsaved editor changes prompt before the admin tab
  changes or the browser page unloads. Edits during an in-progress save trigger
  a subsequent autosave rather than being marked as already saved.

### Local acceptance checks

1. Admin → Blog Management → New article: type a title of at least five characters
   and wait. Verify the draft appears in Firestore and the editor reports saved.
2. Add text, switch to another editor section, then refresh. Verify the draft
   persisted. Test both English and German titles.
3. Leave publishing fields incomplete, choose Published and Save. Confirm an
   error prevents publication. Fill the checklist and Save again.
4. Check Preview with headings, images and links before publishing.
5. Reopen an already published article, edit its content and wait; ensure the
   article is not silently changed or unpublished. Save manually to publish edits.
6. Start editing and switch to Overview before saving; confirm the unsaved
   changes warning appears.

## Verification and deployment

Run `npm run build` before deployment and verify authenticated CMS routes and both localized public routes. The site requires working Firebase credentials to render content that queries Firestore. The GitHub Actions workflow does not provide production Firebase credentials; account for that when interpreting build and smoke-test failures.


## Enquiry export for management

The Admin → Enquiries page provides an authenticated **Export for Excel (CSV)** download.
It reads paginated enquiry records directly from Firestore, including status and the latest follow-up note.
Open the downloaded CSV in Microsoft Excel, or import it into a separate Google Sheets tab
before merging it with existing management records. No Google Sheets API, Google Cloud Console
configuration, spreadsheet sharing, or synchronization credentials are required.

CSV export is a manual snapshot, not a live link to the management workbook. The website
continues to store and update enquiries in Firebase Firestore. The exported file includes
formula-injection safeguards for spreadsheet applications.


## Phase 3 admin UI acceptance checklist

The public-site layout and production APIs are unchanged. Admin layout improvements:

- Desktop (1440px): sticky dark sidebar, active Overview/Enquiries/Blog Management
  selection, refreshed metric cards, category chart and sign-out.
- Tablet (768px): the mobile-style navigation drawer replaces the sidebar;
  enquiry records are readable as cards instead of a horizontally scrolling table.
- Phone (375px): open and close the admin drawer using button, backdrop and Escape;
  tab navigation and account sign-out should work; focus stays within the drawer
  while it is open and body scrolling resumes when it closes.
- Blog CMS: Save button stays visible near the top while scrolling; use ArrowLeft,
  ArrowRight, Home and End to navigate Content, Images and SEO tabs.
- Blog behavior: verify draft autosave, German-language draft switch, publishing
  validation, image upload, delete confirmation and unsaved-change warnings.
- Enquiries: verify status updates, history, follow-up notes, pagination and CSV
  export using the existing Firestore collection.
- Login: desktop branding on the left and sign-in on the right; compact mobile
  layout with native text cursor and visible focus outlines.

Run `npm run build` and review 375px / 768px / 1440px viewport layouts locally
before marking Phase 3 browser-verified.


## Phase 4 — Admin security controls

The existing Firebase-approved administrator UID allowlist and HTTP-only, SameSite=Strict
eight-hour session cookies remain in place.

- **Login throttle:** Shared Firestore counters keyed by the SHA-256 digest of
  a normalized email (`_adminLoginAttempts`) count failed credentials even for
  unknown or unapproved accounts. The **fifth failed attempt within 15 minutes**
  returns HTTP 429 and triggers a **10-minute cooldown**. A successful login
  clears its counter. Counting is transactional and does not trust forwarded
  IP headers; it requires working Firestore access.
  **Tradeoff:** Someone who knows an admin email can temporarily lock that
  email out. Keep a recovery administrator and add trusted-edge/IP controls
  before launching publicly.
- **Audit trail:** `_adminAudit` stores successful/failed/limited sign-ins, sign-outs,
  article changes, Cloudinary uploads, enquiry status/note changes and CSV exports,
  with administrator UID, optional record ID and timestamp. It intentionally avoids
  passwords, raw IPs, tokens, full customer messages and follow-up note bodies.
  Recording is best-effort and does not roll back successful operations.
- **Security & activity tab:** Displays up to the latest 50 activity records and
  provides **Sign out all my sessions**. The revocation endpoint invalidates Firebase
  refresh tokens for the signed-in UID; it also clears the current session cookie.
  Other administrators' sessions are not affected.
- **CSRF:** Mutation endpoints continue to require a valid same-origin request;
  the existing session cookie remains SameSite=Strict.
- **MFA:** Not automatically activated. Firebase TOTP MFA depends on Identity
  Platform and requires enrollment and updated authentication flows. Enable only
  after testing and having at least one recovery administrator available.

### Phase 4 acceptance tests

1. Run `npm run build`, then sign in with an approved administrator account.
2. In **Security & activity**, verify that a successful sign-in appears.
3. Change an enquiry status, add a note and save a blog draft. Refresh the
   activity tab; verify no passwords, enquiry messages or note text are exposed.
4. Sign out, then sign in again. Confirm the activity log updates.
5. Run `node --test tests/admin-login-policy.test.mjs` to verify the
   five-failure threshold and cooldown without submitting real passwords.
   With a separate **test** administrator account, verify that the fifth
   incorrect password yields HTTP 429, includes a `Retry-After` header,
   and a correct password is blocked until the cooldown ends. Do not
   intentionally lock out the only production administrator.
6. Test **Sign out all my sessions** with two browsers logged in to the same
   admin account. Both should require authentication after revocation.
7. Confirm unapproved Firebase UIDs still cannot access protected endpoints.
8. Review MFA, trusted proxy rate limiting, and deployment access controls before
   moving to a public production hostname.

The public Contact API production limiter remains deferred until the planned
pre-deployment work and is not changed by Phase 4.


## Phase 5 — Scheduled posts, Cloudinary media library and full enquiry reports

### Scheduled blog posts

- In **Admin → Blog management → SEO & Publishing**, choose **Scheduled** and a
  date/time in your browser's local timezone. The form stores an ISO timestamp
  in UTC and requires the publication time to be more than one minute ahead.
- Complete the same publishing checklist as a published article and **Save**.
  Scheduled posts do **not** autosave. Regular incomplete drafts still autosave.
- Public article detail and listing pages check the due time on every request.
  Before the scheduled time, a scheduled article is inaccessible to visitors.
  At/after the scheduled time, it becomes visible without a cron service.
- The Firestore `status` can remain `scheduled` even after the post becomes
  public. The public date displayed is the scheduled timestamp.
- Changing a scheduled or published post's status is a manual Save operation.
  A scheduled post with a past due date must be changed to Published to make
  subsequent editor changes; rescheduling it for a new future date is also possible.
- Scheduled publishing requires the deployed site to stay reachable and the
  public blog pages to remain dynamic. It is **visibility-on-request**, not a
  background job or an automatic social-media notification.

### Cloudinary image library

- Under **Blog management → Images**, choose **Choose from media library**.
  Browse existing images within the `gendata-tech` folder and its subfolders,
  use one as the cover or insert it as a Markdown image in the article.
- The image list is retrieved through an authenticated server-side proxy,
  `GET /api/admin/media/library`, using the existing Cloudinary credentials.
  It supports pagination and deliberately does **not** allow deletion.
- Image browsing uses Cloudinary's rate-limited Admin/Search API. Avoid
  repeatedly refreshing the library unnecessarily. Existing image uploads
  continue using the original upload route.

### Reporting

- **Admin → Reports** uses `GET /api/admin/reports` and Firestore aggregation
  queries to show a full-database enquiry count, status breakdown and six
  calendar months of enquiry activity (UTC month boundaries).
- Reports are calculated on demand when the tab opens or Refresh is pressed.
  This requires no new API credentials and retains **Export for Excel (CSV)**.
- Legacy enquiries without a `status` field are included in the overall
  total but not in the four individual status totals. Monthly counts reflect
  documents with a valid Firestore `createdAt` timestamp.

### Phase 5 verification

1. Run `node --test tests/blog-schedule.test.mjs` and `npm run build`.
2. Save an English or German article as a Scheduled post for a future time.
   Verify its public URL returns a 404 before the time and loads afterward.
   Test in both locales and check the displayed publication date.
3. Edit the scheduled post, and verify that changes require a manual Save.
4. Open Images → Media Library. Check a previously uploaded Cloudinary image
   can become a cover and can be inserted into Markdown; publishing should
   continue to work without uploading again.
5. Open Reports and compare full-database counts to Firebase Firestore.
   Check that the all-record totals can exceed the first 100 loaded enquiries.
6. Verify draft autosaving, article editing/deletion, Cloudinary upload,
   follow-up notes, session controls and CSV export still work.
7. Keep production scheduling disabled in practice until public-route
   behavior has been tested with the actual hosting and Firebase credentials.

MFA and the deferred public Contact API production limiter remain out of scope
for this phase.


## Contact form email notifications via Resend

**Flow:** English/German contact form → validate + Firestore rate-limit → save enquiry
to Firestore → request admin email notification from Resend → update `emailStatus`
in the enquiry document. The visitor sees success when the Firestore save succeeds,
even if Resend is disabled, unconfigured or temporarily unavailable.

Resend notifications use the HTTPS API via built-in Node.js fetch, without an extra Resend SDK dependency.

### Resend account setup

1. Create/login to a Resend account and open **Domains → Add Domain**.
   Add a sending domain or subdomain you control, e.g. `mail.example.com`.
2. At your DNS provider add Resend's **exact generated** verification records
   (DKIM, and the SPF / return-path records shown by Resend). Do not substitute
   guessed DNS record values. Wait until the Resend dashboard marks the domain
   **Verified**.
3. Create a Resend API key authorized to send email, and store it only in the
   server environment (never in GitHub or client-side variables).
4. Configure these server-only variables in `.env.local` (and later your production
   host's secure environment variables):

```env
RESEND_NOTIFICATIONS_ENABLED=false
RESEND_API_KEY=re_your_server_side_api_key
RESEND_FROM_EMAIL="GenData Tech <enquiries@mail.example.com>"
RESEND_NOTIFY_TO=owner@example.com
```

Replace both example domains with real authorized addresses: the From address
must belong to your verified Resend sending domain, and the notification mailbox
must be one you control (up to five comma-separated addresses). The visitor's
address is set as **Reply-To**, not **From**, to protect domain authentication.

5. After verifying DNS and configuring the variables, change
   `RESEND_NOTIFICATIONS_ENABLED=true` and restart Next.js. Until then leave it
   **false**, so the contact form only saves to Firebase.
6. Submit a valid test enquiry through the **website form** and confirm that:
   - A new Firestore `enquiries` document exists.
   - The Resend dashboard records a matching outgoing email.
   - The team inbox receives the notification (also inspect spam/junk).
   - **Admin → Enquiries → View & manage** shows the notification status.
7. The Firestore field `emailStatus` can be `pending`, `disabled`,
   `not_configured`, `failed`, or `accepted`. **Accepted** means Resend
   accepted the request; it does **not** prove mailbox delivery.
   `emailProviderId` stores the Resend message ID when accepted.

### Reliability and privacy notes

- The notification includes the enquiry ID and the submitted customer details.
  Send only to an approved, access-controlled mailbox; this is personal data.
- User-entered strings are escaped in the HTML email template. A plaintext
  alternative is also supplied.
- If Resend rejects a request, the customer submission still succeeds and remains
  accessible in Firestore/Admin. The application logs the provider HTTP status
  server-side without exposing credentials or details to the visitor.
- The `Idempotency-Key` is derived from the unique Firestore enquiry ID to avoid
  duplicate Resend messages if this exact request is retried. This integration
  **does not yet provide a scheduled retry queue**, delivery webhooks or a
  customer-facing acknowledgement email; these can be added after go-live.
- Resend API quotas and sending limits depend on the account plan. Check usage
  in the Resend dashboard rather than assuming unlimited messages.
- Production form rate limits currently use a hash of the **validated sender
  email** as their fallback identity, instead of mistakenly grouping every user
  under the same `unverified-client` value. A malicious visitor can change
  email addresses, so configure a trusted-edge/IP limiter and abuse protection
  before production launch. Do **not** blindly trust user-supplied forwarding
  headers.

### Local smoke tests

```bash
git pull origin master
node --test tests/contact-notification-template.test.mjs
npm run build
npm run dev
```

Test with the feature flag disabled first (Firestore must still save successfully),
then enable after DNS verification. Run a real contact form submission to verify
Resend and the destination inbox. Never publish `.env.local` or paste an API key
into chat or a public issue.


## Firebase App Hosting deployment readiness

**Deploy as Firebase App Hosting**, not static Firebase Hosting. The Next.js
server renders content dynamically and handles protected API routes.
This repository includes `apphosting.yaml` with minInstances 0, maxInstances
3 and concurrency 40. Firebase App Hosting requires the Blaze billing plan.

1. In Firebase Console → App Hosting → Create backend, select the existing
   Firebase project. Connect repository `aravinthk1504/gendata-techv2`,
   use **master** as the live branch and `/` as the app root.
2. In backend Settings → Environment, configure `GOOGLE_CLOUD_PROJECT`,
   `FIREBASE_WEB_API_KEY`, `ADMIN_UIDS`, `RATE_LIMIT_SECRET`,
   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
   `CLOUDINARY_API_SECRET`, and `RESEND_NOTIFICATIONS_ENABLED=false`.
   After Resend verification, securely configure `RESEND_API_KEY`,
   `RESEND_FROM_EMAIL` and `RESEND_NOTIFY_TO` and change the flag.
   Store sensitive settings as restricted secrets rather than public code.
3. Never commit a service-account JSON or set a local Windows
   `GOOGLE_APPLICATION_CREDENTIALS` path in App Hosting. The hosted
   runtime uses application-default credentials and needs correct
   Firestore/Firebase Authentication permissions for its service account.
4. Set Firebase/Google Cloud budget alerts and review billing usage.
5. Run `npm ci`, `node --test tests/*.test.mjs`, and `npm run build`.
   Verify the GitHub Actions workflow succeeds on the latest commit.
   The CI smoke test checks EN/DE About-page SSR without production secrets.
6. First deploy to the App Hosting-provided hostname, not the public custom
   domain. Verify all pages in English and German on desktop and mobile,
   including Home, six Services, Products, Training, About, Contact and Blog.
7. Check admin sign-in/out, UID restrictions, Blog draft autosave and
   scheduling, Cloudinary uploads and library, customer enquiries,
   CSV exports, security activity, session controls and full reports.
   Submit a real test contact form, confirm Firestore persistence and
   check Resend acceptance and inbox delivery once its DNS is verified.
8. Before broad public launch, add trusted-edge abuse protection for the
   contact form. The existing email-based limiter is insufficient against
   a malicious visitor who changes email addresses.
9. Connect and verify the production domain and HTTPS only once the
   production build, permissions, backend, smoke tests, abuse protection
   and billing controls have been validated.

### Static code cleanup

Removed six confirmed-unused legacy modules: `InfinityVisual`,
`NeuralBackground`, `TechHeroSculpture`, `ServiceFlowVisual`,
`src/i18n/home.js`, and `EventGallery`. Removed the unreachable
event rendering from the public blog article page and its orphan CSS rule.
Dropped the unused Resend SDK dependency (the integration calls the
Resend HTTPS API using built-in fetch). Active website hero animations and
admin workflows were preserved.

**Note:** Source checks alone are not proof of a successful production build
or operational Firebase deployment. The release remains conditional on CI
and first-deployment acceptance tests.

 
## Optional customer enquiry confirmation

The management notification sends only to `RESEND_NOTIFY_TO` and uses the form's
email as Reply-To. Reply-To does **not** send the customer a message.
The optional bilingual customer acknowledgement is a second transactional email
sent to the validated email from the form, after the enquiry is saved to Firestore.
It uses the same verified Resend sender and a separate idempotency key.

To enable it in local `.env.local` (and later Firebase App Hosting secrets/environment):

```env
RESEND_NOTIFICATIONS_ENABLED=true
RESEND_FROM_EMAIL="GenData Tech <enquiries@gendatatech.com>"
RESEND_NOTIFY_TO=info@gendatatech.com
RESEND_CUSTOMER_ACK_ENABLED=true
RESEND_CUSTOMER_REPLY_TO=info@gendatatech.com
```

Keep your existing `RESEND_API_KEY` private. `RESEND_CUSTOMER_ACK_ENABLED`
defaults to false. With it disabled, internal management notifications still
work. `RESEND_CUSTOMER_REPLY_TO` must be a real receiving inbox/Cloudflare
forwarding alias. The customer recipient comes from the submitted email field;
a separate recipient environment variable is not needed.

Firestore fields: `emailStatus` (management email),
`customerEmailStatus` (customer receipt), and their corresponding provider
IDs and attempt timestamps. The admin enquiry detail page shows both statuses.
`accepted` means Resend accepted the email, not confirmed inbox delivery.
A failure of either email does not undo the saved enquiry.

**Production caution:** Visitors can enter email addresses they do not own.
Enable customer acknowledgements on a public domain only after trusted-edge
anti-bot/IP abuse protection is configured. Each enquiry can produce two
Resend sends and use twice the quota. Test with an address you control,
review Resend activity and the recipient's spam folder, and test both EN/DE.
Run `node --test tests/*.test.mjs` and `npm run build` before go-live.

 
### Branded Resend customer acknowledgements (November 2026)

The **customer** email is a short bilingual acknowledgement only: no enquiry
topic, no reference number. Its From is
`RESEND_CUSTOMER_FROM_EMAIL="GenData Tech <noreply@gendatatech.com>"`;
its Reply-To and visible support contact are
`RESEND_CUSTOMER_REPLY_TO=support@gendatatech.com`.

**Management** continues to receive the full enquiry at
`RESEND_NOTIFY_TO=info@gendatatech.com`, sent from the existing
`RESEND_FROM_EMAIL="GenData Tech <enquiries@gendatatech.com>"`.

Both templates include the GenData Tech logo and wordmark. By default, the
existing `public/assets/gendata-tech-mark.webp` is embedded as a CID inline
attachment using the Resend HTTP API; for compatibility across email clients,
configure `RESEND_EMAIL_LOGO_URL` to a public HTTPS PNG (Cloudinary preferred).
Some clients block images, so the text brand remains visible.

The Resend-verified sending domain supports noreply@ without a Cloudflare
inbound mailbox. A Cloudflare Drop routing rule is optional. Support@ must
continue forwarding to a monitored inbox. Customer emails remain opt-in via
`RESEND_CUSTOMER_ACK_ENABLED`, and must not be enabled for unrestricted
public traffic without abuse controls. Test both languages and both inboxes.

 
### Resend logo rendering fix (PNG)

Previously, both emails used a WebP file as a CID attachment. Certain email
clients and webmail image proxies may not display WebP inline consistently.
The default logo now uses `sharp` to convert the **existing** GenData Tech
WebP mark to a compact transparent PNG and sends `image/png` with a matching
`cid:gendata-tech-logo` / `content_id`. The same logo is used for
management and customer emails. The conversion is cached by the Node.js worker;
a logo problem will not block notifications.

For maximum Gmail/Outlook compatibility, an optional
`RESEND_EMAIL_LOGO_URL=https://.../logo.png` may be set to a directly
accessible public HTTPS PNG, e.g. from Cloudinary. When set it takes priority
over CID and no logo attachment is sent. Do not use a private Cloudinary console
page, an upload dashboard URL, or an inaccessible asset URL. If the old URL
doesn't load in an incognito browser, **remove that environment variable** to
use the PNG inline fallback.

Run `node --test tests/*.test.mjs`, `npm run build`, and make two controlled
test enquiries to verify both receiving inboxes. Some mail clients can still
block images by user setting; the text wordmark remains visible.
