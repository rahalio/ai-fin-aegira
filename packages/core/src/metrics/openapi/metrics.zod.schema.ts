import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

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
const OpsMetrics = z
  .object({
    lossPrevented: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    falsePositiveCost: z
      .object({
        amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
      })
      .passthrough(),
    frictionEvents: z.number().int(),
    investigatorHoursPerConfirmed: z.number(),
    labellingCoveragePct: z.number(),
    generatedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
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
const OpsMetricsResponse = z
  .object({
    data: z
      .object({
        lossPrevented: z
          .object({
            amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
          })
          .passthrough(),
        falsePositiveCost: z
          .object({
            amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
          })
          .passthrough(),
        frictionEvents: z.number().int(),
        investigatorHoursPerConfirmed: z.number(),
        labellingCoveragePct: z.number(),
        generatedAt: z.string().datetime({ offset: true }),
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
const WeeklyLift = z
  .object({
    weekStart: z.string(),
    championPrecision: z.number(),
    challengerPrecision: z.number(),
    falsePositiveDelta: z.number().optional(),
    experimentId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const WeeklyLiftResponse = z
  .object({
    data: z
      .object({
        weekStart: z.string(),
        championPrecision: z.number(),
        challengerPrecision: z.number(),
        falsePositiveDelta: z.number().optional(),
        experimentId: z.string().optional(),
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
const DispositionMix = z
  .object({
    fraudConfirmed: z.number().int(),
    friendlyFraud: z.number().int(),
    falsePositive: z.number().int(),
    unableToDetermine: z.number().int(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DispositionMixResponse = z
  .object({
    data: z
      .object({
        fraudConfirmed: z.number().int(),
        friendlyFraud: z.number().int(),
        falsePositive: z.number().int(),
        unableToDetermine: z.number().int(),
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

export const schemas: any = {
  Problem,
  Currency,
  Money,
  OpsMetrics,
  ResponseMeta,
  OpsMetricsResponse,
  WeeklyLift,
  WeeklyLiftResponse,
  DispositionMix,
  DispositionMixResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/metrics/disposition-mix',
    alias: 'getDispositionMix',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            fraudConfirmed: z.number().int(),
            friendlyFraud: z.number().int(),
            falsePositive: z.number().int(),
            unableToDetermine: z.number().int(),
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
    method: 'get',
    path: '/v1/metrics/lift',
    alias: 'getWeeklyLift',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            weekStart: z.string(),
            championPrecision: z.number(),
            challengerPrecision: z.number(),
            falsePositiveDelta: z.number().optional(),
            experimentId: z.string().optional(),
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
    method: 'get',
    path: '/v1/metrics/overview',
    alias: 'getOpsMetricsOverview',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            lossPrevented: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough(),
            falsePositiveCost: z
              .object({
                amount: z.string().regex(/^-?\d+(\.\d{1,5})?$/),
                currency: z
                  .string()
                  .min(3)
                  .max(3)
                  .regex(/^[A-Z]{3}$/),
              })
              .passthrough(),
            frictionEvents: z.number().int(),
            investigatorHoursPerConfirmed: z.number(),
            labellingCoveragePct: z.number(),
            generatedAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
