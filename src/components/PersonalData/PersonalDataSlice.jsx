import { jwtDecode } from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendPersonalDetails = createAsyncThunk("sendPersonalInfo", async (data, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const res = await apiCall.post("/patients", data, {headers: {
          Authorization: token.token
        }});
        console.log('data', data)
        console.log(res)
        return res.data;
    }
    catch(error){
        console.log(error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
});



export const putPersonalDetails = createAsyncThunk("putPersonalData", async(putData, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const encodedToken = token.token
        const decodedToken = jwtDecode(encodedToken)
        const id = decodedToken.ID
        console.log(decodedToken)
        const res = await apiCall.put(`/patients/${id}`, putData, {headers: {
          Authorization: token.token
        }});
        console.log('data', putData)
        console.log(res)
        return res.data;
    }
    catch(error){
        console.log(error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
})


const personalData = createSlice({
  name: "personalDetailsForm",
  initialState: {
    personData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(sendPersonalDetails.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(sendPersonalDetails.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.personData = action.payload);
      })

      builder.addCase(sendPersonalDetails.rejected, (state, action) => {
        (state.status = "failed");
        (state.error = action.payload);
      });
  },
});


export default personalData.reducer

