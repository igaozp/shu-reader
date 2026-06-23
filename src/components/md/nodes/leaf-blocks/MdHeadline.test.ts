// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { Nodes, parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import { State } from '../../State'
import MdHeadline from './MdHeadline.vue'

const state: State = { document: parseDocument(''), plugins: [] }

// MdNode (the recursive child renderer) is stubbed to keep the test focused on
// the headline anchor's slug-derived id/href.
const global = { stubs: { MdNode: true } }

test('MdHeadline sets the anchor id and href from the slug of its text', () => {
  const node: Nodes.Headline = {
    kind: 'Headline',
    level: 1,
    children: [{ kind: 'Text', text: 'Hello World' }],
  }
  const wrapper = mount(MdHeadline, { props: { state, node }, global })
  const anchor = wrapper.get('a')
  expect(anchor.attributes('id')).toEqual('hello-world')
  expect(anchor.attributes('href')).toEqual('#hello-world')
})
