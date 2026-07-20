This repo is a metadata‑first content architecture prototype: JSON Schema definitions, example content, and a lightweight validation script demonstrating how structured metadata can drive automated ingestion, normalization, and human curation. It’s intended for designers/engineers exploring reproducible, schema‑driven content workflows.

### Stack
Languages: CSS, HTML, JavaScript
Runtime: Static content + Node.js utility scripts
Key tooling: JSON Schema for validation; Node‑based validator (validate-metadata.js); package.json for script orchestration

### How it’s organized
Code
README.md                        — overview, rationale, run instructions  
package.json                     — project manifest / npm scripts  
validate-metadata.js             — Node validator for schema/content checks  
schemas/                         — JSON Schemas (asset-core, textual-ext, component-ext)  
content/
  components/                    — example component markdown  
  seeds/                         — example seed content (chamber-panel, pulse-node, thread-link)  
  texts/                         — example textual content (vijnana-bhairava.md)  
docs/
  github_lifecycle_integrations.svg  — architecture/integration diagram  
  teaching/                      — placeholder notes  
scripts/                         — helper scripts  
.github/
  workflows/                     — CI folder (currently empty)

#### How it fits together:
Schemas define canonical content types and validation rules.
Example content shows how real assets should be authored and structured.
validate-metadata.js applies schemas to content and demonstrates the author → validate → ingest workflow.
Docs provide lifecycle framing and integration concepts.

# Next Steps:
**Schema governance & versioning**: Add version fields, compatibility rules, and a changelog for schema evolution.
**CI + automated validation**: Add a GitHub Actions workflow to run npm ci && npm run validate on PRs.
**Ingestion adapters**: Provide small examples (CLI or HTTP) showing how validated content flows into a downstream system.
**Richer examples & tests**:  Expand seeds, add edge‑case examples, and introduce unit tests for the validator.
**Provenance & identity**: Add canonical IDs, provenance fields, and stable identifiers to schemas.
**Packaging & distribution**: Consider a small npm package or Dockerfile to make the validator portable.
**Contributor onboarding**: Add guides for “how to add a schema” and “how to add a content type,” plus lifecycle notes.
