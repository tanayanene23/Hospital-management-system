import { jwtDecode } from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendFamilyDetails = createAsyncThunk("sendFamData", async (data, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const res = await apiCall.post("/FamilyData", data, {headers: {
          Authorization: token.token
      }});
        console.log(res.data)
        return res.data;
    }
    catch(error){
        console.log(error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
});



export const putFamilyDetails = createAsyncThunk("putFamilyData", async(putData, thunkAPI) => {
  try{
      const token = JSON.parse(localStorage.getItem('loginToken'))
      console.log(token.token)
      const encodedToken = token.token
      const decodedToken = jwtDecode(encodedToken)
      const id = decodedToken.ID
      console.log(decodedToken)
      const res = await apiCall.put(`/FamilyData/${id}`, putData, {headers: {
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




const familyData = createSlice({
  name: "familyDetailsForm",
  initialState: {
    famData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(sendFamilyDetails.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(sendFamilyDetails.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.famData = action.payload);
      })

      builder.addCase(sendFamilyDetails.rejected, (state, action) => {
        (state.status = "failed");
        // (state.error = action.error.message);
        (state.error = action.payload);
      });
  },
});


export default familyData.reducer

