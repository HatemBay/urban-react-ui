<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./reducers/pageSlice";
import authReducer from "./reducers/authSlice";
import { logger } from "../middlewares/loggerMiddleware";
import { crashReporter } from "../middlewares/crashReporterMiddleware";

const store = configureStore({
  reducer: {
    page: pageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, crashReporter])
});

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch

export default store;
=======
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
>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
