import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Startup/Login"
import SignUp from "./components/Startup/SignUp"

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* First Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<SignUp />} />
          
        </Routes>
    </Router>
    </>
  )
}

export default App
