import { expect, test } from 'vitest'
import { leftPad } from './leftPad'

test('leftPad pads with given char', () => {
  expect(leftPad('5', 3, '0')).toEqual('005')
  expect(leftPad('42', 4, '0')).toEqual('0042')
})

test('leftPad pads with space by default', () => {
  expect(leftPad('x', 3)).toEqual('  x')
})

test('leftPad leaves an exactly-long-enough string unchanged', () => {
  expect(leftPad('99', 2, '0')).toEqual('99')
})

// NOTE leftPad does not guard against negative padding: when the input is
// already longer than `size`, `char.repeat(size - line.length)` throws.
test('leftPad throws when the input is longer than size', () => {
  expect(() => leftPad('hello', 3, '0')).toThrow(RangeError)
})
