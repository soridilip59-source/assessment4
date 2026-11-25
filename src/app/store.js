import {configureStore} from '@reduxjs/toolkit'
import studentReducer from "../register/students/StudentSlice"
import authReducer from "../register/auth/authSlice"
export const store = configureStore({
    reducer:{
            students: studentReducer,
           auth : authReducer
    }
})