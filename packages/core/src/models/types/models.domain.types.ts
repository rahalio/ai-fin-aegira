/**
 * Models Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/models.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExperimentId = components["schemas"]["ExperimentId"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ModelVersionListData = components["schemas"]["ModelVersionListData"];
export type PromotionDecision = components["schemas"]["PromotionDecision"];
export type PromotionDecisionListData = components["schemas"]["PromotionDecisionListData"];
export type PromotionId = components["schemas"]["PromotionId"];
export type PromotionPropose = components["schemas"]["PromotionPropose"];
export type VModel = operations["listFraudModels"]["responses"]["200"]["content"]["application/json"]["data"];
export type Promotion = operations["listPromotionDecisions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ProposePromotionRequestInput = NonNullable<operations["proposePromotion"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFraudModelsParams = NonNullable<operations["listFraudModels"]["parameters"]["query"]>;
export type GetFraudModelParams = operations["getFraudModel"]["parameters"]["path"];
export type ListPromotionDecisionsParams = NonNullable<operations["listPromotionDecisions"]["parameters"]["query"]>;
export type ApprovePromotionParams = operations["approvePromotion"]["parameters"]["path"];
export type RejectPromotionParams = operations["rejectPromotion"]["parameters"]["path"];
export type RollbackPromotionParams = operations["rollbackPromotion"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFraudModelsResponse = operations["listFraudModels"]["responses"]["200"]["content"]["application/json"];
export type GetFraudModelResponse = operations["getFraudModel"]["responses"]["200"]["content"]["application/json"];
export type ListPromotionDecisionsResponse = operations["listPromotionDecisions"]["responses"]["200"]["content"]["application/json"];
export type ProposePromotionResponse = operations["proposePromotion"]["responses"]["201"]["content"]["application/json"];
export type ApprovePromotionResponse = operations["approvePromotion"]["responses"]["200"]["content"]["application/json"];
export type RejectPromotionResponse = operations["rejectPromotion"]["responses"]["200"]["content"]["application/json"];
export type RollbackPromotionResponse = operations["rollbackPromotion"]["responses"]["200"]["content"]["application/json"];


