import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Startup/Login"
import SignUp from "./components/Startup/SignUp"
import Loading from "./components/Specials/Loading"
import UserContent from "./components/User/UserContent"
import PrivateRoute from "./components/Specials/PrivateRoute"

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* First Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<SignUp />} />
          <Route path="/load" element={<Loading />} />
          
          {/* Protected Routes */}
          <Route
            path="/user-content"
            element={
              <PrivateRoute role="user">
                <UserContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute role="admin">
                
              </PrivateRoute>
            }
          />
          
        </Routes>
    </Router>
    </>
  )
}

export default App
