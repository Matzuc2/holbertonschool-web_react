import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './App.css'
import Notifications from '../Notifications/Notifications'

function App() {
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
          <Login/>
          <Footer/>
      </div>
    </>
  );
}

export default App;
