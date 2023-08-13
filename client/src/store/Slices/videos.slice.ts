import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { IVideos } from "../../types/video.type"

export const getVideos = createAsyncThunk('/video/get', async({token}: {token: string}) => {
    try{
        const resp = await axios.get('http://127.0.0.1:5000/api/video/personalVideos', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return {error: false, data: resp.data}
    } catch (err: any) {
        return {error: true, data: err.response.data.message}
    }
})

export const getAllVideos = createAsyncThunk('/video/getAllVideos', async() => {
    try{
        const resp = await axios.get('http://127.0.0.1:5000/api/video/getAll');
        return {error: false, data: resp.data}
    } catch (err: any) {
        return {error: true, data: err.response}
    }
});

export const createVideo = createAsyncThunk('video/create', async({token, video}: {token: string, video: {videoName: string, videoFile: any, photoFile: any}}) => {
    try{
        const resp = await axios.post('http://127.0.0.1:5000/api/video', video, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token
            }
        });
        return {error: false, data:resp.data}
    } catch(err: any) {
        return {error: true, data: err.response.data.errorMessage}
    }
})

const initialState: IVideos = {
    videos: [],
    status: 'idle',
    messageError: null
}

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getVideos.fulfilled, (state, action) => {
            if (!action.payload.error) {
                state.videos = action.payload.data
                state.status = 'success';
                state.messageError = '';
            } else {
                state.status = 'error'
                state.messageError = action.payload.data
            }
        })
        .addCase(getVideos.pending, (state) => {
            state.status = 'loading'
        })
        
        .addCase(createVideo.fulfilled, (state, action) => {
            if (!action.payload.error) {
                state.videos.push(action.payload.data)
                state.status = 'success';
                state.messageError = '';
            } else {
                state.status = 'error';
                state.messageError = action.payload.data
            }
        })
        .addCase(createVideo.pending, (state) => {
            state.status = 'loading';
        })

        .addCase(getAllVideos.fulfilled, (state,action) => {
            if(!action.payload.error) {
                state.videos = action.payload.data
                state.status = 'success'
                state.messageError = ''
            } else {
                state.status = 'error';
                state.messageError = action.payload.data
            }
        })
        .addCase(getAllVideos.pending, (state) => {
            state.status = 'loading'
        })
    }
})

const videosReducer = videosSlice.reducer;

export default videosReducer;