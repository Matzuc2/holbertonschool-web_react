import {render, screen} from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'


test('renders School Dashboard p', () => {
  render(<Login />)
  const pLogin = screen.getByText(/Login to access the full dashboard/i)
  const inputs = document.getElementsByTagName('input')
  const labels = document.getElementsByTagName('label')
  const button = document.getElementsByTagName('button')
  expect(labels.length).toEqual(2)
  expect(inputs.length).toEqual(2)
  expect(button.length).toEqual(1)
  expect(pLogin).toBeInTheDocument()
})

test('inputs get focus when their labels are clicked', async () => {
  const user = userEvent.setup()
  render(<Login />)

  const emailInput = screen.getByLabelText('email:')
  const passwordInput = screen.getByLabelText('password:')

  await user.click(screen.getByText('email:'))
  expect(emailInput).toHaveFocus()

  await user.click(screen.getByText('password:'))
  expect(passwordInput).toHaveFocus()
})