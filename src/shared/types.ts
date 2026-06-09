/**
 * Runtime icon resolution mode.
 *
 * - `offline`: do not request remote icon API at runtime.
 * - `online`: allows runtime fallback via Iconify runtime loader.
 */
export type IconifyMode = 'offline' | 'online'

/**
 * Raw icon payload accepted by Iconify runtime.
 *
 * This keeps the type broad to support future icon schema extensions.
 */
export type IconifyIconData = Record<string, unknown>

/**
 * Subset of Iconify collection JSON used by the plugin.
 */
export interface IconifyCollectionJSON {
  /**
   * Collection prefix, for example `fa`, `vscode-icons`.
   */
  prefix: string

  /**
   * Optional alias mapping from icon name to icon metadata.
   */
  aliases?: Record<string, unknown>

  /**
   * Default icon height for collection entries that omit `height`.
   */
  height?: number

  /**
   * Icon map where key is icon name and value is icon body metadata.
   */
  icons?: Record<string, IconifyIconData>

  /**
   * Default icon width for collection entries that omit `width`.
   */
  width?: number
}

/**
 * Additional static icon sources provided by user options.
 */
export interface StaticIconsOptions {
  /**
   * Collection presets by prefix.
   *
   * - `true`: include all icons in the collection
   * - `string[]`: include selected icon names only
   */
  collections?: Record<string, true | string[]>

  /**
   * Explicit icon ids (`prefix:name`) to include.
   */
  icons?: string[]
}

/**
 * Public plugin options.
 */
export interface IconifyPluginOptions {
  /**
   * Global component name for icon component registration.
   *
   * @default 'VpIcon'
   */
  componentName?: string

  /**
   * Extra directories to ignore during auto scan.
   *
   * Default behavior also includes built-in ignored directories such as
   * `node_modules`, `dist`, `.git`, etc.
   */
  ignoreDirs?: string[]

  /**
   * Runtime mode for missing icons.
   *
   * @default 'offline'
   */
  mode?: IconifyMode

  /**
   * Enables/disables icon id auto scan from source files.
   *
   * @default true
   */
  scan?: boolean

  /**
   * Root directories to scan when `scan` is enabled.
   *
   * @default ['.']
   */
  scanDirs?: string[]

  /**
   * File extensions scanned for icon patterns.
   *
   * @default ['.md', '.mdx', '.vue', '.html']
   */
  scanExtensions?: string[]

  /**
   * Explicit static icon configuration.
   */
  staticIcons?: StaticIconsOptions
}
