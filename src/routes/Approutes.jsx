import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../layout/Admin'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Admin/dashboard/Dashboard'

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<Admin />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
  )
}

export default Approutes
