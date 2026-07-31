import holbertonLogo from '../public/holberton-logo.jpg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={holbertonLogo} alt="Holberton logo" />
        <h1>School dashboard</h1>
      </header>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <footer className="App-footer">
        <p>copyright - Holberton School</p>
      </footer>
    </div>
  );
}

export default App;
