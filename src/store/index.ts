import {configureStore} from '@reduxjs/toolkit';
import {sessionApi} from './services/sessionApi';
import authReducer  from './slices/authSlice';


export const store = configureStore({
    reducer: {
        [sessionApi.reducerPath] : sessionApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sessionApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
