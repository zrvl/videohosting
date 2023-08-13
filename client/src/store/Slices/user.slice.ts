import {Reducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios';
import jwtDecode from "jwt-decode";
import { IUser, IUserRegistration, IUserAuth } from "../../types/user.type";

export const registration = createAsyncThunk('user/registration', async (account: IUserRegistration) => {
    try {
        const resp: AxiosResponse = await axios.post('http://127.0.0.1:5000/api/user/signup', account);
        return {error:false,data:resp.data};
    } catch (err: any) {
        return {error:true,data:err.response.data.errorMessage}
    }
});

export const authorization = createAsyncThunk('user/authorization', async (account: IUserAuth) => {
    try {
        const resp: AxiosResponse = await axios.post('http://127.0.0.1:5000/api/user/signin', account);
        return {error:false,data:resp.data};
    } catch (err:any) {
        return {error:true,data:err.response.data.errorMessage}
    }
});

export const verify = createAsyncThunk('/user/verify', async ({code,token}:{code:string,token:string}) => {
    try{
        const resp: AxiosResponse = await axios.post('http://127.0.0.1:5000/api/verify', {code}, {
            headers: { 
                Authorization: "Bearer " + token
            }
        });
        return {error: false, data: resp.data}
    } catch (err: any) {
        console.log(err)
        return {error:true,data:err.response.data.errorMessage}
    }
})

const initialState: IUser = {
    id: -1,
    name: "",
    email: "",
    verify: false,
    status: 'idle',
    messageError: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: function (state, action): void {
            const userInfo:IUser = action.payload
            state.id = userInfo.id;
            state.name  = userInfo.name;
            state.email = userInfo.email;
            state.verify = userInfo.verify;
        },
        exitUser: function(state) {
            state.id = -1;
            state.name = '';
            state.email = ''
            state.verify = false
            state.status = 'idle';
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(registration.fulfilled,(state,action) => {
            if (action.payload.error) {
                state.status = 'error';
                state.messageError = action.payload.data
            } else {
                const user: IUser = jwtDecode(action.payload.data)
                state.id = user.id;
                state.name = user.name;
                state.email = user.email;
                state.verify = user.verify;
                state.status = 'success';
                state.messageError = '';
                localStorage.setItem('token', action.payload.data);  
            }
        })
        .addCase(registration.pending,(state) => {
            state.status = 'loading';
        })
        .addCase(authorization.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.status = 'error';
                state.messageError = action.payload.data
            } else {
                const user: IUser = jwtDecode(action.payload.data)
                state.id = user.id;
                state.name = user.name;
                state.email = user.email;
                state.verify = user.verify;
                if (!verify) {
                    // Отправляешь запрос на бекенд, на перевыпуск кода подтверждения
                    /*
                        
                        axios.post('http://127.0.0.1:5000/api/refreshMain', {
                            headers: { 
                                Authorization: "Bearer " + action.payload.msg
                            }
                        });
                    

                        //backend

                        (req,resp) => {
                            const verifyUserObject = VerifyUser.findOne({where:{UserId:user.id}})
                            const code = generetaKey();
                            verifyUserObject.code = code;
                            verifyUserObject.save();
                            sendEmail(code);
                        }


                    */
                }
                state.status = 'success';
                state.messageError = '';
                localStorage.setItem('token', action.payload.data);  
            }
        })
        .addCase(authorization.pending,(state) => {
            state.status = 'loading';
        })
        .addCase(verify.fulfilled, (state, action) => {
            if (action.payload.error == false) {
                state.verify = true;
                state.status = 'success'
                console.log(action.payload.data);
                localStorage.setItem('token', action.payload.data.token);
            } else {
                state.status = 'error'
                state.messageError = action.payload.data  
            }
        })
        .addCase(verify.pending,(state) => {
            state.status = 'loading';
        })
    }
})

const userReducer:Reducer<IUser> = userSlice.reducer;
export const {initUser, exitUser} = userSlice.actions

export default userReducer;


