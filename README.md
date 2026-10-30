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
