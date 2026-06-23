import { expect, test } from 'vitest'
import { stringTrimEnd } from './stringTrimEnd'

test('stringTrimEnd removes repeated trailing pattern', () => {
  expect(stringTrimEnd('hello---', '-')).toEqual('hello')
  expect(stringTrimEnd('test...', '.')).toEqual('test')
})

test('stringTrimEnd trims a trailing slash', () => {
  expect(stringTrimEnd('https://example.com/', '/')).toEqual(
    'https://example.com',
  )
})

test('stringTrimEnd returns input unchanged when no match', () => {
  expect(stringTrimEnd('value', 'x')).toEqual('value')
})

test('stringTrimEnd handles multi-char pattern', () => {
  expect(stringTrimEnd('abcabcabc', 'abc')).toEqual('')
})
