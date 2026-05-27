'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_GOOGLE_USER = {
  id: 'google-demo-001',
  name: 'Demo User',
  email: 'demo@gmail.com',
  image: null,
  provider: 'google',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('travel_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    const u = { ...DEMO_GOOGLE_USER, name: 'Google User', email: 'user@gmail.com' };
    setUser(u);
    localStorage.setItem('travel_user', JSON.stringify(u));
    return { success: true };
  };

  const loginWithEmail = (email, password) => {
    if (!email || !password) return { success: false, error: 'Email and password required.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const stored = localStorage.getItem(`travel_account_${email}`);
    if (!stored) return { success: false, error: 'Account not found. Please register first.' };
    const account = JSON.parse(stored);
    if (account.password !== password) return { success: false, error: 'Incorrect password.' };
    const u = { id: account.id, name: account.name, email: account.email, image: null, provider: 'email' };
    setUser(u);
    localStorage.setItem('travel_user', JSON.stringify(u));
    return { success: true };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) return { success: false, error: 'All fields are required.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const existing = localStorage.getItem(`travel_account_${email}`);
    if (existing) return { success: false, error: 'An account with this email already exists.' };
    const account = { id: `user-${Date.now()}`, name, email, password };
    localStorage.setItem(`travel_account_${email}`, JSON.stringify(account));
    const u = { id: account.id, name, email, image: null, provider: 'email' };
    setUser(u);
    localStorage.setItem('travel_user', JSON.stringify(u));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel_user');
  };

  const saveBooking = (booking) => {
    if (!user) return;
    const key = `travel_bookings_${user.id}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ ...booking, id: `BK${Date.now()}`, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    return existing[0];
  };

  const getBookings = () => {
    if (!user) return [];
    const key = `travel_bookings_${user.id}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, register, logout, saveBooking, getBookings }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
