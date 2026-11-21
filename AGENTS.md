# Repository Guidelines

## Project Structure & Module Organization

- `src/node/`: VuePress plugin entry and build-time integration.
- `src/client/`: client configuration, global component registration, and the Vue icon component in `components/Icon.ts`.
- `src/shared/`: icon scanning/loading utilities, constants, and public option types.
- `tests/`: Vitest tests, currently focused on shared utilities.
- `docs/`: VuePress documentation and runnable examples; site configuration and styles live in `docs/.vuepress/`.
- `dist/`: generated ESM modules and type declarations. Never edit generated output.

## Build, Test, and Development Commands

Use Node.js LTS and the pnpm version declared in `package.json`.

- `pnpm install`: install dependencies for the root package and docs workspace.
- `pnpm build`: generate library modules and declarations with tsdown.
- `pnpm dev`: rebuild the library when source files change.
- `pnpm docs:dev`: start the documentation site. Build the library first; keep `pnpm dev` running in another terminal while changing plugin code.
- `pnpm docs:build`: build the documentation site for production.
- `pnpm test`: run Vitest once; watch mode is disabled in the configuration.
- `pnpm typecheck`: check TypeScript without emitting files.
- `pnpm lint`: run ESLint with `@ntnyq/eslint-config`.
- `pnpm format` / `pnpm format:check`: apply or verify Oxfmt formatting.

## Coding Style & Naming Conventions

Use strict TypeScript and ESM. Match existing source imports with `.js` extensions and separate `import type` declarations. Use two-space indentation, LF endings, single quotes, no semicolons, and trailing commas; Oxfmt uses an 80-column print width.

Use camelCase for functions and variables, PascalCase for types and components, and UPPER_SNAKE_CASE for constants. Keep public options in `src/shared/types.ts` and preserve the node/client/shared export boundaries. The Husky pre-commit hook runs nano-staged formatting and lint fixes.

## Testing Guidelines

Name tests `tests/*.test.ts` and use Vitest `describe`, `it`, and `expect`. Add regression cases for changed behavior, especially icon ID extraction, normalization, scan filters, and ignored directories. Filesystem tests should use temporary directories and remove them in `afterEach`. No coverage threshold is configured.

Before opening a PR, run the CI checks: format check, lint, typecheck, tests, library build, and docs build.

## Commit & Pull Request Guidelines

Follow the history's Conventional Commits style: `feat: support offline mode`, `fix: missing dist files`, or `chore(deps): update dependencies`.

Keep PRs focused. Describe the behavior change, link related issues, and report validation results. Update documentation examples when public options change; include screenshots for visible documentation or icon-rendering changes.
