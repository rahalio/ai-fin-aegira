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
const CareStatusId = z.string();
const CareStatus = z
  .object({
    careStatusId: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
    paymentRefMasked: z.string(),
    lockState: z.enum(['unlocked', 'locked', 'pending_review']),
    paymentState: z.enum(['allowed', 'declined', 'held']),
    allowedCareActions: z.array(z.string()).optional(),
    callbackRequested: z.boolean().optional(),
    lastCallOutcome: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
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
const CareStatusResponse = z
  .object({
    data: z
      .object({
        careStatusId: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
        paymentRefMasked: z.string(),
        lockState: z.enum(['unlocked', 'locked', 'pending_review']),
        paymentState: z.enum(['allowed', 'declined', 'held']),
        allowedCareActions: z.array(z.string()).optional(),
        callbackRequested: z.boolean().optional(),
        lastCallOutcome: z.string().optional(),
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
const CareCallOutcome = z.object({ outcome: z.string() }).passthrough();

export const schemas: any = {
  Problem,
  CareStatusId,
  CareStatus,
  ResponseMeta,
  CareStatusResponse,
  CareCallOutcome,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/care/status',
    alias: 'getCareStatus',
    requestFormat: 'json',
    parameters: [
      {
        name: 'paymentRef',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'maskedPan',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            careStatusId: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
            paymentRefMasked: z.string(),
            lockState: z.enum(['unlocked', 'locked', 'pending_review']),
            paymentState: z.enum(['allowed', 'declined', 'held']),
            allowedCareActions: z.array(z.string()).optional(),
            callbackRequested: z.boolean().optional(),
            lastCallOutcome: z.string().optional(),
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
    path: '/v1/care/status/:careStatusId/call-outcome',
    alias: 'noteCareCallOutcome',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ outcome: z.string() }).passthrough(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'careStatusId',
        type: 'Path',
        schema: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            careStatusId: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
            paymentRefMasked: z.string(),
            lockState: z.enum(['unlocked', 'locked', 'pending_review']),
            paymentState: z.enum(['allowed', 'declined', 'held']),
            allowedCareActions: z.array(z.string()).optional(),
            callbackRequested: z.boolean().optional(),
            lastCallOutcome: z.string().optional(),
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
    path: '/v1/care/status/:careStatusId/callback',
    alias: 'requestCareCallback',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'careStatusId',
        type: 'Path',
        schema: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            careStatusId: z.string().regex(/^car_[0-9A-HJKMNP-TV-Z]{26}$/),
            paymentRefMasked: z.string(),
            lockState: z.enum(['unlocked', 'locked', 'pending_review']),
            paymentState: z.enum(['allowed', 'declined', 'held']),
            allowedCareActions: z.array(z.string()).optional(),
            callbackRequested: z.boolean().optional(),
            lastCallOutcome: z.string().optional(),
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
