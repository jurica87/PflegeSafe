export type DocumentVisibility = 'private' | 'public' | 'share_link';
export type DocumentLifecycleStatus = 'active' | 'expired' | 'archived';
export type VerificationStatus = 'self_declared' | 'submitted' | 'verified' | 'rejected';

export interface DocumentRecord {
  id: string;
  user_id: string;
  title: string;
  document_type: string;
  description: string | null;
  issuing_organization: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  file_path: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  visibility: DocumentVisibility;
  lifecycle_status: DocumentLifecycleStatus;
  verification_status: VerificationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  document_tags?: DocumentTag[];
}

export interface DocumentTag {
  id: string;
  document_id: string;
  user_id: string;
  tag: string;
}

export interface DocumentFilters {
  search?: string;
  tags?: string[];
  lifecycle_status?: DocumentLifecycleStatus | 'all';
  visibility?: DocumentVisibility | 'all';
  verification_status?: VerificationStatus | 'all';
  expiresWithinDays?: number;
  sortBy?: 'expiry_date' | 'created_at' | 'title';
  sortDirection?: 'asc' | 'desc';
}
