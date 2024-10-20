import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login_admin from './components/login_admin.jsx'
import './index.css'
import Admin from './components/admin.jsx'
import Login_user from './components/login_user.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    path:"admin",
  element: <Admin/>
    
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
