// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import usersData from './components/Signup/SignupDataSlice.jsx';
import usersLogins from './components/Login/LoginSlice.jsx'
import personal from './components/PersonalData/PersonalDataSlice.jsx'
import family from './components/FamilyData/FamilyDataSlice.jsx'
import docs from './components/UploadDocuments/UploadDocumentsSlice.jsx'
import admin from './components/AdminDashboard/AdminSlice.jsx'

const store = configureStore({
  reducer:{
    newUser: usersData,
    userLogin: usersLogins,
    personalDetailsForm: personal,
    familyDetailsForm: family,
    documentDetails: docs,
    adminPage: admin
  }
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#91E4BC',
    },
    secondary: {
      main: '#60D199',
    },
  },
});



ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>  
    </ThemeProvider>
  // </React.StrictMode>,
)
