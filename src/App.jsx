import React from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

// Wrapper to convert route state to props for Dashboard
const DashboardWithProps = () => {
  const { state } = useLocation()
  return <Dashboard {...(state || {})} />
}

// Protects routes: only renders children when token exists, otherwise 404
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <NotFound />
  return children
}

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public route: Login. If token exists, SignIn will redirect itself to Dashboard */}
        <Route path='/' element={<SignIn />} />

        {/* Optional public route: SignUp remains public */}
        <Route path='/SignUp' element={<SignUp />} />

        {/* Protected route: only accessible with token, otherwise 404 */}
        <Route
          path='/Dashboard1'
          element={
            <ProtectedRoute>
              <DashboardWithProps />
            </ProtectedRoute>
          }
        />

        {/* Wildcard: without token keep user on login; with token show 404 */}
        <Route
          path='*'
          element={localStorage.getItem('token') ? <NotFound /> : <Navigate to='/' replace />}
        />
      </Routes>
    </div>
  )
}

export default App
