import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { extname, isAbsolute, join, resolve } from 'node:path'
import process from 'node:process'
import { getIconData } from '@iconify/utils'
import {
  DEFAULT_IGNORE_DIRS,
  DEFAULT_SCAN_DIRS,
  DEFAULT_SCAN_EXTENSIONS,
  ICON_ATTR_RE,
  INVALID_PREFIXES,
  NAMED_ICON_RE,
} from './constants.js'
import type {
  IconifyCollectionJSON,
  IconifyIconData,
  IconifyPluginOptions,
  StaticIconsOptions,
} from './types.js'

/**
 * Loads static icon payload from explicit options and scanned project files.
 *
 * Workflow:
 * 1. Collect icon ids from `staticIcons`.
 * 2. Optionally scan source files for icon usages.
 * 3. Resolve icon data from local `@iconify-json/<prefix>` collections.
 * 4. In offline mode, warn if some collected icon ids cannot be resolved.
 *
 * @param options - Plugin options used for static icon collection.
 * @returns A map where key is `prefix:name` and value is icon payload.
 */
export function loadStaticIcons(
  options: IconifyPluginOptions,
): Record<string, IconifyIconData> {
  const projectRequire = createProjectRequire()
  const iconNames = new Set<string>()

  addExplicitIcons(iconNames, options.staticIcons)

  if (options.scan !== false) {
    const scanDirs = options.scanDirs?.length
      ? options.scanDirs
      : DEFAULT_SCAN_DIRS
    const files = collectScanFiles(scanDirs, options)
    for (const file of files) {
      addIconsFromContent(iconNames, readText(file))
    }
  }

  const resolved = resolveIcons(iconNames, options.staticIcons, projectRequire)

  if (options.mode === 'offline' || options.mode === undefined) {
    const missing = Array.from(iconNames).filter(name => !resolved[name])
    if (missing.length > 0) {
      console.warn(
        `[vuepress-plugin-iconify] Missing offline icons (${missing.length}): ${missing.join(', ')}`,
      )
    }
  }

  return resolved
}

/**
 * Creates a Node `require` function anchored at the workspace package root.
 *
 * It tries `${process.cwd()}/package.json` first, then falls back to the
 * current module URL. This allows resolving optional icon collections from
 * the consumer project.
 *
 * @returns A Node-compatible `require` function.
 */
export function createProjectRequire() {
  const packageJson = resolve(process.cwd(), 'package.json')
  if (existsSync(packageJson)) {
    return createRequire(packageJson)
  }
  return createRequire(import.meta.url)
}

/**
 * Adds explicit icon ids configured by users into the target set.
 *
 * Accepted sources:
 * - `staticIcons.icons`: direct `prefix:name` ids
 * - `staticIcons.collections[prefix] = string[]`: icon names under prefix
 *
 * `collections[prefix] = true` is intentionally skipped here because full-set
 * expansion is handled by {@link resolveIcons}.
 *
 * @param names - Mutable target set for normalized icon ids.
 * @param staticIcons - Optional static icon options.
 */
export function addExplicitIcons(
  names: Set<string>,
  staticIcons?: StaticIconsOptions,
) {
  if (!staticIcons) {
    return
  }

  for (const icon of staticIcons.icons || []) {
    addIconName(names, icon)
  }

  for (const [prefix, config] of Object.entries(
    staticIcons.collections || {},
  )) {
    if (config === true) {
      continue
    }
    for (const iconName of config) {
      addIconName(names, `${prefix}:${iconName}`)
    }
  }
}

/**
 * Collects candidate files for icon scanning.
 *
 * Effective defaults:
 * - `scanExtensions`: {@link DEFAULT_SCAN_EXTENSIONS}
 * - `ignoreDirs`: {@link DEFAULT_IGNORE_DIRS} plus user-provided entries
 *
 * @param scanDirs - Directories to scan.
 * @param options - Plugin options.
 * @returns Absolute file paths that should be scanned.
 */
export function collectScanFiles(
  scanDirs: string[],
  options: IconifyPluginOptions,
): string[] {
  const extensions = new Set(
    (options.scanExtensions?.length
      ? options.scanExtensions
      : DEFAULT_SCAN_EXTENSIONS
    ).map(ext => (ext.startsWith('.') ? ext : `.${ext}`)),
  )
  const ignoreDirs = new Set(
    [...DEFAULT_IGNORE_DIRS, ...(options.ignoreDirs || [])].map(dir =>
      normalizeDir(dir),
    ),
  )

  const files = new Set<string>()

  for (const dir of scanDirs) {
    const startDir = isAbsolute(dir) ? dir : resolve(process.cwd(), dir)
    walkDir(
      startDir,
      file => {
        if (extensions.has(extname(file).toLowerCase())) {
          files.add(file)
        }
      },
      ignoreDirs,
    )
  }

  return Array.from(files)
}

/**
 * Recursively walks a directory tree and reports every file to callback.
 *
 * The traversal skips directories matching `ignoreDirs` (exact match or
 * descendant path match).
 *
 * @param currentDir - Directory to traverse.
 * @param onFile - Callback for each discovered file.
 * @param ignoreDirs - Normalized ignore directory set.
 */
export function walkDir(
  currentDir: string,
  onFile: (filePath: string) => void,
  ignoreDirs: Set<string>,
) {
  if (!existsSync(currentDir)) {
    return
  }

  const entries = readdirSync(currentDir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(currentDir, entry.name)

    if (entry.isDirectory()) {
      const normalizedFullPath = normalizeDir(fullPath)
      const relativePath = normalizeDir(
        fullPath.replace(`${process.cwd()}/`, ''),
      )
      const shouldSkip = Array.from(ignoreDirs).some(ignored => {
        const matches = [
          normalizedFullPath === ignored,
          normalizedFullPath.endsWith(`/${ignored}`),
          normalizedFullPath.includes(`/${ignored}/`),
          relativePath === ignored,
          relativePath.endsWith(`/${ignored}`),
          relativePath.includes(`/${ignored}/`),
          relativePath.startsWith(`${ignored}/`),
        ]

        return matches.some(Boolean)
      })

      if (!shouldSkip) {
        walkDir(fullPath, onFile, ignoreDirs)
      }
      continue
    }

    if (entry.isFile()) {
      onFile(fullPath)
    }
  }
}

/**
 * Normalizes directory path for cross-platform comparisons.
 *
 * Behavior:
 * - convert `\` to `/`
 * - trim leading `./`
 * - trim trailing `/`
 *
 * @param input - Raw directory path.
 * @returns Normalized directory path.
 */
export function normalizeDir(input: string) {
  return input.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/$/, '')
}

/**
 * Reads text file content safely.
 *
 * @param filePath - File path.
 * @returns UTF-8 content; empty string when file is missing or unreadable.
 */
export function readText(filePath: string) {
  try {
    return readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

/**
 * Extracts icon ids from content and appends them into target set.
 *
 * Supported patterns:
 * - `icon="prefix:name"` / `icon='prefix:name'`
 * - `~prefix:name~`
 *
 * @param names - Mutable target set.
 * @param content - Input content to parse.
 */
export function addIconsFromContent(names: Set<string>, content: string) {
  ICON_ATTR_RE.lastIndex = 0
  NAMED_ICON_RE.lastIndex = 0

  for (const regex of [ICON_ATTR_RE, NAMED_ICON_RE]) {
    let match: RegExpExecArray | null
    while ((match = regex.exec(content)) !== null) {
      const iconName = match[1]?.toLowerCase()
      if (!iconName) {
        continue
      }

      addIconName(names, iconName)
    }
  }
}

/**
 * Normalizes and validates icon id before adding it into target set.
 *
 * Rules:
 * - must contain `:`
 * - both prefix and name must exist
 * - prefix must not belong to ignored protocol-like prefixes
 *
 * @param names - Mutable target set.
 * @param icon - Icon id candidate.
 */
export function addIconName(names: Set<string>, icon: string) {
  if (!icon.includes(':')) {
    return
  }
  const [prefix, name] = icon.split(':')
  if (!prefix || !name || INVALID_PREFIXES.has(prefix.toLowerCase())) {
    return
  }
  names.add(`${prefix.toLowerCase()}:${name}`)
}

/**
 * Resolves icon ids to concrete icon payloads from installed icon collections.
 *
 * Supports:
 * - explicit icon ids
 * - full collection expansion when `collections[prefix] = true`
 *
 * @param iconNames - Target icon ids.
 * @param staticIcons - Optional static icon options.
 * @param projectRequire - Consumer-project scoped require.
 * @returns Resolved icon payload map by `prefix:name`.
 */
export function resolveIcons(
  iconNames: Set<string>,
  staticIcons: StaticIconsOptions | undefined,
  projectRequire: NodeRequire,
): Record<string, IconifyIconData> {
  const result: Record<string, IconifyIconData> = {}
  const byPrefix = new Map<string, Set<string>>()

  for (const iconName of iconNames) {
    const [prefix, name] = iconName.split(':')
    if (!prefix || !name) {
      continue
    }
    if (!byPrefix.has(prefix)) {
      byPrefix.set(prefix, new Set())
    }
    byPrefix.get(prefix)!.add(name)
  }

  for (const [prefix, config] of Object.entries(
    staticIcons?.collections || {},
  )) {
    if (config !== true) {
      continue
    }
    const collection = loadCollection(prefix, projectRequire)
    if (!collection?.icons) {
      continue
    }
    for (const name of Object.keys(collection.icons)) {
      if (!byPrefix.has(prefix)) {
        byPrefix.set(prefix, new Set())
      }
      byPrefix.get(prefix)!.add(name)
    }
  }

  for (const [prefix, names] of byPrefix) {
    const collection = loadCollection(prefix, projectRequire)
    if (!collection?.icons) {
      continue
    }

    for (const name of names) {
      const icon = getIconData(collection as never, name)
      if (!icon) {
        continue
      }
      result[`${prefix}:${name}`] = {
        ...icon,
        width: (icon.width as number | undefined) ?? collection.width,
        height: (icon.height as number | undefined) ?? collection.height,
      }
    }
  }

  return result
}

/**
 * Loads icon collection JSON by prefix from the consumer project.
 *
 * Resolution order:
 * 1. `@iconify-json/<prefix>/icons.json`
 * 2. `@iconify-json/<prefix>`
 *
 * @param prefix - Icon collection prefix.
 * @param projectRequire - Consumer-project scoped require.
 * @returns Collection JSON or `null` when not found.
 */
export function loadCollection(
  prefix: string,
  projectRequire: NodeRequire,
): IconifyCollectionJSON | null {
  try {
    return projectRequire(
      `@iconify-json/${prefix}/icons.json`,
    ) as IconifyCollectionJSON
  } catch {
    try {
      const mod = projectRequire(
        `@iconify-json/${prefix}`,
      ) as IconifyCollectionJSON
      return mod
    } catch {
      console.warn(
        `[vuepress-plugin-iconify] Icon collection "${prefix}" not found. Install @iconify-json/${prefix} to use offline mode.`,
      )
      return null
    }
  }
}
