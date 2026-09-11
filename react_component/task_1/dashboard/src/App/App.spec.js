
import {render} from '@testing-library/react'
import App from './App'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'

jest.mock('../Login/Login', () => jest.fn(() => null))
jest.mock('../CourseList/CourseList', () => jest.fn(() => null))
test('isLoggedIn is false', () =>{
  render(<App />)
  expect(Login).toHaveBeenCalled()
})

test('isLoggedIn is true', () =>{
  render(<App isLoggedIn={true} />)
  expect(CourseList).toHaveBeenCalled()
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

