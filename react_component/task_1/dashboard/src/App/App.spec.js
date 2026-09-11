
import {render, screen} from '@testing-library/react'
import App from './App'

test('renders Footer', () => {
  render(<App />)

  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})

test('logout called when h and ctrl are pressed same time', ()=>{
    const logout = jest.fn()
    render(<App logout={logout} />)
    document.dispatchEvent(new KeyboardEvent("keydown", {
    key: "h",
    code: "h",
    ctrlKey: true
  }));

  expect(logout).toHaveBeenCalled()

})

test('alert function is called ?', ()=>{
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)
    document.dispatchEvent(new KeyboardEvent("keydown", {
    key: "h",
    code: "h",
    ctrlKey: true
  }));

  expect(window.alert).toHaveBeenCalledWith("Logging you out")
})