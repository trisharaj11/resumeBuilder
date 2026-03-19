import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import ResumeBuilder from "./pages/ResumeBuilder"
import Preview from "./pages/Preview"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/builder" element={<Layout />}>
        <Route index element={<ResumeBuilder />} />
      </Route>

      <Route path="/preview" element={<Layout />}>
        <Route index element={<Preview />} />
      </Route>
    </Routes>
  )
}

export default App