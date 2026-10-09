import NotificationItem from "./NotificationItem"
import React from "react"

class Notifications extends React.Component {
  markAsRead(id){
    console.log(`Notification ${id} has been marked as read`)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length
  }

    render(){
      const { displayDrawer = false, notifications = [] } = this.props
      return (
        <div className="fixed top-0 right-0 w-full md:w-[25%]">
          <div className="notification-title text-right">
            <p>Your Notifications</p>
          </div>
          {displayDrawer === true &&
          
          <div className="notification-items border border-dashed border-[var(--main-color)] p-[6px]">
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
                  return <NotificationItem key={notification.id} type={notification.type} html={notification.html} value={notification.value} markAsRead={() => this.markAsRead(notification.id)} />
                })}
              </ul>
              </>
            :
            <p>No new notification for now</p>
            }
            </div>
          }
        </div>
      )
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: []
}

export default Notifications;