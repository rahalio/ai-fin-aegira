# Aegira

Fraud-operations workbench: champion/challenger scoring, investigator cases, and false-positive cost.

See [PRODUCT.md](PRODUCT.md), [WEBAPP.md](WEBAPP.md), [USER_STORIES.md](USER_STORIES.md).

Package scope: **`@aegira/*`**. OpenAPI lives in `packages/openapi-core/src/` (one YAML per domain). Root `openapi.yaml` is a pointer only.

## Quick start

```bash
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: aegira_demo_local_dev_key
```

`.codegen/` is local-only — never commit or push it (see `.gitignore` and `.cursor/rules/no-codegen-in-git.mdc`).
