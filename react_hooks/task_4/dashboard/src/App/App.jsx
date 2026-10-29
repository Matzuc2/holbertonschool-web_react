import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import React, { useContext, useState,useMemo, useEffect, useCallback } from 'react';
import AppContext from '../Context/context';
import axios from 'axios';
import { getLatestNotification } from '../utils/utils'

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App(props){

  const context = useContext(AppContext)
  const userContext = context.user

  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ]


  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(userContext)
  const [notifications, setNotifications] = useState(notificationsList)
  const [courses, setCourses] = useState([])

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  } 

  useEffect(() => {
    const loadCourses = async () => {
        const response = await fetchData('http://localhost:5173/courses.json');
        if (response) {
          setCourses(response.data.courses);
        }
      }
      loadCourses();
  }, [user])

  
  useEffect(() => {
    const loadNotifications = async () =>{
      const response = await fetchData('http://localhost:5173/notifications.json');
      if (response) {
        setNotifications(response.data.notificationsList);
      }
    }
    loadNotifications()
  },[])
  

  const logIn = React.useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, [])

  const logOut = React.useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, [])

  const markNotificationAsRead = React.useCallback((id) => {
    
    setNotifications(previousNotifications =>
      previousNotifications.filter(
        (notification) => notification.id !== id
      )
    );
    console.log(`Notification ${id} has been marked as read`);
  }, [])

  const handleDisplayDrawer = React.useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = React.useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const provider = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut]
  );

  return (
      <AppContext.Provider value={provider}>
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
          <Header />
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging
                email={user.email}
                password={user.password}
                logIn={logIn}
              />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    )

}


export default App;
