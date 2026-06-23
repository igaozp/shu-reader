import { expect, test } from 'vitest'
import { isValidDate } from './isValidDate'

test('isValidDate accepts valid inputs', () => {
  expect(isValidDate('2024-01-15')).toEqual(true)
  expect(isValidDate(new Date(2024, 0, 15))).toEqual(true)
  expect(isValidDate(1704412800000)).toEqual(true)
})

test('isValidDate rejects invalid inputs', () => {
  expect(isValidDate('not a date')).toEqual(false)
  expect(isValidDate({})).toEqual(false)
  expect(isValidDate(undefined)).toEqual(false)
})
