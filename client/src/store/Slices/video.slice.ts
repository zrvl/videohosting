import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVideo } from "../../types/video.type";
import axios, { AxiosResponse } from "axios";


export const getVideoById = createAsyncThunk('video/getVideo', async(id: string | undefined) => {
    try{
        const resp: AxiosResponse = await axios.get(`http://127.0.0.1:5000/api/video/${id}`);
        return {error: false, data: resp.data}
    } catch(err: any) {
        return {error: true, data: err.response.data.errorMessage}
    }
})

const initialState: IVideo = {
    id: -1,
    title: "",
    pathVideo: null,
    pathImg: null,
    status: "idle",
    messageError: null,
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getVideoById.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    state.id = action.payload.data.id;
                    state.title = action.payload.data.title;
                    state.pathVideo = action.payload.data.pathVideo
                    state.pathImg = action.payload.data.pathImg
                    state.status = 'success'
                    state.messageError = null
                } else {
                    state.status = 'error'
                    state.messageError = action.payload.data
                }
            })
            .addCase(getVideoById.pending, (state) => {
                state.status = 'loading'
            })
    }
})

const videoReducer = videoSlice.reducer;

export default videoReducer;