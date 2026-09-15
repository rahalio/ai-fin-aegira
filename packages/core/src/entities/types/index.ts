/**
 * Entities Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/entities.openapi.types";

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
export type EntityHop = components["schemas"]["EntityHop"];
export type EntityLink = components["schemas"]["EntityLink"];
export type EntityLinkId = components["schemas"]["EntityLinkId"];
export type EntityLinkListData = components["schemas"]["EntityLinkListData"];
export type EntityType = components["schemas"]["EntityType"];
export type Entity = operations["listCaseEntities"]["responses"]["200"]["content"]["application/json"]["data"];
export type Hop = operations["listEntityHops"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCaseEntitiesParams = NonNullable<operations["listCaseEntities"]["parameters"]["query"]>;
export type ListEntityHopsParams = operations["listEntityHops"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCaseEntitiesResponse = operations["listCaseEntities"]["responses"]["200"]["content"]["application/json"];
export type ListEntityHopsResponse = operations["listEntityHops"]["responses"]["200"]["content"]["application/json"];


