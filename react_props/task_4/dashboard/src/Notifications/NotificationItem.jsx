function NotificationItem({type='default',html,value}){
    return(
        html ?
        <li dangerouslySetInnerHTML={html} data-notification-type={type} style={{
            color: type === 'urgent' ? 'red' : 'blue'
        }}></li>
        :
        <li data-notification-type={type} style={{
            color: type === 'urgent' ? 'red' : 'blue'
        }}>{value}</li>
    )
}
export default NotificationItem