// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { Node, Nodes, parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import MdNode from './MdNode.vue'
import { State } from './State'

const state: State = { document: parseDocument(''), plugins: [] }

test('MdNode dispatches a known node kind to its component', () => {
  const node: Nodes.Text = { kind: 'Text', text: 'dispatched text' }
  const wrapper = mount(MdNode, { props: { state, node } })
  expect(wrapper.text()).toContain('dispatched text')
})

test('MdNode renders a fallback for an unknown node kind', () => {
  const node = { kind: 'Nonexistent' } as unknown as Node
  const wrapper = mount(MdNode, { props: { state, node } })
  expect(wrapper.text()).toContain('Nonexistent')
  expect(wrapper.get('span').attributes('title')).toEqual(
    'Unhandled Markdown Node',
  )
})
