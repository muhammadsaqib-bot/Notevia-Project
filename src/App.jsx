import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx';
import NoteviApp from './pages/Notevia.jsx'
import CreatPin from './pages/CreatPin.jsx'
import Journals from './pages/Journals.jsx'
import AddJournal from './pages/AddJournal.jsx'
import Profile from './pages/Profile.jsx'
import ConfirmPin from './pages/ConfirmPin.jsx'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/SignIn" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />

      <Route path="/Notevia" element={<ProtectedRoute><NoteviApp /></ProtectedRoute>} />
      <Route path="/CreatePin" element={<ProtectedRoute><CreatPin /></ProtectedRoute>} />
      <Route path="/Dashboard1" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/Journals" element={<ProtectedRoute><Journals /></ProtectedRoute>} />
      <Route path="/ConfirmPin" element={<ProtectedRoute><ConfirmPin /></ProtectedRoute>} />
      <Route path="/AddJournal" element={<ProtectedRoute><AddJournal /></ProtectedRoute>} />
      <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App