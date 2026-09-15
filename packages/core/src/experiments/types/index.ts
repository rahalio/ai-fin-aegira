/**
 * Experiments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/experiments.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChallengerExperiment = components["schemas"]["ChallengerExperiment"];
export type ChallengerExperimentCreate = components["schemas"]["ChallengerExperimentCreate"];
export type ChallengerExperimentListData = components["schemas"]["ChallengerExperimentListData"];
export type ExperimentId = components["schemas"]["ExperimentId"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type Experiment = operations["listChallengerExperiments"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateChallengerExperimentRequestInput = NonNullable<operations["createChallengerExperiment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListChallengerExperimentsParams = NonNullable<operations["listChallengerExperiments"]["parameters"]["query"]>;
export type GetChallengerExperimentParams = operations["getChallengerExperiment"]["parameters"]["path"];
export type AbortChallengerExperimentParams = operations["abortChallengerExperiment"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListChallengerExperimentsResponse = operations["listChallengerExperiments"]["responses"]["200"]["content"]["application/json"];
export type CreateChallengerExperimentResponse = operations["createChallengerExperiment"]["responses"]["201"]["content"]["application/json"];
export type GetChallengerExperimentResponse = operations["getChallengerExperiment"]["responses"]["200"]["content"]["application/json"];
export type AbortChallengerExperimentResponse = operations["abortChallengerExperiment"]["responses"]["200"]["content"]["application/json"];


