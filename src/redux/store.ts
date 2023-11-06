import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./reducers/pageSlice";
import colorReducer from "./reducers/colorSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
    color: colorReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
