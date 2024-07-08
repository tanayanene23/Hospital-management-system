import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk("sendSignup", async (data, thunkAPI) => {
    try{
        const res = await apiCall.post("/PatientData", data);
        console.log("this is successful response",res)
        return res.data;
    }
    catch(error){
        console.log('an error has occurred')
        console.log("this is error",error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
});




const usersData = createSlice({
  name: "newUser",
  initialState: {
    logins: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(addUser.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.logins = action.payload);
      })

      builder.addCase(addUser.rejected, (state, action) => {
        (state.status = "failed");
        (state.error = action.payload);
        // (state.error = action.error.message);
        console.log("this is error ffrom the state", action.payload)
      });
  },
});


export default usersData.reducer

