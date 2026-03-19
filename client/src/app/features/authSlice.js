// import { createSlice } from "@reduxjs/toolkit";

// const authSlice=createSlice({
//     name:'auth',
//     initialState:{
//         token:null,
//         user:null,
//         loading:true
//     },
//     reducers:{
//         login:(state,action)=>{
//             state.token=action.payload.token
//             state.user=action.payload.user
//         },
//         logout:(state)=>{
//             state.token='',
//             state.user=null,
//             localStorage.removeItem('token')
//         },
//         setLoading:(state,action)=>{
//             state.loading=action.payload
//         }
//     }
// })

// export const {login,logout,setLoading}=authSlice.actions
// export default authSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

// Rehydrate token from localStorage on app start
// Without this, every page refresh logs the user out silently
// and all API calls fail with 401 because token is null
const tokenFromStorage = localStorage.getItem('token') || null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenFromStorage,
        user: null,
        loading: tokenFromStorage ? true : false  // true only if we have a token to validate
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.loading = false
        },
        logout: (state) => {
            state.token = null
            state.user = null
            state.loading = false
            localStorage.removeItem('token')
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.loading = false
        }
    }
})

export const { login, logout, setLoading, setUser } = authSlice.actions
export default authSlice.reducer