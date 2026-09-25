import React from "react"

class NotificationItem extends React.PureComponent {
    render(){
        const { type, html, value, markAsRead } = this.props
        return(
            html ?
            <li onClick={markAsRead} dangerouslySetInnerHTML={html} data-notification-type={type} style={{
                color: type === 'urgent' ? 'red' : 'blue'
            }}></li>
            :
            <li onClick={markAsRead} data-notification-type={type} style={{
                color: type === 'urgent' ? 'red' : 'blue'
            }}>{value}</li>
        )
    }
}
NotificationItem.defaultProps = {
    type: 'default',
}
export default NotificationItem