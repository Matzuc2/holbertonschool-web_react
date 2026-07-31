import closeButton from '../public/close-button.png'
import favicon from '../public/favicon.ico'
import holbertonLogo from '../public/holberton-logo.jpg'
import './App.css'

function App() {
  return (
    <>
      <div className='App-header'>
        <header>
          <img src={holbertonLogo} alt='holberton logo' />
          <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
        </header>
      </div>
      <div className='App-body'>
        <body>
        <p>Login to access the full dashboard</p>
        </body>
      </div>
      <div className='App-footer'>
        <footer>
          <p>Copyright 2026 - Holberton School</p>
        </footer>
      </div>
    </>
  )
}

export default App