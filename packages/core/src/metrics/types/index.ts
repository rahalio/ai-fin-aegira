/**
 * Metrics Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/metrics.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DispositionMix = components["schemas"]["DispositionMix"];
export type OpsMetrics = components["schemas"]["OpsMetrics"];
export type WeeklyLift = components["schemas"]["WeeklyLift"];




// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetOpsMetricsOverviewResponse = operations["getOpsMetricsOverview"]["responses"]["200"]["content"]["application/json"];
export type GetWeeklyLiftResponse = operations["getWeeklyLift"]["responses"]["200"]["content"]["application/json"];
export type GetDispositionMixResponse = operations["getDispositionMix"]["responses"]["200"]["content"]["application/json"];


