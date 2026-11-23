import notificationsReducer, {
  fetchNotifications,
  hideDrawer,
  initialState,
  markNotificationAsRead,
  showDrawer,
} from '../notifications/notificationsSlice'
import { getLatestNotification } from '../../utils/utils'

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(),
}))

describe('notificationsSlice', () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      '<strong>Urgent requirement</strong> - complete by EOD'
    )
  })

  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    )
  })

  test('fetches notifications data correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'Latest notification' },
      ]),
    })

    const notificationData = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      {
        id: 3,
        type: 'urgent',
        value: 'Latest notification',
        html: {
          __html:
            '<strong>Urgent requirement</strong> - complete by EOD',
        },
      },
    ]

    const dispatch = jest.fn()
    await fetchNotifications()(dispatch)

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5173/notifications.json'
    )
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'notifications/fetchNotifications/fulfilled',
        payload: notificationData,
      })
    )
  })

  test('removes a notification when markNotificationAsRead is dispatched', () => {
    const state = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
      displayDrawer: false,
    }

    const updatedState = notificationsReducer(
      state,
      markNotificationAsRead(1)
    )

    expect(updatedState.notifications).toEqual([
      { id: 2, type: 'urgent', value: 'New resume available' },
    ])
  })

  test('toggles displayDrawer with showDrawer and hideDrawer', () => {
    let state = notificationsReducer(initialState, showDrawer())
    expect(state.displayDrawer).toBe(true)

    state = notificationsReducer(state, hideDrawer())
    expect(state.displayDrawer).toBe(false)
  })
})