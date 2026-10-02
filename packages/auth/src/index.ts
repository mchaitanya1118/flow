import { UserRole, Permission } from '@estateflow/types';
import jwt from 'jsonwebtoken';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  USER: [],
  OWNER: ['property:create', 'property:update', 'lead:view'],
  AGENT: ['property:create', 'property:update', 'property:publish', 'lead:view', 'lead:update', 'lead:assign', 'viewing:manage'],
  AGENCY_ADMIN: ['property:create', 'property:update', 'property:publish', 'property:delete', 'lead:view', 'lead:update', 'lead:assign', 'viewing:manage'],
  DEVELOPER: ['project:create', 'project:update', 'unit:manage', 'lead:view', 'lead:update'],
  DEVELOPER_ADMIN: ['project:create', 'project:update', 'unit:manage', 'lead:view', 'lead:update', 'lead:assign'],
  CONTENT_EDITOR: ['property:update'],
  MODERATOR: ['property:verify', 'moderation:review'],
  SUPPORT: ['lead:view', 'viewing:manage'],
  FINANCE: ['payment:view', 'payment:refund'],
  ADMIN: [
    'property:create',
    'property:update',
    'property:publish',
    'property:delete',
    'property:verify',
    'lead:view',
    'lead:update',
    'lead:assign',
    'viewing:manage',
    'project:create',
    'project:update',
    'unit:manage',
    'payment:view',
    'payment:refund',
    'moderation:review',
    'admin:user_suspend',
  ],
  SUPER_ADMIN: [
    'property:create',
    'property:update',
    'property:publish',
    'property:delete',
    'property:verify',
    'lead:view',
    'lead:update',
    'lead:assign',
    'viewing:manage',
    'project:create',
    'project:update',
    'unit:manage',
    'payment:view',
    'payment:refund',
    'moderation:review',
    'admin:user_suspend',
    'admin:settings_edit',
  ],
};

export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  if (userRole === 'SUPER_ADMIN') return true;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export function generateToken(payload: JWTPayload, secret: string, expiresIn: string | number = '7d'): string {
  const options: jwt.SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string, secret: string): JWTPayload | null {
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}
