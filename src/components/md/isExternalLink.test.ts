import { expect, test } from 'vitest'
import { isExternalLink } from './isExternalLink'

test('isExternalLink recognizes external schemes', () => {
  expect(isExternalLink('http://example.com')).toEqual(true)
  expect(isExternalLink('https://example.com')).toEqual(true)
  expect(isExternalLink('mailto:user@example.com')).toEqual(true)
  expect(isExternalLink('data:text/plain,hello')).toEqual(true)
})

test('isExternalLink treats relative and absolute paths as internal', () => {
  expect(isExternalLink('./relative.md')).toEqual(false)
  expect(isExternalLink('../up.md')).toEqual(false)
  expect(isExternalLink('/absolute/path')).toEqual(false)
  expect(isExternalLink('anchor')).toEqual(false)
})
