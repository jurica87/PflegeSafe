import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { onAuthStateChange, getSession } from './lib/auth';
import { getMyProfile } from './lib/profiles';
import type { Profile } from './types/profile';
import { adminRoles, privilegedRoles } from './types/roles';
import { AppShell } from './components/layout/AppShell';
import { PublicShell } from './components/layout/PublicShell';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import ExamUpload from './pages/ExamUpload';
import Documents from './pages/Documents';
import DocumentDetail from './pages/DocumentDetail';
import UploadDocument from './pages/UploadDocument';
import PublicProfile from './pages/PublicProfile';
import ShareLinks from './pages/ShareLinks';
import HygieneCourse from './pages/HygieneCourse';
import AdminDashboard from './pages/AdminDashboard';
import AdminVerification from './pages/AdminVerification';
import AdminUsers from './pages/AdminUsers';
import Privacy from './pages/Privacy';
import Imprint from './pages/Imprint';
import AccountSettings from './pages/AccountSettings';

interface AuthContextValue { session: Session | null; profile: Profile | null; refreshProfile: () => Promise<void>; loading: boolean; }
const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('AuthContext fehlt'); return ctx; }

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshProfile = async () => setProfile(await getMyProfile());
  useEffect(() => {
    getSession().then(async (initial) => { setSession(initial); if (initial) await refreshProfile(); setLoading(false); });
    const { data } = onAuthStateChange(async (next) => { setSession(next); setProfile(next ? await getMyProfile() : null); });
    return () => data.subscription.unsubscribe();
  }, []);
  const value = useMemo(() => ({ session, profile, refreshProfile, loading }), [session, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function Protected({ children, admin = false, verifier = false }: { children: ReactNode; admin?: boolean; verifier?: boolean }) {
  const { session, profile, loading } = useAuth();
  if (loading) return <div className="p-8">Lade Session…</div>;
  if (!session) return <Navigate to="/login" replace />;
  if (profile?.account_status === 'locked') return <PublicShell><div className="rounded-3xl bg-white p-8 shadow-soft">Account gesperrt. Bitte Support kontaktieren.</div></PublicShell>;
  if (admin && (!profile || !adminRoles.includes(profile.role))) return <Navigate to="/dashboard" replace />;
  if (verifier && (!profile || !privilegedRoles.includes(profile.role))) return <Navigate to="/dashboard" replace />;
  return <AppShell>{children}</AppShell>;
}

export default function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/p/:publicId" element={<PublicShell><PublicProfile /></PublicShell>} />
    <Route path="/privacy" element={<PublicShell><Privacy /></PublicShell>} />
    <Route path="/imprint" element={<PublicShell><Imprint /></PublicShell>} />
    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
    <Route path="/onboarding" element={<Protected><Onboarding /></Protected>} />
    <Route path="/exam" element={<Protected><ExamUpload /></Protected>} />
    <Route path="/documents" element={<Protected><Documents /></Protected>} />
    <Route path="/documents/new" element={<Protected><UploadDocument /></Protected>} />
    <Route path="/documents/:id" element={<Protected><DocumentDetail /></Protected>} />
    <Route path="/qualipass" element={<Protected><PublicProfile own /></Protected>} />
    <Route path="/qr" element={<Protected><PublicProfile own /></Protected>} />
    <Route path="/share-links" element={<Protected><ShareLinks /></Protected>} />
    <Route path="/hygiene-course" element={<Protected><HygieneCourse /></Protected>} />
    <Route path="/admin" element={<Protected verifier><AdminDashboard /></Protected>} />
    <Route path="/admin/verification" element={<Protected verifier><AdminVerification /></Protected>} />
    <Route path="/admin/users" element={<Protected admin><AdminUsers /></Protected>} />
    <Route path="/account" element={<Protected><AccountSettings /></Protected>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></AuthProvider></BrowserRouter>;
}
