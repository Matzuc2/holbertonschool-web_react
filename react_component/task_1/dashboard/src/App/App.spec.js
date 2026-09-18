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
    const logOut = jest.fn()
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    try {
      render(<App logOut={logOut} />)

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", {
          key: "h",
          code: "h",
          ctrlKey: true,
          bubbles: true,
        }))
      })

      expect(logOut).toHaveBeenCalledTimes(1)
    } finally {
      alertSpy.mockRestore()
    }
  })

  test('alert function is called with the logout message', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    try {
      render(<App />)

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", {
          key: "h",
          code: "h",
          ctrlKey: true,
          bubbles: true,
        }))
      })

      expect(alertSpy).toHaveBeenCalledWith("Logging you out")
    } finally {
      alertSpy.mockRestore()
    }
  })
})