import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer, {
  fetchNotifications,
  initialState,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice'
import { getLatestNotification } from '../../utils/utils'

describe('notificationsSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  test('fetches notifications data correctly', async () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ]

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ notifications }),
    })

    const store = configureStore({
      reducer: {
        notifications: notificationsReducer,
      },
    })

    await store.dispatch(fetchNotifications())

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5173/notifications.json')
    expect(store.getState().notifications.notifications).toHaveLength(3)
    expect(store.getState().notifications.notifications[0]).toEqual(notifications[0])
    expect(store.getState().notifications.notifications[2].html.__html).toBe(getLatestNotification())
  })

  test('removes a notification with markNotificationAsRead', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
      displayDrawer: true,
    }

    const state = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead(1)
    )

    expect(state.notifications).toEqual([
      { id: 2, type: 'urgent', value: 'New resume available' },
    ])
  })

  test('toggles the displayDrawer state with showDrawer and hideDrawer', () => {
    let state = notificationsReducer(initialState, showDrawer())
    expect(state.displayDrawer).toBe(true)

    state = notificationsReducer(state, hideDrawer())
    expect(state.displayDrawer).toBe(false)
  })
})