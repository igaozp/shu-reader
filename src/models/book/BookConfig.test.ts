import { expect, test } from 'vitest'
import { BookConfigSchema } from './BookConfig'

test('BookConfigSchema parses a valid config', () => {
  const config = {
    kind: 'Book',
    title: 'A Book',
    authors: ['Author One'],
    src: 'src/',
    contents: ['chapter-1.md', 'chapter-2.md'],
  }
  expect(BookConfigSchema.parse(config)).toEqual(config)
})

test('BookConfigSchema accepts optional fields', () => {
  const config = {
    kind: 'Book',
    title: 'A Book',
    subtitle: 'A Subtitle',
    version: '1.0',
    authors: ['Author One'],
    translators: ['Translator One'],
    year: '2024',
    date: '2024-01-15',
    src: 'src/',
    contents: [],
  }
  expect(BookConfigSchema.parse(config)).toEqual(config)
})

test('BookConfigSchema rejects a wrong kind', () => {
  expect(() =>
    BookConfigSchema.parse({
      kind: 'Manual',
      title: 'A Book',
      authors: [],
      src: 'src/',
      contents: [],
    }),
  ).toThrow()
})

test('BookConfigSchema rejects a missing required field', () => {
  expect(() =>
    BookConfigSchema.parse({
      kind: 'Book',
      title: 'A Book',
      authors: [],
      contents: [],
    }),
  ).toThrow()
})

test('BookConfigSchema rejects a wrong field type', () => {
  expect(() =>
    BookConfigSchema.parse({
      kind: 'Book',
      title: 123,
      authors: [],
      src: 'src/',
      contents: [],
    }),
  ).toThrow()
})
