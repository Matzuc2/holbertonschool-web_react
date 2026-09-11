import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './App.css'
import Notifications from '../Notifications/Notifications'
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {logout: props.logout ?? (() =>{})}
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert("Logging you out")
      this.state.logout()
    }
  }
  render() {
    return(
    <>
      <div className="App">
          <div className='root-notifications'>
            <Notifications/>
          </div>
          <Header/>
          <Login/>
          <Footer/>
      </div>
    </>)
  };
}

export default App;
