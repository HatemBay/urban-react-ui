import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from "../../data/types";

const initialState = {
    loading: false,
    userInfo: {} as User, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

//TODO: improve
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<any>) => {
            state.userToken = action.payload
        },
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload
        },
    },
    extraReducers: {},
})

export const { setUserToken, setUserInfo } = authSlice.actions

export default authSlice.reducer