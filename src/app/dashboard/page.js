'use client';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/Layout/AppLayout';
import Link from 'next/link';
import { generateMockHistory } from '@/lib/mockAI';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [recentGens, setRecentGens] = useState([]);

  useEffect(() => {
    // Get just the 3 most recent for the dashboard
    setRecentGens(generateMockHistory().slice(0, 3));
  }, []);

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Welcome Back, {user?.name.split(' ')[0]} 👋</h1>
        <p>Here's what's happening with your lesson planning today.</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon dark">📄</div>
          <div>
            <div className="kpi-value">42</div>
            <div className="kpi-label">Total Evaluations</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon success">⭐</div>
          <div>
            <div className="kpi-value">8.4</div>
            <div className="kpi-label">Average Quality Score</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon accent">🔥</div>
          <div>
            <div className="kpi-value">5</div>
            <div className="kpi-label">Day Streak</div>
          </div>
        </div>
        <div className="kpi-card" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, #1A1A1A 100%)', color: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <Link href="/coach" className="btn btn-gold btn-full btn-lg" style={{width: '90%'}}>
            ✨ New Evaluation
          </Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Recent Generations</h3>
            <Link href="/history" style={{fontSize: 13, fontWeight: 600}}>View All →</Link>
          </div>
          <div className="card-body" style={{padding: '16px 24px'}}>
            {recentGens.map((gen, idx) => (
              <div key={gen.id} style={{
                padding: '16px 0', 
                borderBottom: idx < recentGens.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{display: 'flex', gap: 8, marginBottom: 4}}>
                    <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{gen.subject}</span>
                    <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{gen.grade}</span>
                  </div>
                  <h4 style={{marginBottom: 4}}>{gen.topic}</h4>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {new Date(gen.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                  </div>
                </div>
                <div className={`score-badge ${gen.qualityScore >= 7 ? 'high' : gen.qualityScore >= 4 ? 'medium' : 'low'}`} style={{padding: '6px 14px', fontSize: 14}}>
                  {gen.qualityScore.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Quick Launch Templates</h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-md">Start a new evaluation instantly using one of our verified presets.</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <Link href="/coach?template=1" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">🔬</span>
                <div>
                  <div style={{fontWeight: 600}}>Science — Photosynthesis</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 9 • Lecture + Demo</div>
                </div>
              </Link>
              <Link href="/coach?template=2" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">📐</span>
                <div>
                  <div style={{fontWeight: 600}}>Maths — Quadratic Equations</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 10 • Discussion</div>
                </div>
              </Link>
              <Link href="/coach?template=3" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">📖</span>
                <div>
                  <div style={{fontWeight: 600}}>English — Creative Writing</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 8 • Collaborative</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
