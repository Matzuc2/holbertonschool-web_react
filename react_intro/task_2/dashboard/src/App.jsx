import holbertonLogo from '../public/holberton-logo.jpg'
import './App.css'
import Notifications from './Notifications'
import { getCurrentYear, getFooterCopy } from './utils';

function App() {
  return (
    <div className="App">
      <div className='root-notifications'>
        <Notifications/>
      </div>
      <header className="App-header">
        <img src={holbertonLogo} alt="Holberton logo" />
        <h1>School dashboard</h1>
      </header>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label for="email">email:</label>
        <input type="text" id="email" name="email"></input>
        <label for="password">password:</label>
        <input type="text" id="password" name="password"></input>
        <button>OK</button>
      </div>
      <footer className="App-footer">
        <p>copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </footer>
  </div>
  );
}

export default App;
