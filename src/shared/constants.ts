/**
 * Default global component name registered by this plugin.
 */
export const DEFAULT_COMPONENT_NAME = 'VpIcon'

/**
 * Default directories used by auto scan when `scan` is enabled
 * and `scanDirs` is not provided.
 */
export const DEFAULT_SCAN_DIRS = ['.']

/**
 * Default file extensions scanned for icon patterns.
 */
export const DEFAULT_SCAN_EXTENSIONS = ['.md', '.mdx', '.vue', '.html']

/**
 * Default ignored directories for recursive scan.
 */
export const DEFAULT_IGNORE_DIRS = [
  '.git',
  '.idea',
  '.vscode',
  '.cache',
  '.output',
  '.temp',
  '.vuepress/.cache',
  '.vuepress/.temp',
  'node_modules',
  'dist',
  'coverage',
]

/**
 * Matches HTML/Vue-style icon attribute value, for example:
 *
 * - `<vp-icon icon="fa:github" />`
 * - `<VpIcon icon='vscode-icons:file-type-vue' />`
 *
 * The first capture group contains the icon id (`prefix:name`).
 */
export const ICON_ATTR_RE =
  /\bicon\s*=\s*['"]([a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9][\w-]*)['"]/gi

/**
 * Matches named icon syntax wrapped by `~`, for example:
 *
 * - `~vscode-icons:file-type-typescript~`
 *
 * The first capture group contains the icon id (`prefix:name`).
 */
export const NAMED_ICON_RE = /~([a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9][\w-]*)~/gi

/**
 * Prefixes that are intentionally ignored when parsing `prefix:name` values.
 */
export const INVALID_PREFIXES = new Set([
  'data',
  'http',
  'https',
  'mailto',
  'tel',
])
