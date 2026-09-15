/**
 * Care Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/care.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CareCallOutcome = components["schemas"]["CareCallOutcome"];
export type CareStatus = components["schemas"]["CareStatus"];
export type CareStatusId = components["schemas"]["CareStatusId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type NoteCareCallOutcomeRequestInput = NonNullable<operations["noteCareCallOutcome"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetCareStatusParams = NonNullable<operations["getCareStatus"]["parameters"]["query"]>;
export type RequestCareCallbackParams = operations["requestCareCallback"]["parameters"]["path"];
export type NoteCareCallOutcomeParams = operations["noteCareCallOutcome"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetCareStatusResponse = operations["getCareStatus"]["responses"]["200"]["content"]["application/json"];
export type RequestCareCallbackResponse = operations["requestCareCallback"]["responses"]["200"]["content"]["application/json"];
export type NoteCareCallOutcomeResponse = operations["noteCareCallOutcome"]["responses"]["200"]["content"]["application/json"];


