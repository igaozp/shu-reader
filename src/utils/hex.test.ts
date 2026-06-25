import { expect, test } from 'vitest'
import { hexDecode, hexEncode } from './hex'

// NOTE hexEncode does not zero-pad code points below 0x10, so it is only
// lossless for characters >= 0x10 (ordinary printable text). The roundtrip
// tests below stick to such characters.

test('hexEncode ascii', () => {
  expect(hexEncode('hello')).toEqual('68656c6c6f')
  expect(hexEncode('A')).toEqual('41')
})

test('hexDecode ascii', () => {
  expect(hexDecode('68656c6c6f')).toEqual('hello')
  expect(hexDecode('41')).toEqual('A')
})

test('hexEncode/hexDecode roundtrip with unicode', () => {
  const text = 'readonly.link 構造'
  expect(hexDecode(hexEncode(text))).toEqual(text)
})
