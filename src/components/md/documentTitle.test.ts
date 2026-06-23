import { parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import { documentTitle } from './documentTitle'

test('documentTitle prefers the frontmatter title', () => {
  const document = parseDocument('---\ntitle: My Title\n---\n\n# A Headline\n')
  expect(documentTitle(document)).toEqual('My Title')
})

// NOTE the headline fallback runs the node through `formatNode`, which keeps
// the markdown `# ` prefix.
test('documentTitle falls back to the first headline', () => {
  const document = parseDocument('# A Headline\n\nSome text.\n')
  expect(documentTitle(document)).toEqual('# A Headline')
})

test('documentTitle returns undefined when there is no title or headline', () => {
  const document = parseDocument('Just a paragraph with no headline.\n')
  expect(documentTitle(document)).toEqual(undefined)
})
