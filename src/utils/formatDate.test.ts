import { expect, test } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatDetla,
  formatTime,
} from './formatDate'

// NOTE Dates are built with the local constructor (year, monthIndex, day, ...)
// to avoid timezone-dependent parsing of date strings.

test('formatDate pads month and day', () => {
  expect(formatDate(new Date(2024, 0, 5))).toEqual('2024-01-05')
  expect(formatDate(new Date(2024, 11, 25))).toEqual('2024-12-25')
})

test('formatTime pads hours, minutes, seconds', () => {
  expect(formatTime(new Date(2024, 0, 5, 9, 3, 7))).toEqual('09:03:07')
  expect(formatTime(new Date(2024, 0, 5, 14, 30, 45))).toEqual('14:30:45')
})

test('formatTime with milliseconds', () => {
  expect(
    formatTime(new Date(2024, 0, 5, 14, 30, 45, 123), {
      withMilliseconds: true,
    }),
  ).toEqual('14:30:45.123')
})

test('formatDateTime combines date and time', () => {
  expect(formatDateTime(new Date(2024, 0, 5, 14, 30, 45).getTime())).toEqual(
    '2024-01-05 14:30:45',
  )
})

test('formatDetla in english', () => {
  expect(formatDetla(0, { lang: 'en' })).toEqual('just now')
  expect(formatDetla(2 * 60 * 1000, { lang: 'en' })).toEqual('2 minutes ago')
  expect(formatDetla(3 * 60 * 60 * 1000, { lang: 'en' })).toEqual('3 hours ago')
  expect(formatDetla(2 * 24 * 60 * 60 * 1000, { lang: 'en' })).toEqual(
    '2 days ago',
  )
})

test('formatDetla in chinese', () => {
  expect(formatDetla(0, { lang: 'zh' })).toEqual('刚才')
  expect(formatDetla(2 * 60 * 1000, { lang: 'zh' })).toEqual('2 分钟前')
  expect(formatDetla(3 * 60 * 60 * 1000, { lang: 'zh' })).toEqual('3 小时前')
  expect(formatDetla(2 * 24 * 60 * 60 * 1000, { lang: 'zh' })).toEqual('2 天前')
})
