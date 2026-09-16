# FSD CLI Docs

Official product site and documentation for
[`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture).

The site explains both CLI workflows:

- creating a React + Vite, Next.js, or Vue + Vite project with a complete Feature-Sliced
  Design structure;
- generating features, entities, widgets, pages, and a complete auth flow
  inside an existing project.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Biome

## Local development

Node.js 20.9 or later is required.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

Run the complete verification pipeline with:

```bash
npm run check
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page |
| `/docs` | Documentation overview |
| `/docs/getting-started` | Project creation workflow |
| `/docs/configuration` | `fsd.config.json` reference |
| `/docs/slice-generator` | Feature, entity, widget, and page generation |
| `/docs/auth-generator` | Dedicated auth flow generation |
| `/docs/frameworks/vue` | Vue + Vite template and generator guide |

## Related repositories

- [CLI](https://github.com/FSD-CLI/cli)
- [React + Vite starter](https://github.com/FSD-CLI/FSD)
- [Next.js starter](https://github.com/FSD-CLI/FSD-NEXTJS)
- [Vue + Vite starter](https://github.com/FSD-CLI/FSD-VUE)
- [Feature-Sliced Design documentation](https://feature-sliced.design/)

## Deployment

The production URL is [fsd-docs.vercel.app](https://fsd-docs.vercel.app).
Metadata, canonical URLs, sitemap, robots, and the web manifest use this URL.

## License

MIT
