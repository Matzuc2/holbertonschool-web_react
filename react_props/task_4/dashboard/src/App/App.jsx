import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './App.css'
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';

function App({isLoggedIn = false}) {
    const courses = [
    {
        id: 1,
        name: "ES6",
        credit: 60
    },
    {
        id: 2,
        name: "Webpack",
        credit: "40"
    },
    {
        id: 3,
        name: "React",
        credit: "20"
    }]
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', value: 'New data available' },
  ]
  return (
    <>
      <div className="App">
          <div className='root-notifications'>
            <Notifications notifications={notificationsList}/>
          </div>
          <Header/>
          {isLoggedIn ?
            <CourseList courses={courses}/> 
            :
            <Login/>
          }
          <Footer/>
      </div>
    </>
  );
}

export default App;
