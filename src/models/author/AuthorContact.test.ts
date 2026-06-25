import { expect, test } from 'vitest'
import { AuthorContactSchema } from './AuthorContact'

test('AuthorContactSchema parses a valid contact', () => {
  const contact = { github: 'username', email: 'user@example.com' }
  expect(AuthorContactSchema.parse(contact)).toEqual(contact)
})

test('AuthorContactSchema accepts an empty object', () => {
  expect(AuthorContactSchema.parse({})).toEqual({})
})

test('AuthorContactSchema rejects a wrong field type', () => {
  expect(() => AuthorContactSchema.parse({ github: 123 })).toThrow()
})
