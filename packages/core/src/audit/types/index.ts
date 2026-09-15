/**
 * Audit Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/audit.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssurancePack = components["schemas"]["AssurancePack"];
export type CaseAccessLog = components["schemas"]["CaseAccessLog"];
export type CaseAccessLogListData = components["schemas"]["CaseAccessLogListData"];
export type LogId = components["schemas"]["LogId"];
export type PackId = components["schemas"]["PackId"];
export type PromotionAudit = components["schemas"]["PromotionAudit"];
export type PromotionAuditListData = components["schemas"]["PromotionAuditListData"];
export type RetentionPolicy = components["schemas"]["RetentionPolicy"];
export type CaseAccess = operations["listCaseAccessLog"]["responses"]["200"]["content"]["application/json"]["data"];
export type Promotion = operations["listPromotionAudit"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpdateRetentionPolicyRequestInput = NonNullable<operations["updateRetentionPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateRetentionPolicyRequest = UpdateRetentionPolicyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCaseAccessLogParams = NonNullable<operations["listCaseAccessLog"]["parameters"]["query"]>;
export type ListPromotionAuditParams = NonNullable<operations["listPromotionAudit"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCaseAccessLogResponse = operations["listCaseAccessLog"]["responses"]["200"]["content"]["application/json"];
export type ListPromotionAuditResponse = operations["listPromotionAudit"]["responses"]["200"]["content"]["application/json"];
export type GetRetentionPolicyResponse = operations["getRetentionPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpdateRetentionPolicyResponse = operations["updateRetentionPolicy"]["responses"]["200"]["content"]["application/json"];
export type ExportAssurancePackResponse = operations["exportAssurancePack"]["responses"]["201"]["content"]["application/json"];


