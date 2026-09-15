import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const scoreTransaction_Body = z
  .object({
    transactionRef: z.string(),
    amount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    merchantId: z.string().optional(),
    deviceId: z.string().optional(),
    features: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const ScoreDecision = z.enum(['allow', 'step_up', 'decline', 'case']);
const ModelVersionId = z.string();
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
const ScoreEventId = z.string();
const Currency = z.string();
const Money = z
  .object({
    amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
  })
  .passthrough();
const FeatureHighlight = z
  .object({
    key: z.string(),
    contribution: z.number(),
    displayValue: z.string().optional(),
  })
  .passthrough();
const ScoreEvent = z
  .object({
    scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
    transactionRef: z.string(),
    amount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough()
      .optional(),
    merchantId: z.string().optional(),
    deviceId: z.string().optional(),
    modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    modelVersionName: z.string(),
    modelRole: z.enum(['champion', 'challenger']),
    score: z.number(),
    decision: z.enum(['allow', 'step_up', 'decline', 'case']),
    latencyMs: z.number().int().optional(),
    featureHighlights: z
      .array(
        z
          .object({
            key: z.string(),
            contribution: z.number(),
            displayValue: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ScoreEventListData = z
  .object({
    items: z.array(
      z
        .object({
          scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
          transactionRef: z.string(),
          amount: z
            .object({
              amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
            })
            .passthrough()
            .optional(),
          merchantId: z.string().optional(),
          deviceId: z.string().optional(),
          modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          modelVersionName: z.string(),
          modelRole: z.enum(['champion', 'challenger']),
          score: z.number(),
          decision: z.enum(['allow', 'step_up', 'decline', 'case']),
          latencyMs: z.number().int().optional(),
          featureHighlights: z
            .array(
              z
                .object({
                  key: z.string(),
                  contribution: z.number(),
                  displayValue: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
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
const ScoreEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
              transactionRef: z.string(),
              amount: z
                .object({
                  amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                })
                .passthrough()
                .optional(),
              merchantId: z.string().optional(),
              deviceId: z.string().optional(),
              modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              modelVersionName: z.string(),
              modelRole: z.enum(['champion', 'challenger']),
              score: z.number(),
              decision: z.enum(['allow', 'step_up', 'decline', 'case']),
              latencyMs: z.number().int().optional(),
              featureHighlights: z
                .array(
                  z
                    .object({
                      key: z.string(),
                      contribution: z.number(),
                      displayValue: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
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
const ScoreEventRequest = z
  .object({
    transactionRef: z.string(),
    amount: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    merchantId: z.string().optional(),
    deviceId: z.string().optional(),
    features: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const ScoreEventResponse = z
  .object({
    data: z
      .object({
        scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
        transactionRef: z.string(),
        amount: z
          .object({
            amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
          })
          .passthrough()
          .optional(),
        merchantId: z.string().optional(),
        deviceId: z.string().optional(),
        modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        modelVersionName: z.string(),
        modelRole: z.enum(['champion', 'challenger']),
        score: z.number(),
        decision: z.enum(['allow', 'step_up', 'decline', 'case']),
        latencyMs: z.number().int().optional(),
        featureHighlights: z
          .array(
            z
              .object({
                key: z.string(),
                contribution: z.number(),
                displayValue: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
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
const LatencyBudget = z
  .object({
    p99BudgetMs: z.number().int(),
    p50Ms: z.number().int(),
    p99Ms: z.number().int(),
    status: z.enum(['healthy', 'breaching']),
    lastBreachAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LatencyHealthResponse = z
  .object({
    data: z
      .object({
        p99BudgetMs: z.number().int(),
        p50Ms: z.number().int(),
        p99Ms: z.number().int(),
        status: z.enum(['healthy', 'breaching']),
        lastBreachAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }),
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
const LatencyBudgetUpdate = z
  .object({ p99BudgetMs: z.number().int().gte(1) })
  .passthrough();
const LatencyBreachId = z.string();
const LatencyBreach = z
  .object({
    breachId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
    p99Ms: z.number().int(),
    budgetMs: z.number().int(),
    status: z.enum(['open', 'acknowledged']),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LatencyBreachResponse = z
  .object({
    data: z
      .object({
        breachId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
        p99Ms: z.number().int(),
        budgetMs: z.number().int(),
        status: z.enum(['open', 'acknowledged']),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
  scoreTransaction_Body,
  ScoreDecision,
  ModelVersionId,
  Problem,
  ScoreEventId,
  Currency,
  Money,
  FeatureHighlight,
  ScoreEvent,
  ScoreEventListData,
  ResponseMeta,
  ScoreEventListResponse,
  ScoreEventRequest,
  ScoreEventResponse,
  LatencyBudget,
  LatencyHealthResponse,
  LatencyBudgetUpdate,
  LatencyBreachId,
  LatencyBreach,
  LatencyBreachResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/scores',
    alias: 'scoreTransaction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: scoreTransaction_Body,
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
            scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
            transactionRef: z.string(),
            amount: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough()
              .optional(),
            merchantId: z.string().optional(),
            deviceId: z.string().optional(),
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            modelVersionName: z.string(),
            modelRole: z.enum(['champion', 'challenger']),
            score: z.number(),
            decision: z.enum(['allow', 'step_up', 'decline', 'case']),
            latencyMs: z.number().int().optional(),
            featureHighlights: z
              .array(
                z
                  .object({
                    key: z.string(),
                    contribution: z.number(),
                    displayValue: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
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
    method: 'get',
    path: '/v1/scores',
    alias: 'listScoreEvents',
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
        name: 'decision',
        type: 'Query',
        schema: z.enum(['allow', 'step_up', 'decline', 'case']).optional(),
      },
      {
        name: 'modelVersionId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  scoreEventId: z
                    .string()
                    .regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  transactionRef: z.string(),
                  amount: z
                    .object({
                      amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                      currency: z
                        .string()
                        .min(3)
                        .max(3)
                        .regex(/^[A-Z]{3}$/),
                    })
                    .passthrough()
                    .optional(),
                  merchantId: z.string().optional(),
                  deviceId: z.string().optional(),
                  modelVersionId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  modelVersionName: z.string(),
                  modelRole: z.enum(['champion', 'challenger']),
                  score: z.number(),
                  decision: z.enum(['allow', 'step_up', 'decline', 'case']),
                  latencyMs: z.number().int().optional(),
                  featureHighlights: z
                    .array(
                      z
                        .object({
                          key: z.string(),
                          contribution: z.number(),
                          displayValue: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
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
    path: '/v1/scores/:scoreEventId',
    alias: 'getScoreEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'scoreEventId',
        type: 'Path',
        schema: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            scoreEventId: z.string().regex(/^scr_[0-9A-HJKMNP-TV-Z]{26}$/),
            transactionRef: z.string(),
            amount: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough()
              .optional(),
            merchantId: z.string().optional(),
            deviceId: z.string().optional(),
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            modelVersionName: z.string(),
            modelRole: z.enum(['champion', 'challenger']),
            score: z.number(),
            decision: z.enum(['allow', 'step_up', 'decline', 'case']),
            latencyMs: z.number().int().optional(),
            featureHighlights: z
              .array(
                z
                  .object({
                    key: z.string(),
                    contribution: z.number(),
                    displayValue: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
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
    path: '/v1/scoring/latency',
    alias: 'getScoringLatencyHealth',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            p99BudgetMs: z.number().int(),
            p50Ms: z.number().int(),
            p99Ms: z.number().int(),
            status: z.enum(['healthy', 'breaching']),
            lastBreachAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/scoring/latency',
    alias: 'updateScoringLatencyBudget',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ p99BudgetMs: z.number().int().gte(1) })
          .passthrough(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            p99BudgetMs: z.number().int(),
            p50Ms: z.number().int(),
            p99Ms: z.number().int(),
            status: z.enum(['healthy', 'breaching']),
            lastBreachAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/scoring/latency-breaches/:breachId/acknowledge',
    alias: 'acknowledgeLatencyBreach',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'breachId',
        type: 'Path',
        schema: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            breachId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            p99Ms: z.number().int(),
            budgetMs: z.number().int(),
            status: z.enum(['open', 'acknowledged']),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
