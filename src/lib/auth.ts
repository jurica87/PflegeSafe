import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { createPublicId } from '../utils/publicId';

export async function registerWithEmail(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { public_id: createPublicId() } },
  });
}

export async function loginWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function logout() {
  return supabase.auth.signOut();
}

export async function requestPasswordReset(email: string) {
  const redirectTo = `${window.location.origin}/login`;
  return supabase.auth.resetPasswordForEmail(email, { redirectTo });
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}

export function getUserEmail(user: User | null): string | null {
  return user?.email ?? null;
}
