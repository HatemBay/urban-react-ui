import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./reducers/pageSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
