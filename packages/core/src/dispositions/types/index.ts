/**
 * Dispositions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dispositions.openapi.types";

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
export type Disposition = components["schemas"]["Disposition"];
export type DispositionCode = components["schemas"]["DispositionCode"];
export type DispositionCreate = components["schemas"]["DispositionCreate"];
export type DispositionId = components["schemas"]["DispositionId"];
export type DispositionListData = components["schemas"]["DispositionListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDispositionRequestInput = NonNullable<operations["createDisposition"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDispositionsParams = NonNullable<operations["listDispositions"]["parameters"]["query"]>;
export type CreateDispositionParams = operations["createDisposition"]["parameters"]["path"];
export type UndoDispositionParams = operations["undoDisposition"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDispositionsResponse = operations["listDispositions"]["responses"]["200"]["content"]["application/json"];
export type CreateDispositionResponse = operations["createDisposition"]["responses"]["201"]["content"]["application/json"];
export type UndoDispositionResponse = operations["undoDisposition"]["responses"]["200"]["content"]["application/json"];


