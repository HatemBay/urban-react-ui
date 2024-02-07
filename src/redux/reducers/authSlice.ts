import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../data/types";

interface AuthState {
    loading: boolean;
    userInfo: User;
    userToken: any;
    error: any;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: {} as User, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
};

//TODO: handle error state
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setUserTokenAsync.pending, state => {
            state.loading = true;
        }).addCase(setUserTokenAsync.fulfilled, (state, action: PayloadAction<any>) => {
            state.userToken = action.payload;
        }).addCase(setUserTokenAsync.rejected, (state, action) => {
            state.error = action.error;
        });

        builder.addCase(setUserInfoAsync.pending, state => {
            state.loading = true;
        }).addCase(setUserInfoAsync.fulfilled, (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        }).addCase(setUserInfoAsync.rejected, (state, action) => {
            state.error = action.error;
        })
    },
});

export const setUserTokenAsync = createAsyncThunk("auth/setUserTokenAsync",
    async (signInData: any) => {
        return await signInData.data;
    })
export const setUserInfoAsync = createAsyncThunk("auth/setUserInfoAsync",
    async (userInfo: any) => {
        return await userInfo;
    })

export default authSlice.reducer;
