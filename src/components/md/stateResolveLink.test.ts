import { parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import { State } from './State'
import { stateResolveLink } from './stateResolveLink'

function makeState(url?: URL): State {
  return { url, document: parseDocument(''), plugins: [] }
}

test('stateResolveLink returns external links unchanged', () => {
  const state = makeState(new URL('https://example.com/page'))
  expect(stateResolveLink(state, 'https://google.com')).toEqual(
    'https://google.com',
  )
})

test('stateResolveLink returns link unchanged when state has no url', () => {
  const state = makeState(undefined)
  expect(stateResolveLink(state, './relative.md')).toEqual('./relative.md')
})

test('stateResolveLink resolves relative links against state.url', () => {
  const state = makeState(new URL('https://example.com/dir/page.md'))
  expect(stateResolveLink(state, './sibling.md')).toEqual(
    'https://example.com/dir/sibling.md',
  )
  expect(stateResolveLink(state, '../parent.md')).toEqual(
    'https://example.com/parent.md',
  )
})
