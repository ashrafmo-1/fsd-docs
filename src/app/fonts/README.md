The site bundles the Latin variable fonts used by its English interface so production and video fixture builds do not depend on the Google Fonts resolver.

- `inter-latin-wght-normal.woff2`: `@fontsource-variable/inter@5.3.0`, from https://registry.npmjs.org/@fontsource-variable/inter/-/inter-5.3.0.tgz
- `geist-mono-latin-wght-normal.woff2`: `@fontsource-variable/geist-mono@5.3.0`, from https://registry.npmjs.org/@fontsource-variable/geist-mono/-/geist-mono-5.3.0.tgz

Both fonts are licensed under SIL Open Font License 1.1; their original licenses are included alongside the font files. The existing CSS variables and font families are preserved through `next/font/local`.
