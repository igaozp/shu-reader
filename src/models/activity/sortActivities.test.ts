import { expect, test } from 'vitest'
import { Activity } from './Activity'
import { sortActivities } from './sortActivities'

function makeActivity(date: string): Activity {
  return {
    path: date,
    text: '',
    author: {} as Activity['author'],
    document: { attributes: { date } } as unknown as Activity['document'],
  }
}

// NOTE sortActivities orders newest-first (descending by date).
test('sortActivities orders descending by date', () => {
  const activities = [
    makeActivity('2024-01-01'),
    makeActivity('2024-03-01'),
    makeActivity('2024-02-01'),
  ]
  expect(sortActivities(activities).map((a) => a.path)).toEqual([
    '2024-03-01',
    '2024-02-01',
    '2024-01-01',
  ])
})

test('sortActivities does not mutate the input array', () => {
  const activities = [makeActivity('2024-02-01'), makeActivity('2024-01-01')]
  sortActivities(activities)
  expect(activities.map((a) => a.path)).toEqual(['2024-02-01', '2024-01-01'])
})

test('sortActivities returns an empty array unchanged', () => {
  expect(sortActivities([])).toEqual([])
})
