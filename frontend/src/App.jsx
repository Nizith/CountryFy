import React from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Login from "./components/Startup/Login"
import SignUp from "./components/Startup/SignUp"
import UserContent from "./components/User/UserContent"
import PrivateRoute from "./components/Specials/PrivateRoute"
import CountryName from "./components/User/CountryName"
import NavBar from "./components/User/NavBar"
import Footer from "./components/User/Footer"
import Independants from "./components/User/Independants"

function AppContent({ children }) {
  const location = useLocation();

  // Define routes where NavBar and Footer should not be displayed
  const excludedRoutes = ["/", "/create-account"];

  const shouldShowNavBarAndFooter = !excludedRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavBarAndFooter && <NavBar />}
      <div className={`flex-grow ${shouldShowNavBarAndFooter ? "bg-gray-50" : ""}`}>
        {children}
      </div>
      {shouldShowNavBarAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppContent>
          <Routes>
            {/* First Pages */}
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element={<SignUp />} />

            {/* Protected Routes for Admin */}
            <Route element={<PrivateRoute role="admin" />}>
              <Route path="/admin-dashboard" element={<UserContent />} />
            </Route>

            {/* Protected Routes for User */}
            <Route element={<PrivateRoute role="user" />}>
              <Route path="/user-content" element={<UserContent />} />
              <Route path="/country-code/:name" element={<CountryName />} />
              <Route path="/independants" element={<Independants />} />
            </Route>
          </Routes>
        </AppContent>
      </Router>
    </>
  )
}

export default App;