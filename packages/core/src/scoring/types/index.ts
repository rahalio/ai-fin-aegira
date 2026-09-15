/**
 * Scoring Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/scoring.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FeatureHighlight = components["schemas"]["FeatureHighlight"];
export type LatencyBreach = components["schemas"]["LatencyBreach"];
export type LatencyBreachId = components["schemas"]["LatencyBreachId"];
export type LatencyBudget = components["schemas"]["LatencyBudget"];
export type LatencyBudgetUpdate = components["schemas"]["LatencyBudgetUpdate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ScoreDecision = components["schemas"]["ScoreDecision"];
export type ScoreEvent = components["schemas"]["ScoreEvent"];
export type ScoreEventId = components["schemas"]["ScoreEventId"];
export type ScoreEventListData = components["schemas"]["ScoreEventListData"];
export type ScoreEventRequest = components["schemas"]["ScoreEventRequest"];
export type Score = operations["listScoreEvents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ScoreTransactionRequestInput = NonNullable<operations["scoreTransaction"]["requestBody"]>["content"]["application/json"];
export type UpdateScoringLatencyBudgetRequestInput = NonNullable<operations["updateScoringLatencyBudget"]["requestBody"]>["content"]["application/json"];
export type UpdateScoringLatencyBudgetRequest = UpdateScoringLatencyBudgetRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListScoreEventsParams = NonNullable<operations["listScoreEvents"]["parameters"]["query"]>;
export type GetScoreEventParams = operations["getScoreEvent"]["parameters"]["path"];
export type AcknowledgeLatencyBreachParams = operations["acknowledgeLatencyBreach"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ScoreTransactionResponse = operations["scoreTransaction"]["responses"]["201"]["content"]["application/json"];
export type ListScoreEventsResponse = operations["listScoreEvents"]["responses"]["200"]["content"]["application/json"];
export type GetScoreEventResponse = operations["getScoreEvent"]["responses"]["200"]["content"]["application/json"];
export type GetScoringLatencyHealthResponse = operations["getScoringLatencyHealth"]["responses"]["200"]["content"]["application/json"];
export type UpdateScoringLatencyBudgetResponse = operations["updateScoringLatencyBudget"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeLatencyBreachResponse = operations["acknowledgeLatencyBreach"]["responses"]["200"]["content"]["application/json"];


