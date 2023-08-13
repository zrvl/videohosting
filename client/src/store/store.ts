import {configureStore}from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import userReducer from './Slices/user.slice';
import videoReducer from './Slices/video.slice';
import videosReducer from './Slices/videos.slice';

const store = configureStore({
    reducer: {
        userReducer,
        videoReducer,
        videosReducer
    }
})

export type stateStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

