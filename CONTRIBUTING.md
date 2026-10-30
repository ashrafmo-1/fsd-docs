# Contributing to the FSD CLI docs

Thanks for helping improve [fsdcli.me](https://fsdcli.me). This repository
holds the documentation site only. Report CLI bugs and propose CLI changes in
[FSD-CLI/cli](https://github.com/FSD-CLI/cli/issues), and template issues in
the template's own repository.

## Report a problem in the docs

Open an issue in this repository with the page URL, what is wrong or missing,
and the CLI version you are using (`fsd --version`). Security problems go
through the private process in the
[CLI security policy](https://github.com/FSD-CLI/cli/blob/main/SECURITY.md),
never a public issue.

## Change a page

Requirements: Node.js 22.12.0 or later and npm.

```bash
npm ci
npm run dev
```

Pages live in `src/app/docs/<page>/page.tsx`. A new page needs:

- `metadata` with a `title`, a `description`, and its own
  `alternates.canonical`;
- an entry in `src/lib/docs-navigation.ts`, which also adds it to the sitemap
  and `llms.txt`;
- an `id` on every `h2`/`h3` so sections can be linked.

Keep claims about the CLI true for the published release: check flags and
messages against the CLI source at the released tag, and say when a feature is
in preview.

## Before you open a pull request

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check:static
npm run test:docs:production
```

CI runs the same checks. Use conventional commit messages, such as
`docs: add a migration guide`.
