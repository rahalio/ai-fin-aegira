/**
 * Handoffs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/handoffs.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AmlHandoff = components["schemas"]["AmlHandoff"];
export type AmlHandoffCreate = components["schemas"]["AmlHandoffCreate"];
export type AmlHandoffListData = components["schemas"]["AmlHandoffListData"];
export type AmlHandoffReject = components["schemas"]["AmlHandoffReject"];
export type CaseId = components["schemas"]["CaseId"];
export type HandoffId = components["schemas"]["HandoffId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAmlHandoffRequestInput = NonNullable<operations["createAmlHandoff"]["requestBody"]>["content"]["application/json"];
export type RejectAmlHandoffRequestInput = NonNullable<operations["rejectAmlHandoff"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAmlHandoffsParams = NonNullable<operations["listAmlHandoffs"]["parameters"]["query"]>;
export type GetAmlHandoffParams = operations["getAmlHandoff"]["parameters"]["path"];
export type AcceptAmlHandoffParams = operations["acceptAmlHandoff"]["parameters"]["path"];
export type RejectAmlHandoffParams = operations["rejectAmlHandoff"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAmlHandoffsResponse = operations["listAmlHandoffs"]["responses"]["200"]["content"]["application/json"];
export type CreateAmlHandoffResponse = operations["createAmlHandoff"]["responses"]["201"]["content"]["application/json"];
export type GetAmlHandoffResponse = operations["getAmlHandoff"]["responses"]["200"]["content"]["application/json"];
export type AcceptAmlHandoffResponse = operations["acceptAmlHandoff"]["responses"]["200"]["content"]["application/json"];
export type RejectAmlHandoffResponse = operations["rejectAmlHandoff"]["responses"]["200"]["content"]["application/json"];


