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

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { displayDrawer, user, notifications, courses } = state

  useEffect(() => {
    let isMounted = true

    axios
      .get('http://localhost:5173/notifications.json')
      .then((response) => {
        if (!isMounted) {
          return
        }

        const notifications = response.data.notifications.map((notification) =>
          notification.id === 3
            ? {
                ...notification,
                html: { __html: getLatestNotification() },
              }
            : notification
        )

        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: notifications,
        })
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching notifications', error)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!user.isLoggedIn) {
      return
    }

    let isMounted = true

    axios
      .get('http://localhost:5173/courses.json')
      .then((response) => {
        if (!isMounted) {
          return
        }

        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: response.data.courses,
        })
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Error fetching courses', error)
        }
      })

    return () => {
      isMounted = false
    }
  }, [user.isLoggedIn])

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
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })
  }, [])

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })
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
