/**
 * Process-wide in-memory store for local / sandbox identity flows.
 * Extend this file when you add product domains to a consumer repo.
 */

import { randomBytes } from 'node:crypto';
import { ulid } from 'ulid';

export function sandboxId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function responseMeta(correlationId?: string) {
  return {
    meta: {
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

export interface SandboxApiKey {
  keyId: string;
  tenantId: string;
  name: string;
  prefix: string;
  secret: string;
  status: 'active' | 'revoked';
  scopes: string[];
  createdAt: string;
  expiresAt?: string;
  lastUsedAt?: string;
}

export interface SandboxUser {
  userId: string;
  tenantId: string;
  email: string;
  displayName: string;
  role: 'admin' | 'investigator' | 'queue_manager' | 'model_owner' | 'head_of_fraud' | 'care' | 'analyst' | 'ops' | 'viewer';
  status: 'active' | 'disabled';
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  disabledAt?: string;
}

export const apiKeysById = new Map<string, SandboxApiKey>();
export const apiKeysByTenant = new Map<string, Set<string>>();
export const usersById = new Map<string, SandboxUser>();
export const usersByTenant = new Map<string, Set<string>>();

export function toPublicUser(user: SandboxUser) {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
    disabledAt: user.disabledAt,
  };
}

function seedDemoUsers(tenantId: string) {
  if ((usersByTenant.get(tenantId)?.size ?? 0) > 0) return;
  const now = nowIso();
  const seeds: Array<Omit<SandboxUser, 'userId'>> = [
    {
      tenantId,
      email: 'admin@demo.local',
      displayName: 'Demo Admin',
      role: 'admin',
      status: 'active',
      password: 'sandbox-admin-8',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'investigator@demo.local',
      displayName: 'Demo Investigator',
      role: 'investigator',
      status: 'active',
      password: 'sandbox-invest-8',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'models@demo.local',
      displayName: 'Demo Model Owner',
      role: 'model_owner',
      status: 'active',
      password: 'sandbox-models-8',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'care@demo.local',
      displayName: 'Demo Care Agent',
      role: 'care',
      status: 'active',
      password: 'sandbox-care-8x',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'fraudhead@demo.local',
      displayName: 'Demo Head of Fraud',
      role: 'head_of_fraud',
      status: 'active',
      password: 'sandbox-head-8x',
      createdAt: now,
      updatedAt: now,
    },
  ];
  const ids = new Set<string>();
  for (const seed of seeds) {
    const userId = sandboxId('usr');
    const user: SandboxUser = { ...seed, userId };
    usersById.set(userId, user);
    ids.add(userId);
  }
  usersByTenant.set(tenantId, ids);
}

export function listUsersForTenant(tenantId: string): SandboxUser[] {
  seedDemoUsers(tenantId);
  const ids = usersByTenant.get(tenantId) ?? new Set<string>();
  return [...ids]
    .map((id) => usersById.get(id))
    .filter((u): u is SandboxUser => Boolean(u));
}

export function generateApiKeySecret(prefix = 'aegira_demo'): string {
  return `${prefix}_${randomBytes(24).toString('hex')}`;
}

export function getOrCreateTenantProfile(tenantId: string) {
  return {
    tenantId,
    displayNameEn: 'Aegira Demo Bank',
    displayNameAr: 'أجيرا',
  };
}
