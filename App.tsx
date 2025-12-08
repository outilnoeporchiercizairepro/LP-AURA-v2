import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Setup from './pages/Setup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const isLoginPage = location.pathname === '/login';
  const isSetupPage = location.pathname === '/setup';
  const hideNavFooter = isAdminPage || isLoginPage || isSetupPage;

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200 font-sans selection:bg-primary/30 selection:text-white">
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={
          <main>
            <Home />
          </main>
        } />
        <Route path="/setup" element={<Setup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;