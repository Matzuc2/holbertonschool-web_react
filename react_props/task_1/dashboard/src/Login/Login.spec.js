import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'


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

test('inputs get focus for clicks on label', async () => {
  render(<Login />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const emailLabel = screen.getByText('email:')
  const passwordLabel = screen.getByText('password:')
  const user = userEvent.setup()

  await user.click(emailLabel)
  expect(emailInput).toHaveFocus()

  await user.click(passwordLabel)
  expect(passwordInput).toHaveFocus()
})