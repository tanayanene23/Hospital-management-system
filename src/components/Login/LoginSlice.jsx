// import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendLogin = createAsyncThunk("sendLogin", async (data, thunkAPI) => {
    try{
        const res = await apiCall.post("/login", data);
        console.log(res.data.token)
        console.log("this is successful response",res)
        localStorage.setItem('loginToken', JSON.stringify({token: res.data.token}))
        return res.data.token;
    }
    catch(error){
        console.log('an error has occurred')
        console.log("this is error",error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
});

const usersLogin = createSlice({
  name: "userLogin",
  initialState: {
    logins: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(sendLogin.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(sendLogin.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.logins = action.payload);
      })

      builder.addCase(sendLogin.rejected, (state, action) => {
        (state.status = "failed");
        (state.error = action.payload);
        // (state.error = action.error.message);
        console.log("this is error ffrom the state", action.payload)
      });
  },
});


export default usersLogin.reducer

export const loginDetails = (state) => {state.userLogin.logins}
export const loginStatus = (state) => {state.userLogin.status}
export const loginError = (state) => {state.userLogin.error}

// const usersLogin = createSlice({
//     name: "userLogin",
//     initialState: {value: []},
//     extraReducers:()=>{},
//     reducers: {
//         addLogin: (state, action) => {
//             // state.value.push(action.payload)

//             console.log(action.payload)

//             async function fetchData(){
//                         const res = await apiCall.post('/login', action.payload);
//                         console.log(res.data.token);
//                         state.value = res.data.token
//                         console.log(state.value)
//                     }  fetchData()

//             // console.log(state.value)
//         }
//     }
// })

// export const {addLogin} = usersLogin.actions
// export default usersLogin.reducer
