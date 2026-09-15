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
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

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


