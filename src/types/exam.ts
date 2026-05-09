export type ExamVerificationStatus = 'unverified' | 'submitted' | 'verified' | 'rejected';

export interface ExamDocument {
  id: string;
  user_id: string;
  professional_title: string | null;
  issuing_authority: string | null;
  issue_date: string | null;
  file_path: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  verification_status: ExamVerificationStatus;
  user_comment: string | null;
  admin_comment: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}
