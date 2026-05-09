export type UserRole = 'user' | 'verifier' | 'admin' | 'superadmin';
export type AccountStatus = 'active' | 'locked' | 'deleted';
export const privilegedRoles: UserRole[] = ['verifier', 'admin', 'superadmin'];
export const adminRoles: UserRole[] = ['admin', 'superadmin'];
