import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    userInfo: {}, // for user object
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
        }
    },
    extraReducers: {},
})

export const { setUserToken } = authSlice.actions

export default authSlice.reducer