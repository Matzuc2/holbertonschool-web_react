import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLatestNotification } from '../../utils/utils'


const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   notifications: `${API_BASE_URL}/notifications.json`
} 
    

export const initialState = {
    notifications : [],
    displayDrawer : true
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async ()=>{
    const res = await(fetch(ENDPOINTS.notifications))
    const obj = await res.json()
    const notificationUpdate = obj.notifications.map((notification) =>{
        if(notification.id === 3){
            notification.value = getLatestNotification()
        }
        return notification
    })
    
    return notificationUpdate
})

const notificationsSlice = createSlice({
        name:'notifications',
        initialState: initialState,
        reducers: {
            markNotificationAsRead : (state, action) =>{
                const notificationId = typeof action.payload === 'object'
                    ? action.payload.notifications?.[0]?.id ?? action.payload.id
                    : action.payload

                state.notifications = state.notifications.filter(
                    (notification) => notification.id !== notificationId
                )
            },
            showDrawer : (state) =>{
                state.displayDrawer = true
            },
            hideDrawer : (state) => {
                state.displayDrawer = false
            }
        },
        extraReducers : (builder) => {
            builder.addCase(fetchNotifications.fulfilled, (state, action) =>{
                state.notifications = action.payload
            })
        }
    }
)

export default notificationsSlice.reducer
export const {markNotificationAsRead, showDrawer, hideDrawer} = notificationsSlice.actions