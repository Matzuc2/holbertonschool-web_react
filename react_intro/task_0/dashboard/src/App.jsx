import closeButton from '../public/close-button.png'
import favicon from '../public/favicon.ico'
import holbertonLogo from '../public/holberton-logo.jpg'
import './App.css'

function App() {
  return (
    <>
      <div className='App-header'>
        <img src={holbertonLogo} alt='holberton logo' />
        <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
      </div>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>
      <div className='App-footer'>
        <p>Copyright {new Date().getFullYear()} - Holberton School</p>
      </div>
    </>
  )
}

export default App