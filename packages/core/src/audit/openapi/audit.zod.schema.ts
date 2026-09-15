import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const updateRetentionPolicy_Body = z
  .object({
    caseDays: z.number().int(),
    scoreSnapshotDays: z.number().int(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const LogId = z.string();
const UserId = z.string();
const CaseAccessLog = z
  .object({
    logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string(),
    actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    action: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CaseAccessLogListData = z
  .object({
    items: z.array(
      z
        .object({
          logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
          caseId: z.string(),
          actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
          action: z.string(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const CaseAccessLogListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string(),
              actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
              action: z.string(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PromotionAudit = z
  .object({
    logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    promotionId: z.string(),
    actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    action: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PromotionAuditListData = z
  .object({
    items: z.array(
      z
        .object({
          logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
          promotionId: z.string(),
          actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
          action: z.string(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PromotionAuditListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              promotionId: z.string(),
              actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
              action: z.string(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const RetentionPolicy = z
  .object({
    caseDays: z.number().int(),
    scoreSnapshotDays: z.number().int(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RetentionPolicyResponse = z
  .object({
    data: z
      .object({
        caseDays: z.number().int(),
        scoreSnapshotDays: z.number().int(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PackId = z.string();
const AssurancePack = z
  .object({
    packId: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['ready', 'failed']),
    downloadHint: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AssurancePackResponse = z
  .object({
    data: z
      .object({
        packId: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['ready', 'failed']),
        downloadHint: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  updateRetentionPolicy_Body,
  Problem,
  LogId,
  UserId,
  CaseAccessLog,
  CaseAccessLogListData,
  ResponseMeta,
  CaseAccessLogListResponse,
  PromotionAudit,
  PromotionAuditListData,
  PromotionAuditListResponse,
  RetentionPolicy,
  RetentionPolicyResponse,
  PackId,
  AssurancePack,
  AssurancePackResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/audit/assurance-pack',
    alias: 'exportAssurancePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            packId: z.string().regex(/^pck_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['ready', 'failed']),
            downloadHint: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/audit/case-access',
    alias: 'listCaseAccessLog',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string(),
                  actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  action: z.string(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/audit/promotions',
    alias: 'listPromotionAudit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  logId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  promotionId: z.string(),
                  actorUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  action: z.string(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/audit/retention',
    alias: 'getRetentionPolicy',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            caseDays: z.number().int(),
            scoreSnapshotDays: z.number().int(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'patch',
    path: '/v1/audit/retention',
    alias: 'updateRetentionPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateRetentionPolicy_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            caseDays: z.number().int(),
            scoreSnapshotDays: z.number().int(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
