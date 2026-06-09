# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Snapshot

- Package: `vuepress-plugin-iconify` (VuePress 2 plugin)
- Purpose: register a global icon component for VuePress docs, backed by `@iconify/vue`
- Workspace layout: root library package + `docs/` demo site package
- Package manager: `pnpm` (`packageManager: pnpm@11.5.2`)

## Quick Start Commands

Run from repository root unless noted.

- Install deps: `pnpm install`
- Build library: `pnpm run build`
- Watch library bundle: `pnpm run dev`
- Type check: `pnpm run typecheck`
- Lint: `pnpm run lint`
- Format: `pnpm run format`
- Docs dev server: `pnpm run docs:dev`
- Docs build: `pnpm run docs:build`
- Release validation: `pnpm run release:check`

## Source Boundaries

- Node/plugin entry: `src/node/iconifyPlugin.ts`
  - Defines plugin and `componentName` option
  - Wires `clientConfigFile`
- Client registration: `src/client/config.ts`
  - Registers component with Vue app using injected component name
- Component wrapper: `src/client/components/Icon.ts`
  - Wraps `@iconify/vue` `Icon`
  - Maintains prop aliases (`vFlip`/`verticalFlip`, `hFlip`/`horizontalFlip`)

Keep node/plugin concerns under `src/node/**` and runtime Vue component concerns under `src/client/**`.

## Build And Output Conventions

- Bundler config is in `tsdown.config.ts`
- `unbundle: true` means per-file outputs are expected in `dist/**`
- Public package exports must remain consistent with `package.json` `exports`

When adding or moving entry files, update both `tsdown.config.ts` entries and `package.json` exports as needed.

## Style And Tooling Conventions

- ESLint config: `eslint.config.mjs` using `@ntnyq/eslint-config`
- Formatting uses `oxfmt` (not Prettier)
- Keep ESM syntax and bundler-style module resolution
- Maintain strict TypeScript compatibility (`tsconfig.json`)

Before finishing changes, run at least:

1. `pnpm run lint`
2. `pnpm run typecheck`
3. `pnpm run build`

## Docs And Reference Links

Prefer linking these docs instead of duplicating content in code comments or instructions:

- Project overview and usage: [README.md](README.md)
- Full guide and options: [docs/guide/README.md](docs/guide/README.md)
- Docs homepage content: [docs/README.md](docs/README.md)

## Safe Change Patterns

- Preserve default component name behavior (`VpIcon`) unless task explicitly changes API.
- Preserve compatibility for both icon input forms (`string` and `IconifyIcon` object).
- If changing component props, reflect behavior in docs under `docs/guide/README.md`.
- If changing plugin options or runtime behavior, verify with docs site (`pnpm run docs:dev`).
