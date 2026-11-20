import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        email: action.payload.email,
        password: action.payload.password,
        isLoggedIn: true,
      }
    },
    logout: (state) => {
      state.user = {
        email: '',
        password: '',
        isLoggedIn: false,
      }
    },
  },
})

export const { login, logout } = authSlice.actions
export const actions = authSlice.actions
export default authSlice.reducer