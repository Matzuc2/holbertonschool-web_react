import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../../src/features/auth/authSlice'
import coursesReducer from '../../src/features/courses/coursesSlice'
import notificationsReducer from '../../src/features/notifications/notificationsSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    notifications: notificationsReducer 
})

export default rootReducer