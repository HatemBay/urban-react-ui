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

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, crashReporter]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
