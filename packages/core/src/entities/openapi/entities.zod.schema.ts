import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const CaseId = z.string();
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
const EntityLinkId = z.string();
const EntityType = z.enum(['device', 'payee', 'merchant']);
const EntityLink = z
  .object({
    entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
    caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
    entityType: z.enum(['device', 'payee', 'merchant']),
    entityRef: z.string(),
    linkedCaseIds: z
      .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const EntityLinkListData = z
  .object({
    items: z.array(
      z
        .object({
          entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
          caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
          entityType: z.enum(['device', 'payee', 'merchant']),
          entityRef: z.string(),
          linkedCaseIds: z
            .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
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
const EntityLinkListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
              caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
              entityType: z.enum(['device', 'payee', 'merchant']),
              entityRef: z.string(),
              linkedCaseIds: z
                .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
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
const EntityHop = z
  .object({
    entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
    remainingHops: z.number().int(),
    exhausted: z.boolean(),
    linkedCaseIds: z
      .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const EntityHopResponse = z
  .object({
    data: z
      .object({
        entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
        remainingHops: z.number().int(),
        exhausted: z.boolean(),
        linkedCaseIds: z
          .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
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
  CaseId,
  Problem,
  EntityLinkId,
  EntityType,
  EntityLink,
  EntityLinkListData,
  ResponseMeta,
  EntityLinkListResponse,
  EntityHop,
  EntityHopResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/cases/:caseId/entities',
    alias: 'listCaseEntities',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
                  entityLinkId: z
                    .string()
                    .regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
                  caseId: z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/),
                  entityType: z.enum(['device', 'payee', 'merchant']),
                  entityRef: z.string(),
                  linkedCaseIds: z
                    .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
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
    path: '/v1/entities/:entityLinkId/hops',
    alias: 'listEntityHops',
    requestFormat: 'json',
    parameters: [
      {
        name: 'entityLinkId',
        type: 'Path',
        schema: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            entityLinkId: z.string().regex(/^ent_[0-9A-HJKMNP-TV-Z]{26}$/),
            remainingHops: z.number().int(),
            exhausted: z.boolean(),
            linkedCaseIds: z
              .array(z.string().regex(/^cse_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
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
