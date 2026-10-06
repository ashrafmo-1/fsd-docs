# FSD CLI Docs

Official product site and documentation for
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture).

The site explains both CLI workflows:

- creating a React + Vite, Next.js, Vue + Vite, Nuxt, or SvelteKit project with
  a complete Feature-Sliced Design structure;
- generating features, entities, widgets, pages, and a complete auth flow
  inside an existing project.

## Release verification

The [current release status](https://github.com/FSD-CLI/cli/blob/main/docs/RELEASE-STATUS.md)
is the canonical dated entry point for package/source SHAs, evidence, historical
QA reports and open gaps. The product release archive describes published
features; it does not certify every application or platform combination.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Biome

The landing page and every documentation route are prerendered at build time.
`npm run check:static` verifies that contract from Next.js build artifacts.

## Local development

Node.js 22 or later is required. GitHub Actions and deployment use Node 22 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Dashboard sign-in reads public Supabase settings from `.env.local`. Copy
`.env.example`, then set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`. Also set server-only `DASHBOARD_ADMIN_USER_IDS`
to the admin user's Supabase UID (Authentication → Users). Do not prefix that
variable with `NEXT_PUBLIC_` and do not commit a real UUID. Do not add the
service-role key. Public documentation still builds when those variables are
empty. Turning off public sign-ups is not the authorization check.

The Getting Started video is configured in `src/lib/documentation-videos.ts`
for `/docs/getting-started`. Leave it unset until the real URL, title, and
description exist. Documentation and the dashboard stay on the light theme;
the site does not apply a dark theme.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Run the complete verification pipeline with:

```bash
npm run check
```

For HTTP smoke checks, run `npm run start -- --port 3105` after building, then
`npm run test:docs` in another terminal. Set `DOCS_TEST_ORIGIN` to test a different
server. This verifies sitemap pages, internal page links, release commands,
section anchors, and the unknown-release 404; it does not replace browser checks.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/docs` | Documentation overview |
| `/docs/getting-started` | Project creation workflow |
| `/docs/configuration` | `fsd.config.json` reference |
| `/docs/slice-generator` | Feature, entity, widget, and page generation |
| `/docs/auth-generator` | Dedicated auth flow generation |
| `/docs/ai-agent-skill` | Beta installation, safety note, and verified scope of the `fsd-cli` Agent Skill |
| `/docs/frameworks/vue` | Vue + Vite template and generator guide |
| `/docs/frameworks/nuxt` | Nuxt template, SSR integration, and generator guide |
| `/docs/frameworks/sveltekit` | SvelteKit template, stack, routing, and generator guide |
| `/docs/releases` | CLI release history and legacy archive |
| `/docs/releases/[version]` | Version-specific changes and installation command |
| `/sitemap.xml` | Canonical static route inventory for crawlers |
| `/robots.txt` | Crawler policy, including explicit AI crawler access |
| `/llms.txt` | Concise LLM-oriented product and documentation index |
| `/llms-full.txt` | Consolidated LLM-oriented CLI reference |
| `/dashboard/login` | Admin email and password sign-in |
| `/dashboard` | Protected admin dashboard |

## Maintaining documentation

Release records live in `src/lib/releases.ts`, newest first. Add a record after
verifying the published npm version and its publication date, and use the CLI
changelog as the source for changes. Keep missing historical notes explicit;
do not infer fixes. Records drive the release pages, sitemap, and latest-release
link on the homepage. Synchronization is currently manual, not automatic.

Update `src/lib/docs-navigation.ts` when adding documentation pages. It drives
the grouped sidebar, breadcrumbs, and previous/next links. Give section headings
stable IDs so shared links work before hydration; the page outline collects h2
and h3 headings and highlights the current section while scrolling.

## Related repositories

- [CLI](https://github.com/FSD-CLI/cli)
- [Agent Skill](https://github.com/FSD-CLI/create-fsd-architecture)
- [React + Vite starter](https://github.com/FSD-CLI/FSD)
- [Next.js starter](https://github.com/FSD-CLI/FSD-NEXTJS)
- [Vue + Vite starter](https://github.com/FSD-CLI/FSD-VUE)
- [Nuxt starter](https://github.com/FSD-CLI/FSD-NUXT)
- [SvelteKit starter](https://github.com/FSD-CLI/fsd-sveltekit)
- [Feature-Sliced Design documentation](https://feature-sliced.design/)

## Deployment

The production URL is [fsdcli.me](https://fsdcli.me).
Metadata, canonical URLs, sitemap, robots, and the web manifest use this URL.
The robots policy explicitly permits GPTBot, ClaudeBot, PerplexityBot, and
Google-Extended. The two LLM text routes are generated from the same navigation,
release, and site configuration used by the HTML documentation.

## License

MIT

## Support FSD CLI

If this project helps you, you can optionally support its development:

- [GitHub Sponsors](https://github.com/sponsors/ashrafmo-1?frequency=one-time&sponsor=ashrafmo-1)
- [Buy Me a Coffee](https://buymeacoffee.com/ashrafqopiah)
- **InstaPay (Egypt):** `ashrafmo-1`

For InstaPay, use the username exactly as shown and verify the recipient details
in the app before confirming a transfer. Donations are optional.
