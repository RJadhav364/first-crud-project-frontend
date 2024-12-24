import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import useAuthStore from '../store/AuthStore'
const Admin = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStore.isAuthenticated) {
        navigate('/');
    }
}, [authStore])

  return (
    <>
    {/* {
      authStore.isAuthenticated ? ( */}
        {/* <> */}
        <Navbar />
        <Outlet />
        {/* </> */}
      {/* ) : navigate('/')
    } */}
    </>  
  )
}

export default Admin
