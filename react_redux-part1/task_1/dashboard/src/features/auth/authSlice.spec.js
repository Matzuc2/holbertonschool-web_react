import authReducer, { initialState, login, logout } from './authSlice'

describe('authSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  test('sets credentials and isLoggedIn on login', () => {
    const state = authReducer(
      initialState,
      login({
        email: 'student@example.com',
        password: 'password123',
      })
    )

    expect(state.user).toEqual({
      email: 'student@example.com',
      password: 'password123',
      isLoggedIn: true,
    })
  })

  test('isLoggedIn is false in the initial state', () => {
    expect(initialState.user.isLoggedIn).toBe(false)
  })

  test('resets credentials and isLoggedIn on logout', () => {
    const loggedInState = authReducer(
      initialState,
      login({
        email: 'student@example.com',
        password: 'password123',
      })
    )

    const state = authReducer(loggedInState, logout())

    expect(state.user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    })
  })
})