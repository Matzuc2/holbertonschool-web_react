import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from '../auth/authSlice';

const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   courses: `${API_BASE_URL}/courses.json`
}
const initialState = {
    courses: [],
    isSelected: false
}
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () =>{
    const res = await axios.get(ENDPOINTS.courses)
    return res.data.courses
})

const coursesSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        selectCourse: (state,action) =>{
            const id = action.payload
            let selectedCourse = state.courses.find(course => course.id === id)
            if (selectedCourse){
                selectedCourse.isSelected = true
                console.log(`course ${id} is selected`)
            }
        },
        unselectCourse: (state, action) =>{
            const id = action.payload
            let selectedCourse = state.courses.find(course => course.id === id)
            if (selectedCourse){
                selectedCourse.isSelected = false
                console.log(`course ${id} is unselected`)
            }
        }

    },
    extraReducers : (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) =>{
            state.courses = action.payload
            state.isSelected = false
        },
        builder.addCase(logout, (state) =>{
            state.courses = []
        }))
    }
})

export default coursesSlice.reducer
export const {unselectCourse, selectCourse} = coursesSlice.actions 