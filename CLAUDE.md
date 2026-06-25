# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm** as its package manager (pinned via the
`packageManager` field in `package.json`).

```sh
pnpm install        # Install dependencies
pnpm dev            # Start the Vite dev server (binds 0.0.0.0)
pnpm build          # Production build (sourcemaps on)
pnpm check          # Type check with vue-tsc (.vue + .ts) — the canonical check
pnpm test           # Run Vitest once over src
pnpm format         # Prettier write over src
```

Run a single test file: `pnpm exec vitest --dir src --run src/utils/slug.test.ts`
(or `pnpm exec vitest run path/to/file.test.ts`). Tests are colocated as `*.test.ts`.

## What this app is

ShuReader is a Vue 3 SPA that renders remote Markdown/JSON as articles, books,
manuals, and author pages. **There is no backend in this repo** — content is fetched
client-side over `fetch()` from arbitrary URLs embedded in the route path. A route
like `/articles/https://example.com/post.md` fetches that URL and renders it. The
"readonly link" concept is: the full source URL lives inside the app's own URL.

## Architecture

**Routing → Page → State pattern.** `src/router/index.ts` consumes
`src/pages/routes.ts`. Each top-level feature is a directory under `src/pages/`
(article, book, author, manual, history, following, home, …) following a consistent
convention:

- `Foo.vue` — entry component; reads `route.params.url`, calls `stateLoad*`, switches
  between `FooLoading.vue` and `FooLoaded.vue`.
- `State.ts` — the plain TypeScript shape for that page's state.
- `stateLoad.ts` / `stateLoadFromCacheFirst.ts` — async functions that `fetch()` the
  remote content, parse it, and return a `State`. `stateRefresh.ts`, `stateTitle.ts`,
  etc. are pure helpers operating on a `State`.

The `url` route param is a catch-all (`:url(.*)`) holding a full remote URL; `:path`
(after `/-/`) addresses a file within a book/manual/author tree.

**State reactivity rule (important — see `STYLE-GUIDE.md`).** `reactive()` /
`stateReactive` must be called **synchronously**, never inside an async function or
`onMounted(async …)`. Load the state async first, then wrap the resolved value in
`reactive()` synchronously in `setup` (see `pages/article/Article.vue`). Watchers
created in async callbacks leak because they aren't bound to the component instance.

**Markdown rendering.** Parsing uses `@xieyuheng/x-markdown` (`parseDocument` →
`Document`). `src/components/md/` renders that AST: `MdNode.vue` dispatches on node
kind to components in `nodes/{leaf-blocks,container-blocks,inlines}/`. `MdPage.vue` +
`pages/` handle page-level layouts.

**Markdown plugins / custom elements.** Custom `<x-*>`-style elements embedded in
content are handled via `ElementPlugin(tag, component, propsBuilder)` registered in
`src/md-plugins/index.ts` (e.g. `readonlylink`, `mimor`). Vite is configured to treat
any `x-`-prefixed tag as a custom element (`vite.config.mjs`), so Vue won't warn about
them. `propsBuilder` typically resolves nested links via `stateResolveLink`.

**Models & persistence.** `src/models/` holds domain models (book, author, manual,
history, following, theme, activity). Config files are fetched and validated with
**Zod** schemas (e.g. `loadBookConfig` → `BookConfigSchema.parse`). Client-side
persistence uses **`idb-keyval`** (IndexedDB) behind `useXxx()` singletons: a module
-level `reactive` store, lazy-initialized from IDB on first `useXxx()` call, with a
deep `watch` that writes changes back to IDB (see `models/history/useHistory.ts`).

## Conventions

- Vue 3 `<script setup lang="ts">` + Composition API throughout; Tailwind for styling
  (`darkMode: 'selector'`); strict TypeScript.
- Prettier with `prettier-plugin-organize-imports` and `prettier-plugin-tailwindcss`
  (imports and class lists are auto-sorted — run `pnpm format`).
- Observe and match existing code style; per `STYLE-GUIDE.md`, respect surrounding
  conventions over introducing new patterns.
- Contributors add themselves to `AUTHORS`; license is GPLv3.
