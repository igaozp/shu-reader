// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { Nodes, parseDocument } from '@xieyuheng/x-markdown'
import { expect, test } from 'vitest'
import { State } from '../../State'
import MdText from './MdText.vue'

const state: State = { document: parseDocument(''), plugins: [] }

test('MdText renders the node text', () => {
  const node: Nodes.Text = { kind: 'Text', text: 'hello world' }
  const wrapper = mount(MdText, { props: { state, node } })
  expect(wrapper.text()).toEqual('hello world')
})
