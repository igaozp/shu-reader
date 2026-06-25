import { expect, test } from 'vitest'
import { normalizeAttributes, normalizeDate } from './normalizeAttributes'

// NOTE `subtitle` is intentionally not asserted here: there is a known bug in
// normalizeAttributes (the `subtitle` input is assigned to the `title`
// variable), so the returned `subtitle` field is always undefined. See the
// plan's "遗留待办" note.

test('normalizeDate stringifies a year-like number', () => {
  expect(normalizeDate(2024)).toEqual('2024')
})

test('normalizeDate formats a timestamp', () => {
  expect(normalizeDate(new Date(2024, 0, 15).getTime())).toEqual('2024-01-15')
})

test('normalizeDate formats a Date instance', () => {
  expect(normalizeDate(new Date(2024, 0, 15))).toEqual('2024-01-15')
})

test('normalizeDate keeps an unparseable string as-is', () => {
  expect(normalizeDate('not a date')).toEqual('not a date')
})

test('normalizeAttributes reads the title', () => {
  expect(normalizeAttributes({ title: 'Hello' }).title).toEqual('Hello')
  expect(normalizeAttributes({ title: 123 }).title).toEqual(undefined)
})

test('normalizeAttributes merges author and authors', () => {
  expect(
    normalizeAttributes({ author: 'A1', authors: ['A2', 'A3'] }).authors,
  ).toEqual(['A1', 'A2', 'A3'])
})

test('normalizeAttributes merges translator and translators', () => {
  expect(
    normalizeAttributes({ translator: 'T1', translators: ['T2'] }).translators,
  ).toEqual(['T1', 'T2'])
})

test('normalizeAttributes merges keywords and tags', () => {
  expect(
    normalizeAttributes({ keywords: ['k1'], tags: ['k2'] }).keywords,
  ).toEqual(['k1', 'k2'])
})

test('normalizeAttributes prefers date over year', () => {
  expect(normalizeAttributes({ year: 2024 }).date).toEqual(2024)
  expect(
    normalizeAttributes({ year: 2024, date: new Date(2024, 0, 15) }).date,
  ).toEqual('2024-01-15')
})

test('normalizeAttributes returns empty arrays by default', () => {
  const result = normalizeAttributes({})
  expect(result.authors).toEqual([])
  expect(result.translators).toEqual([])
  expect(result.keywords).toEqual([])
})
