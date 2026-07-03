import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

// Only roles that match backend User model enum: owner | tenant | admin
const roles = [
  { value: 'tenant', label: 'Tenant', desc: 'Looking for a room or PG', icon: '🔍' },
  { value: 'owner', label: 'Owner', desc: 'Want to list my property', icon: '🏠' },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'tenant' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      setSuccess('Account created! Please sign in to continue.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-bg-glow" />
      <div className="auth-card auth-card--wide">
        <div className="auth-logo">
          <div className="auth-logo-icon">🏠</div>
          <span>Room<span className="gradient-text">Match</span> AI</span>
        </div>

        <div className="auth-card__header">
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">Join 2 lakh+ users on India&apos;s smartest rental platform</p>
        </div>

        {/* Role Selection */}
        <div className="role-selector">
          <label className="form-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
            I am a...
          </label>
          <div className="role-cards">
            {roles.map(r => (
              <button
                key={r.value}
                type="button"
                className={`role-card ${form.role === r.value ? 'role-card--active' : ''}`}
                onClick={() => update('role', r.value)}
              >
                <div className="role-card__icon">{r.icon}</div>
                <div className="role-card__label">{r.label}</div>
                <div className="role-card__desc">{r.desc}</div>
                {form.role === r.value && <div className="role-card__check">✓</div>}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="auth-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {success && (
          <div className="auth-error" style={{ background: 'rgba(0,212,170,0.1)', borderColor: 'var(--color-teal)', color: 'var(--color-teal)' }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input
                  id="register-name"
                  type="text"
                  className="form-control auth-input"
                  placeholder="Aarav Sharma"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="register-email"
                  type="email"
                  className="form-control auth-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input
                id="register-password"
                type="password"
                className="form-control auth-input"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={e => update('password', e.target.value)}
              />
            </div>
          </div>

          {/* Password strength */}
          {form.password.length > 0 && (
            <div className="password-strength">
              <div className="password-strength__bars">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="password-strength__bar"
                    style={{
                      background: form.password.length >= i * 2
                        ? i <= 2 ? 'var(--color-rose)'
                        : i === 3 ? 'var(--color-amber)'
                        : 'var(--color-teal)'
                        : 'var(--color-surface-3)'
                    }}
                  />
                ))}
              </div>
              <span className="password-strength__label">
                {form.password.length < 4 ? 'Weak' : form.password.length < 6 ? 'Fair' : form.password.length < 8 ? 'Good' : 'Strong'}
              </span>
            </div>
          )}

          <button
            id="register-submit-btn"
            type="submit"
            className={`btn btn-primary btn-lg auth-submit ${loading ? 'auth-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Creating Account...
              </>
            ) : '🚀 Create Free Account'}
          </button>

          <p className="auth-terms">
            By signing up you agree to our{' '}
            <a href="/" className="auth-switch-link">Terms of Service</a>
            {' '}and{' '}
            <a href="/" className="auth-switch-link">Privacy Policy</a>.
          </p>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <div className="auth-social">
          <button className="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
