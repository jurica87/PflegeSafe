import type { DocumentRecord } from './document';
import type { Profile } from './profile';

export interface ShareLink {
  id: string;
  user_id: string;
  token: string;
  title: string | null;
  expires_at: string | null;
  password_hash: string | null;
  is_active: boolean;
  created_at: string;
}

export interface PublicProfilePayload {
  profile: Pick<Profile, 'public_id' | 'first_name' | 'last_name' | 'job_title' | 'specialties' | 'photo_url' | 'bio' | 'profile_status'>;
  examStatus: 'exam_missing' | 'exam_submitted' | 'verified' | 'rejected';
  documents: Pick<DocumentRecord, 'id' | 'title' | 'document_type' | 'description' | 'issuing_organization' | 'issue_date' | 'expiry_date' | 'verification_status'>[];
}
