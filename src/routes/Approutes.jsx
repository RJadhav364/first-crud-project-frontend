import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../layout/Admin'
import Login from '../pages/Login/Login'

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<Admin />}>
        </Route>
    </Routes>
  )
}

export default Approutes
