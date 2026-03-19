import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser, logout } from "./app/features/authSlice"
import api from "./configs/api"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import ResumeBuilder from "./pages/ResumeBuilder"
import Preview from "./pages/Preview"
import Loader from "./components/Loader"

function App() {
  const dispatch = useDispatch()
  const { token, loading } = useSelector(state => state.auth)

  // On every app load / page refresh, if we have a token in localStorage,
  // fetch the user profile to rehydrate Redux state.
  // Without this, user is null after refresh even though token exists,
  // causing all API calls to fail with 401 and showing "Currently unavailable"
  useEffect(() => {
    const rehydrateUser = async () => {
      if (!token) return
      try {
        const { data } = await api.get('/api/users/data', {
          headers: { Authorization: token }
        })
        dispatch(setUser(data.user))
      } catch (error) {
        // Token is invalid or expired — clear everything
        dispatch(logout())
      }
    }
    rehydrateUser()
  }, []) // Run once on mount only

  // Show loader while rehydrating user from stored token
  if (loading) {
    return <Loader />
  }

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Auth page */}
      <Route path="/app" element={<Login />} />

      {/* Protected app routes */}
      <Route path="/app/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/app/builder/:resumeId" element={<Layout />}>
        <Route index element={<ResumeBuilder />} />
      </Route>

      <Route path="/view/:resumeId" element={<Layout />}>
        <Route index element={<Preview />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App