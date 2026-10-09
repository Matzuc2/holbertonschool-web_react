import React from "react"

class NotificationItem extends React.PureComponent {
    render(){
        const { type, html, value, markAsRead } = this.props
        return(
            html ?
            <li onClick={markAsRead} dangerouslySetInnerHTML={html} data-notification-type={type} className={type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'}></li>
            :
            <li onClick={markAsRead} data-notification-type={type} className={type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'}>{value}</li>
        )
    }
}
NotificationItem.defaultProps = {
    type: 'default',
}
export default NotificationItem