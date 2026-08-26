import NotificationItem from "./NotificationItem"

export default function Notifications({notifications = [], displayDrawer = false}) {
  return (
    <>
      <div className="notification-title">
        <p>Your Notifications</p>
      </div>
      {displayDrawer === true &&
      
      <div className='notification-items'>
        {notifications.length > 0 ?
          <>
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
          </>
        :
        <p>No new notification for now</p>
        }
        </div>
      }
    </>
  )
}