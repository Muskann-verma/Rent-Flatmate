import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // hydrating from localStorage

  // Hydrate auth state from localStorage on first mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('rf_token');
      const storedUser = localStorage.getItem('rf_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('rf_token', data.token);
    localStorage.setItem('rf_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password, role) => {
    const data = await registerUser(name, email, password, role);
    // After registration, auto-login by prompting the user to sign in
    // (backend doesn't return a token on register, just the user object)
    return data;
  };

  const logout = () => {
    localStorage.removeItem('rf_token');
    localStorage.removeItem('rf_user');
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = Boolean(token && user);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
