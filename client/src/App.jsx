import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import Preview from "./pages/Preview"

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Layout Routes */}
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="builder" element={<ResumeBuilder />} />
        <Route path="preview" element={<Preview />} />
      </Route>
    </Routes>
  )
}

export default App