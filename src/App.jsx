import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx';
import NoteviApp from './pages/Notevia.jsx'
import CreatPin from './pages/CreatPin.jsx'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <NotFound />
  return children
}

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
      <Route path="/" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Notevia" element={
        <ProtectedRoute>
          <NoteviApp /></ProtectedRoute>} />

      <Route path="/CreatePin" element={
        <ProtectedRoute>
          <CreatPin /></ProtectedRoute>} />

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