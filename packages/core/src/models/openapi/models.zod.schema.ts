import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const proposePromotion_Body = z
  .object({
    experimentId: z
      .string()
      .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    championModelId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
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
const ModelVersionId = z.string();
const ModelVersion = z
  .object({
    modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    role: z.enum(['champion', 'challenger']),
    status: z.enum(['shadow', 'limited', 'production', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ModelVersionListData = z
  .object({
    items: z.array(
      z
        .object({
          modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          role: z.enum(['champion', 'challenger']),
          status: z.enum(['shadow', 'limited', 'production', 'retired']),
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
const ModelVersionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              role: z.enum(['champion', 'challenger']),
              status: z.enum(['shadow', 'limited', 'production', 'retired']),
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
const ModelVersionResponse = z
  .object({
    data: z
      .object({
        modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        role: z.enum(['champion', 'challenger']),
        status: z.enum(['shadow', 'limited', 'production', 'retired']),
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
const PromotionId = z.string();
const ExperimentId = z.string();
const UserId = z.string();
const PromotionDecision = z
  .object({
    promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
    experimentId: z
      .string()
      .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    championModelId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum([
      'proposed',
      'pending_second',
      'approved',
      'rejected',
      'rolled_back',
    ]),
    criteriaMet: z.boolean().optional(),
    approverIds: z.array(z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PromotionDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
          experimentId: z
            .string()
            .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          championModelId: z
            .string()
            .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum([
            'proposed',
            'pending_second',
            'approved',
            'rejected',
            'rolled_back',
          ]),
          criteriaMet: z.boolean().optional(),
          approverIds: z.array(
            z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          ),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const PromotionDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
              experimentId: z
                .string()
                .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              championModelId: z
                .string()
                .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              challengerModelId: z
                .string()
                .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum([
                'proposed',
                'pending_second',
                'approved',
                'rejected',
                'rolled_back',
              ]),
              criteriaMet: z.boolean().optional(),
              approverIds: z.array(
                z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
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
const PromotionPropose = z
  .object({
    experimentId: z
      .string()
      .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    championModelId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const PromotionDecisionResponse = z
  .object({
    data: z
      .object({
        promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
        experimentId: z
          .string()
          .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        championModelId: z
          .string()
          .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum([
          'proposed',
          'pending_second',
          'approved',
          'rejected',
          'rolled_back',
        ]),
        criteriaMet: z.boolean().optional(),
        approverIds: z.array(z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)),
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
  proposePromotion_Body,
  Problem,
  ModelVersionId,
  ModelVersion,
  ModelVersionListData,
  ResponseMeta,
  ModelVersionListResponse,
  ModelVersionResponse,
  PromotionId,
  ExperimentId,
  UserId,
  PromotionDecision,
  PromotionDecisionListData,
  PromotionDecisionListResponse,
  PromotionPropose,
  PromotionDecisionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/models',
    alias: 'listFraudModels',
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
      {
        name: 'role',
        type: 'Query',
        schema: z.enum(['champion', 'challenger']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  modelVersionId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  role: z.enum(['champion', 'challenger']),
                  status: z.enum([
                    'shadow',
                    'limited',
                    'production',
                    'retired',
                  ]),
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
    path: '/v1/models/:modelVersionId',
    alias: 'getFraudModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['champion', 'challenger']),
            status: z.enum(['shadow', 'limited', 'production', 'retired']),
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
      {
        status: 404,
        description: `Resource not found`,
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
    path: '/v1/promotions',
    alias: 'listPromotionDecisions',
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
                  promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  experimentId: z
                    .string()
                    .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  championModelId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  challengerModelId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum([
                    'proposed',
                    'pending_second',
                    'approved',
                    'rejected',
                    'rolled_back',
                  ]),
                  criteriaMet: z.boolean().optional(),
                  approverIds: z.array(
                    z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
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
    method: 'post',
    path: '/v1/promotions',
    alias: 'proposePromotion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: proposePromotion_Body,
      },
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
            promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
            experimentId: z
              .string()
              .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            championModelId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'proposed',
              'pending_second',
              'approved',
              'rejected',
              'rolled_back',
            ]),
            criteriaMet: z.boolean().optional(),
            approverIds: z.array(
              z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
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
  {
    method: 'post',
    path: '/v1/promotions/:promotionId/approve',
    alias: 'approvePromotion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'promotionId',
        type: 'Path',
        schema: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
            experimentId: z
              .string()
              .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            championModelId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'proposed',
              'pending_second',
              'approved',
              'rejected',
              'rolled_back',
            ]),
            criteriaMet: z.boolean().optional(),
            approverIds: z.array(
              z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
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
      {
        status: 404,
        description: `Resource not found`,
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    method: 'post',
    path: '/v1/promotions/:promotionId/reject',
    alias: 'rejectPromotion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'promotionId',
        type: 'Path',
        schema: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
            experimentId: z
              .string()
              .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            championModelId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'proposed',
              'pending_second',
              'approved',
              'rejected',
              'rolled_back',
            ]),
            criteriaMet: z.boolean().optional(),
            approverIds: z.array(
              z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
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
      {
        status: 404,
        description: `Resource not found`,
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
    method: 'post',
    path: '/v1/promotions/:promotionId/rollback',
    alias: 'rollbackPromotion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'promotionId',
        type: 'Path',
        schema: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            promotionId: z.string().regex(/^prm_[0-9A-HJKMNP-TV-Z]{26}$/),
            experimentId: z
              .string()
              .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            championModelId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum([
              'proposed',
              'pending_second',
              'approved',
              'rejected',
              'rolled_back',
            ]),
            criteriaMet: z.boolean().optional(),
            approverIds: z.array(
              z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
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
      {
        status: 404,
        description: `Resource not found`,
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
