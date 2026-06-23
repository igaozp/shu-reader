import { expect, test } from 'vitest'
import { AuthorConfigSchema } from './AuthorConfig'

test('AuthorConfigSchema parses a valid config with string avatar', () => {
  const config = {
    kind: 'Author',
    name: 'Author One',
    avatar: 'avatar.png',
    homepage: 'https://example.com',
    activities: ['post-1.md'],
  }
  expect(AuthorConfigSchema.parse(config)).toEqual(config)
})

test('AuthorConfigSchema accepts a light/dark avatar object', () => {
  const config = {
    kind: 'Author',
    name: 'Author One',
    avatar: { light: 'light.png', dark: 'dark.png' },
    homepage: 'https://example.com',
    activities: [],
  }
  expect(AuthorConfigSchema.parse(config)).toEqual(config)
})

test('AuthorConfigSchema rejects a config missing required fields', () => {
  expect(() =>
    AuthorConfigSchema.parse({
      kind: 'Author',
      avatar: 'avatar.png',
    }),
  ).toThrow()
})
