import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createChallengerExperiment_Body = z
  .object({
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    trafficPct: z.number().gte(0).lte(100),
    minPrecisionLift: z.number().optional(),
    maxFpIncrease: z.number().optional(),
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
const ExperimentId = z.string();
const ModelVersionId = z.string();
const ChallengerExperiment = z
  .object({
    experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    trafficPct: z.number(),
    status: z.enum(['running', 'completed', 'aborted']),
    liftSummary: z.string().optional(),
    precisionDelta: z.number().optional(),
    falsePositiveDelta: z.number().optional(),
    criteria: z
      .object({
        minPrecisionLift: z.number(),
        maxFpIncrease: z.number(),
        met: z.boolean().optional(),
      })
      .passthrough(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ChallengerExperimentListData = z
  .object({
    items: z.array(
      z
        .object({
          experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
          challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          trafficPct: z.number(),
          status: z.enum(['running', 'completed', 'aborted']),
          liftSummary: z.string().optional(),
          precisionDelta: z.number().optional(),
          falsePositiveDelta: z.number().optional(),
          criteria: z
            .object({
              minPrecisionLift: z.number(),
              maxFpIncrease: z.number(),
              met: z.boolean().optional(),
            })
            .passthrough(),
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
const ChallengerExperimentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
              challengerModelId: z
                .string()
                .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              trafficPct: z.number(),
              status: z.enum(['running', 'completed', 'aborted']),
              liftSummary: z.string().optional(),
              precisionDelta: z.number().optional(),
              falsePositiveDelta: z.number().optional(),
              criteria: z
                .object({
                  minPrecisionLift: z.number(),
                  maxFpIncrease: z.number(),
                  met: z.boolean().optional(),
                })
                .passthrough(),
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
const ChallengerExperimentCreate = z
  .object({
    challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    trafficPct: z.number().gte(0).lte(100),
    minPrecisionLift: z.number().optional(),
    maxFpIncrease: z.number().optional(),
  })
  .passthrough();
const ChallengerExperimentResponse = z
  .object({
    data: z
      .object({
        experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
        challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        trafficPct: z.number(),
        status: z.enum(['running', 'completed', 'aborted']),
        liftSummary: z.string().optional(),
        precisionDelta: z.number().optional(),
        falsePositiveDelta: z.number().optional(),
        criteria: z
          .object({
            minPrecisionLift: z.number(),
            maxFpIncrease: z.number(),
            met: z.boolean().optional(),
          })
          .passthrough(),
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
  createChallengerExperiment_Body,
  Problem,
  ExperimentId,
  ModelVersionId,
  ChallengerExperiment,
  ChallengerExperimentListData,
  ResponseMeta,
  ChallengerExperimentListResponse,
  ChallengerExperimentCreate,
  ChallengerExperimentResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/experiments',
    alias: 'listChallengerExperiments',
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
                  experimentId: z
                    .string()
                    .regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  challengerModelId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  trafficPct: z.number(),
                  status: z.enum(['running', 'completed', 'aborted']),
                  liftSummary: z.string().optional(),
                  precisionDelta: z.number().optional(),
                  falsePositiveDelta: z.number().optional(),
                  criteria: z
                    .object({
                      minPrecisionLift: z.number(),
                      maxFpIncrease: z.number(),
                      met: z.boolean().optional(),
                    })
                    .passthrough(),
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
    path: '/v1/experiments',
    alias: 'createChallengerExperiment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createChallengerExperiment_Body,
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
            experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            trafficPct: z.number(),
            status: z.enum(['running', 'completed', 'aborted']),
            liftSummary: z.string().optional(),
            precisionDelta: z.number().optional(),
            falsePositiveDelta: z.number().optional(),
            criteria: z
              .object({
                minPrecisionLift: z.number(),
                maxFpIncrease: z.number(),
                met: z.boolean().optional(),
              })
              .passthrough(),
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
    path: '/v1/experiments/:experimentId',
    alias: 'getChallengerExperiment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'experimentId',
        type: 'Path',
        schema: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            trafficPct: z.number(),
            status: z.enum(['running', 'completed', 'aborted']),
            liftSummary: z.string().optional(),
            precisionDelta: z.number().optional(),
            falsePositiveDelta: z.number().optional(),
            criteria: z
              .object({
                minPrecisionLift: z.number(),
                maxFpIncrease: z.number(),
                met: z.boolean().optional(),
              })
              .passthrough(),
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
    path: '/v1/experiments/:experimentId/abort',
    alias: 'abortChallengerExperiment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'experimentId',
        type: 'Path',
        schema: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            experimentId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            challengerModelId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            trafficPct: z.number(),
            status: z.enum(['running', 'completed', 'aborted']),
            liftSummary: z.string().optional(),
            precisionDelta: z.number().optional(),
            falsePositiveDelta: z.number().optional(),
            criteria: z
              .object({
                minPrecisionLift: z.number(),
                maxFpIncrease: z.number(),
                met: z.boolean().optional(),
              })
              .passthrough(),
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
