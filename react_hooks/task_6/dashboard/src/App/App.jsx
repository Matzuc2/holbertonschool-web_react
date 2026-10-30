import { useCallback, useEffect, useReducer } from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList'
import BodySection from '../BodySection/BodySection'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import WithLogging from '../HOC/WithLogging'
import { getLatestNotification } from '../utils/utils'
import { APP_ACTIONS, appReducer, initialState } from './appReducer'

const CourseListWithLogging = WithLogging(CourseList)

const initialCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

const initialNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
]

const isJestEnvironment =
  typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { displayDrawer, user, notifications, courses } = state

  const fetchData = useCallback(async (url) => {
    try {
      return await axios.get(url)
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    dispatch({ type: APP_ACTIONS.SET_COURSES, payload: initialCourses })

    if (isJestEnvironment) {
      return
    }

    fetchData('http://localhost:5173/courses.json').then((response) => {
      if (response) {
        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: response.data.courses,
        })
      }
    })
  }, [fetchData])

  useEffect(() => {
    dispatch({
      type: APP_ACTIONS.SET_NOTIFICATIONS,
      payload: initialNotifications,
    })

    if (isJestEnvironment) {
      return
    }

    fetchData('http://localhost:5173/notifications.json').then((response) => {
      if (response) {
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: response.data.notificationsList,
        })
      }
    })
  }, [fetchData])

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password },
    })
  }, [])

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id })
    console.log(`Notification ${id} has been marked as read`)
  }, [])

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true })
  }, [])

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false })
  }, [])

  return (
    <div className="App flex min-h-screen w-full flex-col px-3 sm:px-5">
      <div className="root-notifications">
        <Notifications
          displayDrawer={displayDrawer}
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
        />
      </div>
      <Header user={user} logOut={logOut} />
      {user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseListWithLogging courses={courses} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={logIn} />
        </BodySectionWithMarginBottom>
      )}
      <BodySection title="News from the School">
        <p>
          ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Similique, asperiores architecto blanditiis fuga doloribus sit
          illum aliquid ea distinctio minus accusantium, impedit quo
          voluptatibus ut magni dicta. Recusandae, quia dicta?
        </p>
      </BodySection>
      <Footer user={user} />
    </div>
  )
}

export default App
