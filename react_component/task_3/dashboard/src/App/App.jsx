import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './App.css'
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logout: props.logout ?? (() => {}),
      isLoggedIn: props.isLoggedIn ?? false,
    }

    this.courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: "40" },
      { id: 3, name: "React", credit: "20" },
    ]

    this.notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
    ]
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault()
      alert("Logging you out")
      this.state.logout()
    }
  }

  render() {
    const { isLoggedIn } = this.state

    return (
      <>
        <div className="App">
          <div className='root-notifications'>
            <Notifications notifications={this.notificationsList} />
          </div>
          <Header />
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={this.courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login />
            </BodySectionWithMarginBottom>
          )}
          <Footer />
        </div>
      </>
    )
  }
}

export default App;