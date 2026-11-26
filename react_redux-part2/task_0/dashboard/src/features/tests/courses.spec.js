import { configureStore } from '@reduxjs/toolkit'
import mockAxios from 'jest-mock-axios'
import coursesReducer, {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../courses/coursesSlice'
import { logout } from '../auth/authSlice'

describe('coursesSlice', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  test('returns the correct initial state by default', () => {
    expect(coursesReducer(undefined, { type: '@@INIT' })).toEqual({
      courses: [],
    })
  })

  test('fetches courses data correctly', async () => {
    const courses = [
      { id: 1, name: 'ES6' },
      { id: 2, name: 'Webpack' },
    ]

    const store = configureStore({
      reducer: { courses: coursesReducer },
    })

    const promise = store.dispatch(fetchCourses())

    mockAxios.mockResponse({
      data: { courses },
    })

    await promise

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    )
    expect(store.getState().courses.courses).toEqual(
      courses.map((course) => ({ ...course, isSelected: false }))
    )
  })

  test('selects and unselects a course by id', () => {
    const state = {
      courses: [
        { id: 1, name: 'ES6', isSelected: false },
        { id: 2, name: 'Webpack', isSelected: false },
      ],
    }

    const selectedState = coursesReducer(state, selectCourse('1'))
    expect(selectedState.courses[0].isSelected).toBe(true)
    expect(selectedState.courses[1].isSelected).toBe(false)

    const unselectedState = coursesReducer(selectedState, unSelectCourse('1'))
    expect(unselectedState.courses[0].isSelected).toBe(false)
  })

  test('clears courses when logout is dispatched', () => {
    const state = {
      courses: [
        { id: 1, name: 'ES6' },
      ],
    }

    const updatedState = coursesReducer(state, logout())

    expect(updatedState.courses).toEqual([])
  })
})