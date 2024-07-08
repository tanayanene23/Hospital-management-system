import { jwtDecode } from "jwt-decode";

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../AxiosInstance/AxiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendDocuments = createAsyncThunk("sendDocs", async(data, thunkAPI) => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const res = await apiCall.post("/uploads/uploadDocuments", data, {headers: {
            Accept: 'multipart/form-data',
            Authorization: token.token
            }});
        console.log(res)
        return res.data;
    }
    catch(error){
        console.log(error)
        alert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
});




export const putDocuments = createAsyncThunk("putDocumentData", async(putData, thunkAPI) => {
  try{
      const token = JSON.parse(localStorage.getItem('loginToken'))
      console.log(token.token)
      const encodedToken = token.token
      const decodedToken = jwtDecode(encodedToken)
      const id = decodedToken.ID
      console.log(decodedToken)
      const res = await apiCall.put(`/uploads/updateDocuments/${id}`, putData, {headers: {
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






const documents = createSlice({
  name: "documentDetails",
  initialState: {
    documentsUploaded: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(sendDocuments.pending, (state) => {
        state.status = "loading";
      })
      
      builder.addCase(sendDocuments.fulfilled, (state, action) => {
        (state.status = "succedeed");
        (state.documentsUploaded = action.payload);
      })

      builder.addCase(sendDocuments.rejected, (state, action) => {
        (state.status = "failed");
        (state.error = action.payload);
        
      });
  },
});


export default documents.reducer

