import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLatestNotification } from '../../utils/utils'
import axios from 'axios';

const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   notifications: `${API_BASE_URL}/notifications.json`
} 
    

export const initialState = {
    notifications : [],
    displayDrawer : false
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async ()=>{
    const res = await(axios.get(ENDPOINTS.notifications))
    const notifications = res.data.notifications
    const latestNotification = {
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    };
    const notificationsUpdate = notifications.map((notification) => {
        if(notification.id === 3){
            notification = latestNotification
        }
        return notification
    })
    
    return notificationsUpdate
})

const notificationsSlice = createSlice({
        name:'notifications',
        initialState: initialState,
        reducers: {
            markNotificationAsRead : (state, action) =>{
                state.notifications = state.notifications.filter(
                    (notification) => notification.id !== action.payload.notifications[0].id
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