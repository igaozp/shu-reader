import { expect, test } from 'vitest'
import { arrayFromRange } from './arrayFromRange'

test('arrayFromRange with default step', () => {
  expect(arrayFromRange({ start: 0, length: 3 })).toEqual([0, 1, 2])
  expect(arrayFromRange({ start: 5, length: 3 })).toEqual([5, 6, 7])
})

test('arrayFromRange with custom step', () => {
  expect(arrayFromRange({ start: 1, length: 3, step: 2 })).toEqual([1, 3, 5])
})

test('arrayFromRange with length 1', () => {
  expect(arrayFromRange({ start: 10, length: 1 })).toEqual([10])
})

test('arrayFromRange with length 0', () => {
  expect(arrayFromRange({ start: 0, length: 0 })).toEqual([])
})
