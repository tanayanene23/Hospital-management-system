import {createBrowserRouter} from 'react-router-dom'

import Login from './components/Login/Login'
import Signup from './components/Signup/Signup' 
import PersonalData from './components/PersonalData/PersonalData'
import FamilyData from './components/FamilyData/FamilyData'
import UploadDocuments from './components/UploadDocuments/UploadDocuments'
import UserDashboard from './components/UserDashboard/UserDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'


const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/personalData',
      element: <PersonalData />
    },
    {
      path: '/familyData',
      element: <FamilyData />
    },
    {
      path: '/uploadDocuments',
      element: <UploadDocuments />
    },
    {
      path: '/userDashboard',
      element: <UserDashboard />
    },
    {
      path: '/adminDashboard',
      element: <AdminDashboard />
    }
  
  
  ])


  export default router