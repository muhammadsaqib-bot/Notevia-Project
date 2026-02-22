import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'
import VerifyEmail from './components/VerifyEmail.jsx';
import NoteviApp from './components/Notevia.jsx'

// ProtectedRoute → dashboard ke liye
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <NotFound />
  return children
}

// Only allow VerifyEmail if email state is present
const VerifyEmailRoute = ({ children }) => {
  const { state } = useLocation()
  if (!state?.email) return <NotFound />
  return children
}

const DashboardWithProps = () => {
  const { state } = useLocation()
  return <Dashboard {...(state || {})} />
}

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<NoteviApp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />

      {/* Only accessible if redirected from login */}
      <Route
        path='/VerifyEmail'
        element={
          <VerifyEmailRoute>
            <VerifyEmail />
          </VerifyEmailRoute>
        }
      />

      <Route
        path="/Dashboard1"
        element={
          <ProtectedRoute>
            <DashboardWithProps />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App