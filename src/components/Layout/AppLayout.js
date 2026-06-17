'use client';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  const { user } = useAuth();
  const { toasts } = useApp();

  // If not logged in, we shouldn't render the layout, but the router will redirect
  if (!user) return null;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content animate-fadeIn">
        {children}
      </main>

      {/* Global Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            background: 'var(--color-bg-card)',
            color: 'var(--color-text)',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            borderLeft: `4px solid ${toast.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
            display: 'flex',
            alignItems: 'center',
            minWidth: '250px',
            animation: 'fadeIn 0.3s ease-out forwards'
          }}>
            {toast.type === 'success' ? '✅ ' : '❌ '} {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
