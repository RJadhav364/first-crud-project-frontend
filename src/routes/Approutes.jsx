import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../layout/Admin'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Admin/dashboard/Dashboard'
import SubAdminList from '../pages/Admin/subAdminList/SubAdminList'
import UserListing from '../pages/Admin/usersList/UserListing'
import NotFound from '../pages/Admin/PageNotFound/NotFound'
import UserDetailed from '../pages/Admin/user-profile/UserDetailed'
import PasswordReset from '../pages/PasswordReset/PasswordReset'
// import UserEdit from '../pages/Admin/user-profile/UserEdit'

const Approutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sub-admin" element={<SubAdminList />} />
          <Route path="users" element={<UserListing />} />
          <Route path="user-profile/:id" element={<UserDetailed />} />
          {/* <Route path="user-edit/:id" element={<UserEdit />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  )
}

export default Approutes
