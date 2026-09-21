# Task: Documentation Videos and Admin Dashboard Foundation

## Objective

Add the foundation for attaching YouTube videos to selected documentation pages and create the first version of an authenticated admin dashboard inside the existing `fsd-docs` project.

The video feature must be reusable, but a video must only appear on a documentation page when that page has a video assigned to it. This is not a requirement to show a video on every page.

The work will be delivered in stages. The current task covers the frontend foundation, Supabase authentication, and an empty protected dashboard. Database-backed video management will follow in later stages.

## Existing project

- Repository: `fsd-docs`
- Framework: Next.js 16 App Router
- UI: React 19, TypeScript, and Tailwind CSS 4
- The dashboard must live in this same project. Do not create a separate dashboard application or repository.

## Product behavior

- Videos are hosted on YouTube.
- The application stores a YouTube URL or video ID and a small amount of metadata. It does **not** upload or store video files.
- Only selected documentation pages have a video.
- Each selected page can display its assigned video in a consistent, reusable section.
- The first content item will be the main FSD CLI video currently being produced.
- The final YouTube URL and final copy will be supplied after the video is uploaded.

## Delivery stages

### Stage 1 — Current task

Build the frontend and authentication foundation:

1. Create a reusable documentation video component.
2. Prepare the main CLI documentation page to receive the first video.
3. Integrate Supabase authentication for dashboard access.
4. Add a protected, initially empty dashboard page.
5. Define the video data contract in TypeScript so later database integration does not require redesigning the UI.

Do not build video CRUD or connect documentation pages to a videos table in this stage.

### Stage 2 — Staging integration

After Stage 1 is reviewed:

1. Create and configure the Supabase staging project.
2. Add the videos table and Row Level Security policies.
3. Seed or insert the first main CLI video record.
4. Read published video data on the relevant documentation page.
5. Verify authentication, permissions, and video rendering in the staging deployment.

### Stage 3 — Dashboard video management

After staging is stable:

1. Add a videos list to the dashboard.
2. Add create and edit forms.
3. Allow an admin to assign a video to a documentation page.
4. Add publish/unpublish controls.
5. Add delete behavior only after its expected confirmation and recovery behavior are agreed.
6. Add an embedded preview before saving or publishing.

## Stage 1 requirements

### 1. Reusable documentation video component

Create one shared component that can be used by any documentation page.

It should accept at least:

```ts
type DocumentationVideo = {
  title: string;
  youtubeUrl: string;
  description?: string;
};
```

Requirements:

- Render the video in a responsive `16:9` container.
- Support normal YouTube URLs, short `youtu.be` URLs, and a direct YouTube video ID, or normalize these values before passing them to the component.
- Use a valid, safe YouTube embed URL. Prefer YouTube's privacy-enhanced embed domain where practical.
- Give the iframe an accessible title.
- Support fullscreen playback.
- Lazy-load the iframe.
- Display the video title and optional short description/details.
- Match the current documentation visual style in light and dark themes.
- Work without horizontal overflow on mobile.
- Render nothing when the current page has no video assigned.
- Keep the component independent from Supabase so its data source can be replaced later.

The component should be placed in the shared documentation component area, for example:

```text
src/components/docs/documentation-video.tsx
```

### 2. First video placement

Prepare the main CLI guide for the first video. In the current documentation structure, `/docs/getting-started` is the proposed first placement because it explains the main project-creation workflow.

- Keep the video details in a small typed configuration object for now.
- Do not use a fake production YouTube URL.
- If the real URL is not available during implementation, keep the feature disabled or use an explicitly marked local placeholder that cannot ship accidentally.
- Adding the component to one page must not cause it to appear automatically on all documentation pages.
- The final page mapping can be changed when the video URL and final title are supplied.

Suggested temporary shape:

```ts
type DocumentationVideoConfig = Record<string, DocumentationVideo | undefined>;
```

The configuration key should be a stable documentation identifier or route pathname, not the visible page title.

### 3. Supabase authentication

Add Supabase only for dashboard authentication in this stage.

Required behavior:

- Add a dashboard login route, proposed as `/dashboard/login`.
- Support sign-in for an existing admin account using email and password.
- Do not add public sign-up. Admin accounts will be created and managed directly in Supabase.
- Preserve the authenticated session using the supported Supabase SSR approach for the installed Next.js version.
- Protect all `/dashboard` routes on the server. A logged-out visitor must be redirected to `/dashboard/login`.
- A logged-in admin visiting the login page should be redirected to `/dashboard`.
- Provide a visible logout action inside the dashboard.
- Show useful loading and error states without exposing internal Supabase details.
- Never expose a Supabase service-role key in browser code.

Expected environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Add or update `.env.example`, but never commit real secrets.

### 4. Initial dashboard page

Create a protected `/dashboard` route in the same Next.js application.

For Stage 1, this page is intentionally static and contains no video records or forms.

It should include:

- A simple dashboard shell/header.
- A clear page title.
- The signed-in admin email when available.
- An empty state explaining that video management will be added in a later stage.
- A logout action.
- Responsive behavior on mobile and desktop.

Do not add analytics, user management, file uploads, rich-text editing, or unrelated CMS features.

### 5. Future video data contract

Define a type that is ready for the staging database integration. The exact database schema will be finalized in Stage 2, but the UI should be designed around the following fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable record ID |
| `pageKey` | Stable documentation route or page identifier |
| `title` | Video title shown on the documentation page |
| `youtubeUrl` or `youtubeVideoId` | YouTube source |
| `description` | Optional short supporting text |
| `isPublished` | Controls public visibility |
| `displayOrder` | Allows future ordering if a page supports more than one video |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last update timestamp |

For the first release, the UI only needs one video per page. The schema may remain capable of supporting more than one video later, but do not build a multi-video carousel or playlist now.

## Suggested route structure

```text
src/app/
  dashboard/
    layout.tsx
    page.tsx
    login/
      page.tsx

src/components/
  docs/
    documentation-video.tsx
  dashboard/
    dashboard-shell.tsx

src/lib/
  supabase/
    client.ts
    server.ts
  documentation-videos.ts
```

This is a suggested structure, not a requirement to force every file. Keep the implementation consistent with the existing repository conventions and avoid unnecessary abstractions.

## Security expectations

- Authentication checks must not rely only on client-side state.
- Dashboard routes must be protected on the server.
- Only public Supabase configuration may be exposed through `NEXT_PUBLIC_*` variables.
- The service-role key must not be used or committed.
- When the videos table is introduced in Stage 2, public users may read only published videos, while only authenticated admins may create, update, or delete records.
- Validate and normalize YouTube input before rendering an iframe or saving it later.
- Do not render arbitrary embed HTML supplied by an admin.

## Out of scope for Stage 1

- Uploading video files.
- Supabase Storage.
- A videos database table or migrations.
- Video create, edit, delete, publish, or page-assignment forms.
- Public registration.
- Password reset flows unless separately requested.
- Multiple admin roles or fine-grained permissions.
- Analytics or video engagement tracking.
- Automatic YouTube API integration.
- A general-purpose CMS.

## Acceptance criteria for Stage 1

- [ ] Supabase authentication is configured using environment variables with no committed secrets.
- [ ] An existing admin can sign in with email and password.
- [ ] An unauthenticated visitor cannot open `/dashboard` and is redirected to the login page.
- [ ] An authenticated admin can open the static dashboard and sign out.
- [ ] Public sign-up is not available.
- [ ] The dashboard shows a deliberate empty state and contains no unfinished CRUD controls.
- [ ] A reusable, accessible, responsive YouTube component exists.
- [ ] Video UI is optional per documentation page.
- [ ] The first placement is prepared for the main CLI video without shipping a fake link.
- [ ] Documentation pages without a video are unchanged.
- [ ] No video file is uploaded to the application or Supabase.
- [ ] The implementation works in light and dark themes and at mobile and desktop widths.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.

## Handoff requirements

When Stage 1 is complete, provide:

1. A summary of the files and routes added or changed.
2. The required local environment variables and setup steps.
3. The Supabase Auth settings that must be configured manually.
4. The exact place where the real YouTube URL, title, and description should be added before Stage 2.
5. Screenshots of the login page, empty dashboard, and video section at mobile and desktop widths.
6. Results for lint, typecheck, and production build.
7. Any remaining assumptions or blockers, especially whether the final video URL and final target page are still pending.

## Information still needed from the product owner

These items are intentionally not guessed and can be supplied when available:

- Final YouTube URL or video ID for the main CLI video.
- Final public video title.
- Optional short description/details.
- Confirmation that `/docs/getting-started` is the correct first documentation page.
- Supabase project URL and public anon key for local/staging configuration.
- Email address of the initial admin account.

