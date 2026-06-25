// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { Nodes, parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import { State } from '../../State'
import MdLink from './MdLink.vue'

const state: State = { document: parseDocument(''), plugins: [] }

function makeLink(href: string): Nodes.Link {
  return {
    kind: 'Link',
    href,
    title: '',
    children: [{ kind: 'Text', text: 'link text' }],
  }
}

// MdNode and Hyperlink are stubbed: this test focuses on which branch MdLink
// takes (external <a target="_blank"> vs internal Hyperlink), not on rendering
// the child nodes or the router-aware Hyperlink.
const global = { stubs: { MdNode: true, Hyperlink: true } }

test('MdLink renders an external link as a new-tab anchor', () => {
  const wrapper = mount(MdLink, {
    props: { state, node: makeLink('https://example.com') },
    global,
  })
  const anchor = wrapper.get('a')
  expect(anchor.attributes('href')).toEqual('https://example.com')
  expect(anchor.attributes('target')).toEqual('_blank')
})

test('MdLink renders an internal link via Hyperlink (no new-tab anchor)', () => {
  const wrapper = mount(MdLink, {
    props: { state, node: makeLink('./relative.md') },
    global,
  })
  expect(wrapper.find('a').exists()).toEqual(false)
  expect(wrapper.findComponent({ name: 'Hyperlink' }).exists()).toEqual(true)
})
