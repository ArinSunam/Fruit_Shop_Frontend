import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
  const token = useSelector((store) => store?.userInfo?.user?.accessToken)

  return token ? <Navigate to="/" replace /> : <Outlet />
}

export default UserRoutes