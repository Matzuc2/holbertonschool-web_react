import { memo } from "react"

const NotificationItem = memo(function NotificationItem (props){
    const { key, type, html, value, markAsRead } = props
    return(
        html ?
        <li onClick={() => markAsRead(key)} dangerouslySetInnerHTML={html} data-notification-type={type} className={`${type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'} border border-[var(--main-color)] p-3 text-sm min-[912px]:border-0 min-[912px]:p-0 min-[912px]:text-base`}></li>
        :
        <li onClick={() => markAsRead(key)} data-notification-type={type} className={`${type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'} border border-[var(--main-color)] p-3 text-sm min-[912px]:border-0 min-[912px]:p-0 min-[912px]:text-base`}>{value}</li>
    )
})


export default NotificationItem