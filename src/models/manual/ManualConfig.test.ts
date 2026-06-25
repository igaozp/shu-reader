import { expect, test } from 'vitest'
import { ManualConfigSchema } from './ManualConfig'

test('ManualConfigSchema parses a valid config', () => {
  const config = {
    kind: 'Manual',
    title: 'A Manual',
    authors: ['Author One'],
    src: 'src/',
    main: 'index.md',
    sections: { 'Getting Started': ['intro.md'] },
  }
  expect(ManualConfigSchema.parse(config)).toEqual(config)
})

test('ManualConfigSchema rejects a config missing src/main/sections', () => {
  expect(() =>
    ManualConfigSchema.parse({
      kind: 'Manual',
      title: 'A Manual',
      authors: [],
    }),
  ).toThrow()
})

test('ManualConfigSchema rejects wrong sections type', () => {
  expect(() =>
    ManualConfigSchema.parse({
      kind: 'Manual',
      title: 'A Manual',
      authors: [],
      src: 'src/',
      main: 'index.md',
      sections: ['not', 'a', 'record'],
    }),
  ).toThrow()
})
