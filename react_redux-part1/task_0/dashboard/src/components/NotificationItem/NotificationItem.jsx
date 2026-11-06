import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({ id, type, html, value, markAsRead }) {
  const markup = html || (
    value && typeof value === 'object' && '__html' in value ? value : null
  );
  const className = `${
    type === 'urgent'
      ? 'text-[var(--urgent-notification-item)]'
      : 'text-[var(--default-notification-item)]'
  } border border-[var(--main-color)] p-3 text-sm min-[912px]:border-0 min-[912px]:p-0 min-[912px]:text-base`;

  return markup ? (
    <li
      onClick={() => markAsRead(id)}
      dangerouslySetInnerHTML={markup}
      data-notification-type={type}
      className={className}
    />
  ) : (
    <li
      onClick={() => markAsRead(id)}
      data-notification-type={type}
      className={className}
    >
      {value}
    </li>
  );
});

export default NotificationItem;