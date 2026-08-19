import './Notifications.css'
import closeIcon from './close-icon.png'
import { getLatestNotification } from './utils'

export default function Notifications() {
  return (
    <div className='notification-items'>
      <button
        aria-label='Close'
        style={{ float: 'right' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt='close icon' />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority='default'>New course available</li>
        <li data-priority='urgent'>New resume available</li>
        <li data-priority='urgent' dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
      </ul>
    </div>
  )
}