import { jwtDecode } from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const putPersonalDetails = createAsyncThunk("putFamilyData", async(putData, thunkAPI) => {
  try{
      const token = JSON.parse(localStorage.getItem('loginToken'))
      console.log(token.token)
      const encodedToken = token.token
      const decodedToken = jwtDecode(encodedToken)
      const id = decodedToken.ID
      console.log(decodedToken)
      // id = 
      const res = await apiCall.put(`/FamilyData/${id}`, putData, {headers: {
        Authorization: token.token
      }});
      console.log('data', putData)
      console.log(res)
      return res.data;
  }
  catch(error){
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
  }
})





export const putFamilyDetails = createAsyncThunk("putFamilyData", async(putData, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const encodedToken = token.token
        const decodedToken = jwtDecode(encodedToken)
        const id = decodedToken.ID
        console.log(decodedToken)
        // id = 
        const res = await apiCall.put(`/FamilyData/${id}`, putData, {headers: {
          Authorization: token.token
        }});
        console.log('data', putData)
        console.log(res)
        return res.data;
    }
    catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error.message)
    }
  })






  export const deleteUser = createAsyncThunk("deleteAllData", async(ID, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)

        const res = await apiCall.put(`/PatientData/${ID}`, {headers: {
          Authorization: token.token
        }});
        console.log(res)
        return res.data;
    }
    catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error.message)
    }
  })









const adminPage = createSlice({
  name: "familyDetailsForm",
  initialState: {
    famData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.famData = action.payload);
      })

      builder.addCase(deleteUser.rejected, (state, action) => {
        (state.status = "failed");
        (state.error = action.payload);
      });
  },
});


export default adminPage.reducer

