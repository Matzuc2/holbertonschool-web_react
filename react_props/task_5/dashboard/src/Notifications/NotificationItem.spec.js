import { render } from '@testing-library/react'
import NotificationItem from './NotificationItem'

test('renders good color depending on default type', () => {
  render(<NotificationItem  type='default' />)
  const li = document.querySelector('li')
  expect(li.style.color).toBe('blue')
})

test('renders good color depending on urgent type', () => {
  render(<NotificationItem  type='urgent' />)
  const li = document.querySelector('li')
  expect(li.style.color).toBe('red')
})