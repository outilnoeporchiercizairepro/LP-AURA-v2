import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { TrackingProvider, useTracking } from './contexts/TrackingContext';
import { useTrackClicks } from './hooks/useTrackClicks';

const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Setup = lazy(() => import('./pages/Setup'));
const CGV = lazy(() => import('./pages/CGV'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const { trackPageView } = useTracking();
  const isAdminPage = location.pathname === '/admin';
  const isLoginPage = location.pathname === '/login';
  const isSetupPage = location.pathname === '/setup';
  const isCGVPage = location.pathname === '/cgv';
  const hideNavFooter = isAdminPage || isLoginPage || isSetupPage;

  useTrackClicks();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200 font-sans selection:bg-primary/30 selection:text-white">
      {!hideNavFooter && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <main>
              <Home />
            </main>
          } />
          <Route path="/setup" element={<Setup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <TrackingProvider>
          <AppContent />
        </TrackingProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;