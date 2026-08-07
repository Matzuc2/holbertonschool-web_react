import {render, screen} from '@testing-library/react'
import App from './App'


test('renders School Dashboard h1', () => {
  render(<App />)
  const h1 = screen.getByRole('heading', { name: /School dashboard/i })
  expect(h1).toBeInTheDocument()
})

test('renders School Dashboard p', () => {
  render(<App />)
  const pLogin = screen.getByText(/Login to access the full dashboard/i)
  const pCopyright = screen.getByText(/holberton School/i)

  expect(pLogin).toBeInTheDocument()
  expect(pCopyright).toBeInTheDocument()
})

test('renders School Dashboard img', () =>{
    render(<App/>)
    const image = screen.getByAltText(/Holberton logo/i)
    expect(image).toBeInTheDocument()
})


test('renders School Dashboard inputs', () => {
  render(<App />)
  const inputs = screen.getAllByRole('textbox')
  expect(inputs).toHaveLength(2)
})


test('renders School Dashboard labels', () => {
  render(<App />)
  expect(screen.getByText(/email/i)).toBeInTheDocument()
  expect(screen.getByText(/password/i)).toBeInTheDocument()
})


test('renders School Dashboard button', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument()
})