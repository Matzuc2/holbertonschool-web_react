import closeButton from '../public/close-button.png'
import favicon from '../public/favicon.ico'
import holbertonLogo from '../public/holberton-logo.jpg'
import './App.css'

function App() {
  return (
    <>
      <div className='App-header'>
        <header>
          <img src={holbertonLogo} alt='Holberton logo' />
          <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
        </header>
      </div>
      <div className='App-body'>
        <body>
        <p>Login to access the full dashboard</p>
        </body>
      </div>
      <div className='App-footer'>
        <header>
          <p>Copyright {new Date().getFullYear()} - Holberton School</p>
        </header>
      </div>
    </>
  )
}

export default App