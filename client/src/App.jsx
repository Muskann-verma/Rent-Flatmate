import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import FlatmateFinder from './pages/FlatmateFinder';
import Dashboard from './pages/Dashboard';
import PostListing from './pages/PostListing';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Pages that use full-height layout (no footer)
const FULL_HEIGHT_ROUTES = ['/chat'];
// Pages where footer should be hidden
const NO_FOOTER_ROUTES = ['/chat'];

// Redirects unauthenticated users to /login
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return null; // wait for localStorage hydration
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState('tenant');

  const isFullHeight = FULL_HEIGHT_ROUTES.some(r => location.pathname === r);
  const showFooter = !NO_FOOTER_ROUTES.some(r => location.pathname === r);

  return (
    <div className={`app-shell ${isFullHeight ? 'app-shell--fullheight' : ''}`}>
      <Navbar currentRole={currentRole} onRoleChange={setCurrentRole} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/flatmates" element={<FlatmateFinder />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/post-listing" element={<ProtectedRoute><PostListing /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
      <AIChatbot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
