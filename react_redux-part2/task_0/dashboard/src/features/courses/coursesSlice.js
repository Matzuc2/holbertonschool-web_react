import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from '../auth/authSlice';

const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   courses: `${API_BASE_URL}/courses.json`
}
const initialState = {
    courses: []
}
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () =>{
    const res = await axios.get(ENDPOINTS.courses)
    return res.data.courses
})

const coursesSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        selectCourse: (state, action) => {
            const course = state.courses.find(
                (item) => String(item.id) === String(action.payload)
            );
            if (course) {
                course.isSelected = true;
            }
        },
        unSelectCourse: (state, action) => {
            const course = state.courses.find(
                (item) => String(item.id) === String(action.payload)
            );
            if (course) {
                course.isSelected = false;
            }
        },
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) =>{
            state.courses = action.payload.map((course) => ({
                ...course,
                isSelected: false,
            }));


        },
        builder.addCase(logout, (state) =>{
            state.courses = []
        }))
    }
})

export default coursesSlice.reducer
export const { selectCourse, unSelectCourse } = coursesSlice.actions