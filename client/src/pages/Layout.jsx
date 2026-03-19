import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth)

  if (loading) {
    return <Loader />
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout