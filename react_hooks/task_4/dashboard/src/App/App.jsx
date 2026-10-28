import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import React, { useState } from 'react';
import AppContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App(props){
  const user = {
      email: '',
      password: '',
      isLoggedIn: false
  }

  const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
  ]

  const coursesList = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: "40" },
      { id: 3, name: "React", credit: "20" },
  ]

  const [state, setState] = useState({
      displayDrawer: false,
      user: user,
      notifications: notificationsList,
      courses: coursesList
  })

  const [provider, setProvider] = useState( {
      user,
      logOut: logOut
  })

  function logIn (email, password) {
    setState((prevState) => ({...prevState, user: {
      email: email,
      password: password,
      isLoggedIn: true
    }}))
    setProvider((prevState) => ({...prevState, user: {
      email: email,
      password: password,
      isLoggedIn: true
    }}))
    console.log('isLoggedin  : ' + state.user.isLoggedIn)
  }

  function logOut(){
    const loggedOutuser = {
      email: '',
      password: '',
      isLoggedIn: false
    }
    setState((prev) => ({...prev, user: loggedOutuser}))
    setProvider((prev) => ({...prev, user: loggedOutuser}))  
  }

  function markNotificationAsRead (id) {
    console.log(`Notification ${id} has been marked as read`)
    setState((prevState) => ({
      ...prevState,
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id
      )
    }))
  }

  function handleDisplayDrawer() {
    setState((prev) => ({...prev, displayDrawer: true }))
  }

  function handleHideDrawer(){
    setState((prev) => ({...prev, displayDrawer: false }))
  }

  return (
      <AppContext.Provider value={provider}>
        <div className="App flex min-h-screen w-full flex-col px-3 sm:px-5">
          <div className="root-notifications">
            <Notifications
              displayDrawer={state.displayDrawer}
              notifications={state.notifications}
              markNotificationAsRead={markNotificationAsRead}
              handleDisplayDrawer={handleDisplayDrawer}
              handleHideDrawer={handleHideDrawer}
            />
          </div>
          <Header />
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          {state.user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={state.courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom>
              <LoginWithLogging
                email={state.user.email}
                password={state.user.password}
                logIn={logIn}
              />
            </BodySectionWithMarginBottom>
          )}
          <Footer />
        </div>
      </AppContext.Provider>
    )

}


export default App;
