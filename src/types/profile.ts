import type { AccountStatus, UserRole } from './roles';

export type ProfileStatus = 'incomplete' | 'exam_missing' | 'exam_submitted' | 'verified' | 'rejected';
export type SubscriptionStatus = 'free' | 'pro' | 'team';

export interface Profile {
  id: string;
  email: string | null;
  role: UserRole;
  public_id: string;
  first_name: string | null;
  last_name: string | null;
  job_title: string | null;
  state: string | null;
  city: string | null;
  employer: string | null;
  experience_years: number | null;
  specialties: string[] | null;
  photo_url: string | null;
  bio: string | null;
  profile_status: ProfileStatus;
  account_status: AccountStatus;
  subscription_status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
}

export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'role' | 'email'>>;
