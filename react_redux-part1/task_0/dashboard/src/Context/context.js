import { createContext } from 'react'

const context = createContext({
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
})

export default context
