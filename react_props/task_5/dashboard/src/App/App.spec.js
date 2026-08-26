
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

