# GenData Tech Website

Next.js website for GenData Tech, including English and German pages, Firebase-backed enquiries, and an authenticated CMS for articles and events.

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
- Articles and events: `cmsBlogs` Firestore collection, with draft / published status
- Public Insights: `/en/blog` and `/de/blog`
- Media: currently via HTTPS image URLs. Cloudinary upload integration is not yet configured.
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
