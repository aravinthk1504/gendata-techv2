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

## Verification and deployment

Run `npm run build` before deployment and verify authenticated CMS routes and both localized public routes. The site requires working Firebase credentials to render content that queries Firestore. The GitHub Actions workflow does not provide production Firebase credentials; account for that when interpreting build and smoke-test failures.


## Google Sheets enquiry synchronization (optional)

The Admin → Enquiries page provides a **Sync to Google Sheets** button beside the CSV export.
The server-side endpoint is \`POST /api/admin/enquiries/sync\`; it is **disabled by default**
and requires an authenticated approved administrator plus a same-origin request.

Destination: existing Google Sheet \`16kBU_nbQJWaVv8gFX52zfHIDJz0sNtQd3JS-TQNHkKs\`,
existing tab \`enquiryForm\`.

- Existing columns **A:G** retain their headers: Timestamp, Name, Email, Phone, Category, Offering, Message.
- First sync adds only headers **H:K**: Status, Latest follow-up note, Firebase enquiry ID, Last synced.
- New enquiries append complete A:K rows. Existing synced rows update only **H:I and K** by Firebase ID;
  **A:G** and all other management tabs are never overwritten.
- The action is *manual*, one-way **Firestore → Sheet**. CSV export remains available.
- A Firestore lock prevents concurrent sync attempts. The server validates the existing headers
  and stops if H:K already contain unexpected data. Source records are bounded at 5,000 per run.
- Changes made directly in Sheets do not update Firebase. For status and note changes,
  use the admin dashboard (and then sync again).

### Required setup (do not commit secrets)

1. **Privacy:** In Google Sheets → Share, change *General access* from **Anyone with link**
   to **Restricted** before transferring customer data. The source workbook was publicly
   readable by link when inspected. Only share the workbook with approved managers and
   your Google service account.
2. Open Google Cloud Console for the service account's project and enable **Google Sheets API**.
3. Share **this existing workbook** with the service account's \`client_email\` as **Editor**.
   You can reuse the Firebase Admin service-account JSON specified by
   \`GOOGLE_APPLICATION_CREDENTIALS\` if it has the Sheets API enabled and sheet access;
   otherwise set the separate server-only values below.
4. Set \`GOOGLE_SHEETS_SYNC_ENABLED=true\` **only after** restricting sharing, enabling
   the API, and granting Editor permission. Restart the Next.js server.
5. In Admin → Enquiries, press **Sync to Google Sheets** and verify the H:K header
   row, row count, statuses, and Firestore IDs in \`enquiryForm\`. Press the button again;
   the second run should report zero new rows.

\`\`\`env
# Required to enable write operations; absence disables the endpoint
GOOGLE_SHEETS_SYNC_ENABLED=false

# Optional when GOOGLE_APPLICATION_CREDENTIALS already points to an authorized service-account JSON
GOOGLE_SHEETS_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...contents...\n-----END PRIVATE KEY-----\n"
\`\`\`

Do not make \`GOOGLE_SHEETS_PRIVATE_KEY\` a \`NEXT_PUBLIC_\` variable or place it
in GitHub. API credentials belong in the server runtime environment.

The Sheets connection in ChatGPT does **not** grant the deployed Next.js application
permission to edit the user's workbook; the service account is required separately.
