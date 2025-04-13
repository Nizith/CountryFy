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
          
          {/* Protected Routes for Admin */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin-dashboard" element={<UserContent />} />
          </Route>
          
          {/* Protected Routes for User */}
          <Route element={<PrivateRoute role="user" />}>
            <Route path="/user-content" element={<UserContent />} />
          </Route>

          
          
        </Routes>
    </Router>
    </>
  )
}

export default App
