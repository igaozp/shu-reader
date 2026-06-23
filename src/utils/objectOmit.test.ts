import { expect, test } from 'vitest'
import { objectOmit } from './objectOmit'

test('objectOmit removes the given key', () => {
  expect(objectOmit({ a: 1, b: 2 }, 'b')).toEqual({ a: 1 })
  expect(objectOmit({ x: 'val' }, 'x')).toEqual({})
})

test('objectOmit does not mutate the original object', () => {
  const original = { a: 1, b: 2 }
  objectOmit(original, 'b')
  expect(original).toEqual({ a: 1, b: 2 })
})

test('objectOmit is a no-op for a missing key', () => {
  expect(objectOmit({ a: 1 }, 'missing' as 'a')).toEqual({ a: 1 })
})
