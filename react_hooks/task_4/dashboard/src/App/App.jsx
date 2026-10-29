import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { useState,useMemo, useEffect, useCallback } from 'react';
import AppContext, { user as defaultUser } from '../Context/context'
import axios from 'axios';
import { getLatestNotification } from '../utils/utils'

const CourseListWithLogging = WithLogging(CourseList);

const initialCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const isTestEnvironment =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

function App(){
  const ContextProvider = AppContext.Provider

  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ]


  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser)
  const [notifications, setNotifications] = useState(notificationsList)
  const [courses, setCourses] = useState(initialCourses)

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response;
    } catch {
      return null;
    }
  } 

  useEffect(() => {
    if (isTestEnvironment) {
      return;
    }

    const loadCourses = async () => {
        const response = await fetchData('/courses.json');
        if (response) {
          setCourses(response.data.courses);
        }
      }
      loadCourses();
  }, [user])

  
  useEffect(() => {
    const loadNotifications = async () =>{
      const response = await fetchData('/notifications.json');
      if (response) {
        setNotifications(response.data.notificationsList);
      }
    }
    loadNotifications()
  },[])
  

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, [])

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    
    setNotifications(previousNotifications =>
      previousNotifications.filter(
        (notification) => notification.id !== id
      )
    );
    console.log(`Notification ${id} has been marked as read`);
  }, [])

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
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
      <ContextProvider value={provider}>
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
              <Login
                email={user.email}
                password={user.password}
                logIn={logIn}
              />
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
          <Footer />
        </div>
      </ContextProvider>
    )

}


export default App;
