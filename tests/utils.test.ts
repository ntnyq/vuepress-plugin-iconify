import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  addExplicitIcons,
  addIconName,
  addIconsFromContent,
  collectScanFiles,
  normalizeDir,
} from '../src/shared/utils'

describe('shared/utils', () => {
  const tempDirs: string[] = []

  afterEach(() => {
    for (const dir of tempDirs) {
      rmSync(dir, { force: true, recursive: true })
    }
    tempDirs.length = 0
  })

  it('normalizes directory path', () => {
    expect(normalizeDir('./docs/')).toBe('docs')
    expect(normalizeDir('foo\\bar/')).toBe('foo/bar')
    expect(normalizeDir('src')).toBe('src')
  })

  it('adds and normalizes valid icon ids only', () => {
    const names = new Set<string>()

    addIconName(names, 'FA:github')
    addIconName(names, 'http:foo')
    addIconName(names, 'missing-separator')
    addIconName(names, ':name')

    expect(Array.from(names)).toEqual(['fa:github'])
  })

  it('extracts icon ids from supported content patterns', () => {
    const names = new Set<string>()
    addIconsFromContent(
      names,
      `
      <vp-icon icon="vscode-icons:file-type-vue" />
      <VpIcon icon='fa:Github' />
      title ~fluent-emoji-flat:chipmunk~
      `,
    )

    expect(Array.from(names).sort()).toEqual([
      'fa:github',
      'fluent-emoji-flat:chipmunk',
      'vscode-icons:file-type-vue',
    ])
  })

  it('collects explicit icons from icons and collections', () => {
    const names = new Set<string>()

    addExplicitIcons(names, {
      icons: ['fa:github', 'HTTPS:skip'],
      collections: {
        fa: ['apple', 'github'],
        mdi: true,
      },
    })

    expect(Array.from(names).sort()).toEqual(['fa:apple', 'fa:github'])
  })

  it('collects scan files with extension filter', () => {
    const root = mkdtempSync(join(tmpdir(), 'iconify-utils-test-'))
    tempDirs.push(root)

    mkdirSync(join(root, 'docs'), { recursive: true })
    mkdirSync(join(root, 'node_modules', 'pkg'), { recursive: true })

    const targetMd = join(root, 'docs', 'index.md')
    const targetVue = join(root, 'docs', 'IconDemo.vue')
    const skippedExt = join(root, 'docs', 'plain.txt')

    writeFileSync(targetMd, '# demo', 'utf-8')
    writeFileSync(targetVue, '<template />', 'utf-8')
    writeFileSync(skippedExt, 'skip', 'utf-8')

    const files = collectScanFiles([root], {
      scan: true,
    }).sort()

    expect(files).toContain(targetMd)
    expect(files).toContain(targetVue)
    expect(files).not.toContain(skippedExt)
  })

  it('supports custom ignore directories for scan files', () => {
    const root = mkdtempSync(join(tmpdir(), 'iconify-utils-test-'))
    tempDirs.push(root)

    mkdirSync(join(root, 'docs'), { recursive: true })
    mkdirSync(join(root, 'ignored-dir'), { recursive: true })

    const includedFile = join(root, 'docs', 'index.md')
    const ignoredFile = join(root, 'ignored-dir', 'hidden.md')

    writeFileSync(includedFile, '# included', 'utf-8')
    writeFileSync(ignoredFile, '# ignored', 'utf-8')

    const files = collectScanFiles([root], {
      ignoreDirs: ['ignored-dir'],
      scan: true,
    })

    expect(files).toContain(includedFile)
    expect(files).not.toContain(ignoredFile)
  })
})
