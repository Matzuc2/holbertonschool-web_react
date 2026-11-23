import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLatestNotification } from '../../utils/utils'


const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   courses: `${API_BASE_URL}/courses.json`
} 