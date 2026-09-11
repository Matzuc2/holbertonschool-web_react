import { render, act } from '@testing-library/react'
import App from './App'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'

jest.mock('../Login/Login', () => jest.fn(() => null))
jest.mock('../CourseList/CourseList', () => jest.fn(() => null))

describe('App', () => {
  test('isLoggedIn is false', () => {
    render(<App />)
    expect(Login).toHaveBeenCalled()
  })

  test('isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />)
    expect(CourseList).toHaveBeenCalled()
  })

  test('logout called when h and ctrl are pressed same time', () => {
    const logout = jest.fn()
    render(<App logout={logout} />)

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "h",
        code: "h",
        ctrlKey: true,
        bubbles: true,
      }))
    })

    expect(logout).toHaveBeenCalled()
  })

  test('alert function is called ?', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "h",
        code: "h",
        ctrlKey: true,
        bubbles: true,
      }))
    })

    expect(alertSpy).toHaveBeenCalledWith("Logging you out")
    alertSpy.mockRestore()
  })
})