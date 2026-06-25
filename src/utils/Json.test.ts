import { expect, test } from 'vitest'
import { isJsonArray, isJsonObject } from './Json'

test('isJsonObject', () => {
  expect(isJsonObject({ a: 1 })).toEqual(true)
  expect(isJsonObject({})).toEqual(true)
  expect(isJsonObject([1, 2])).toEqual(false)
  expect(isJsonObject(null)).toEqual(false)
  expect(isJsonObject('string')).toEqual(false)
  expect(isJsonObject(42)).toEqual(false)
})

test('isJsonArray', () => {
  expect(isJsonArray([1, 2])).toEqual(true)
  expect(isJsonArray([])).toEqual(true)
  expect(isJsonArray({ a: 1 })).toEqual(false)
  expect(isJsonArray(null)).toEqual(false)
  expect(isJsonArray('string')).toEqual(false)
})
