import NotificationItem from "./NotificationItem"

export default function Notifications({notifications = []}) {
  return (
    <div className='notification-items'>
      <button
        aria-label='Close'
        style={{ float: 'right' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        Close
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notification)=>{
          return <NotificationItem key={notification.id} type={notification.type} html={notification.html} value={notification.value}/>
        })}
      </ul>
    </div>
  )
}