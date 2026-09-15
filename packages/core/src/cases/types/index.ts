/**
 * Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/cases.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CaseId = components["schemas"]["CaseId"];
export type CaseStatus = components["schemas"]["CaseStatus"];
export type FraudCase = components["schemas"]["FraudCase"];
export type FraudCaseListData = components["schemas"]["FraudCaseListData"];
export type InvestigatorLoad = components["schemas"]["InvestigatorLoad"];
export type InvestigatorLoadListData = components["schemas"]["InvestigatorLoadListData"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type PriorityPolicy = components["schemas"]["PriorityPolicy"];
export type QueueHeatmapCell = components["schemas"]["QueueHeatmapCell"];
export type QueueSnapshot = components["schemas"]["QueueSnapshot"];
export type ScoreEventId = components["schemas"]["ScoreEventId"];
export type ReassignCaseRequest = components["schemas"]["ReassignCaseRequest"];
export type Case = operations["listFraudCases"]["responses"]["200"]["content"]["application/json"]["data"];
export type Investigator = operations["listInvestigatorLoad"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ReassignFraudCaseRequestInput = NonNullable<operations["reassignFraudCase"]["requestBody"]>["content"]["application/json"];
export type UpdatePriorityPolicyRequestInput = NonNullable<operations["updatePriorityPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdatePriorityPolicyRequest = UpdatePriorityPolicyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFraudCasesParams = NonNullable<operations["listFraudCases"]["parameters"]["query"]>;
export type GetFraudCaseParams = operations["getFraudCase"]["parameters"]["path"];
export type ClaimFraudCaseParams = operations["claimFraudCase"]["parameters"]["path"];
export type ReassignFraudCaseParams = operations["reassignFraudCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFraudCasesResponse = operations["listFraudCases"]["responses"]["200"]["content"]["application/json"];
export type GetFraudCaseResponse = operations["getFraudCase"]["responses"]["200"]["content"]["application/json"];
export type ClaimFraudCaseResponse = operations["claimFraudCase"]["responses"]["200"]["content"]["application/json"];
export type ReassignFraudCaseResponse = operations["reassignFraudCase"]["responses"]["200"]["content"]["application/json"];
export type GetQueueHeatmapResponse = operations["getQueueHeatmap"]["responses"]["200"]["content"]["application/json"];
export type ListInvestigatorLoadResponse = operations["listInvestigatorLoad"]["responses"]["200"]["content"]["application/json"];
export type GetPriorityPolicyResponse = operations["getPriorityPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpdatePriorityPolicyResponse = operations["updatePriorityPolicy"]["responses"]["200"]["content"]["application/json"];


