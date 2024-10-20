import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login_admin from './components/login_admin.jsx'
import './index.css'

import Login_user from './components/login_user.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from "./components/Register.jsx";
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'login_admin',
    element:<Login_admin/>
  },
  {
    path:'login_user',
    element:<Login_user/>
  },
  {
    path:'Register',
    element:<Register/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
