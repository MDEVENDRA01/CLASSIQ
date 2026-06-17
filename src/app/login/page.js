'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { INSTITUTION, TAGLINE } from '@/lib/constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const handleGoogleSSO = () => {
    setError('Google SSO is not configured in this demo. Use email/password.');
  };

  return (
    <div className="login-container animate-fadeIn">
      {/* Left Brand Panel */}
      <div className="login-brand">
        <div className="login-brand-content">
          <div className="login-logo">🎓</div>
          <h1>AI Faculty <span>Coach</span></h1>
          <div className="login-tagline">{TAGLINE}</div>
          
          <div className="feature-pills">
            <div className="feature-pill">
              <span className="pill-icon">🎯</span>
              AI-Powered Lesson Evaluation
            </div>
            <div className="feature-pill">
              <span className="pill-icon">📊</span>
              Quality Analytics Dashboard
            </div>
            <div className="feature-pill">
              <span className="pill-icon">🔒</span>
              Role-Based Secure Access
            </div>
          </div>
        </div>
        
        <div className="login-institution">
          {INSTITUTION} • Internal Platform
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="login-form-panel">
        <div className="login-form-card animate-scaleIn">
          <h2>Welcome Back</h2>
          <div className="subtitle">Sign in to your faculty account</div>

          {error && (
            <div className="alert alert-error mb-lg">
              <span className="icon">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address <span className="required">*</span></label>
              <input 
                type="email" 
                className={`form-input ${error && !email ? 'error' : ''}`}
                placeholder="name@gowthami.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  className={`form-input ${error && !password ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="login-remember-row">
              <label className="form-check">
                <input type="checkbox" defaultChecked />
                <span style={{fontSize: 14}}>Remember me</span>
              </label>
              <Link href="/forgot-password" style={{fontSize: 13, fontWeight: 600}}>
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? (
                <><div className="spinner"></div> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-divider">or continue with</div>

          <button type="button" className="google-btn" onClick={handleGoogleSSO}>
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="login-footer-text">
            Don't have an account? <Link href="/register">Register here</Link>
          </div>
          
          <div style={{marginTop: 20, padding: 12, background: 'rgba(212,165,55,0.1)', borderRadius: 8, fontSize: 12, border: '1px solid rgba(212,165,55,0.2)'}}>
            <strong style={{color: 'var(--color-primary)'}}>Demo Credentials:</strong><br/>
            Teacher: priya@gowthami.edu.in / pw: password<br/>
            HOD: rajesh@gowthami.edu.in / pw: password<br/>
            Admin: admin@gowthami.edu.in / pw: password
          </div>
        </div>
      </div>
    </div>
  );
}
