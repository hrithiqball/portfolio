## Purpose

This file provides concise, actionable guidelines for automated agents and contributors editing this repository. Follow these rules when making edits, running checks, or creating new files.

## General Principles

- Keep changes minimal and focused. Prefer the smallest edit that fixes the issue.
- Preserve existing style and conventions used in the repository.
- When in doubt, prefer readability and safety over clever shortcuts.

## Code Style and Edits

- Do not add useless comments or commented-out code. Code should be self-explanatory where possible.
- Match the project's indentation, naming, and export patterns. If the repo uses TypeScript/React conventions, follow them.
- When adding new functions or components, include a short JSDoc/type comment only if it clarifies non-obvious behavior.

## Making Changes (apply_patch rules)

- Use the repository's patch tool (or follow the project's contribution workflow) to make edits.
- Make the smallest coherent change per commit. Group related edits together, but avoid large unrelated refactors in a single commit.
- Keep changes to a single file when possible; if multiple files must change, explain the reason in the commit message.

## Error Handling and Robustness

- Validate external inputs and network responses. Don't assume responses are valid JSON—check status and content-type before parsing.
- Fail gracefully: log helpful errors and return safe defaults where appropriate.

## Secrets and Environment

- Never hard-code secrets (API keys, tokens, private credentials) in the repo.
- Use environment variables for secrets and configuration. Validate presence and provide clear errors when required values are missing.

## Tests and Verification

- Add or update tests for new behavior when feasible. At minimum, run the project's typecheck/build after edits.
- For UI changes, include a quick manual verification note if automated tests aren't practical.

## Commits and Messages

- Write clear, imperative commit messages (e.g., "Fix X by doing Y").
- Keep each commit scoped to a single change/issue. Mention related issue IDs or context when applicable.

## Logging and Console Output

- Prefer structured, informative logs for server-side code. Avoid noisy or overly verbose console output in production code.

## Accessibility and Performance

- Follow accessibility best-practices for UI changes (semantic HTML, alt text, keyboard focus, color contrast).
- Be mindful of performance: avoid heavy blocking operations in the request path and cache where appropriate.

## Security

- Sanitize and validate any user-provided content before rendering or sending it to other services.
- Limit what external services can do: validate responses and handle unexpected content safely.

## Behavior & Etiquette for Automated Agents

- Do not exfiltrate secrets or make external network calls unless explicitly required and approved.
- When you propose code changes, ensure they are runnable and tested locally where possible.
- Be concise and actionable in commit messages and PR descriptions. Explain what changed, why, and how it was verified.

## Quick Checklist (before finishing an edit)

1. Is the change minimal and scoped?
2. Did you run typecheck/build/tests where applicable?
3. Are environment variables and secrets handled safely?
4. Is error handling robust for external calls?
5. Did you provide a clear commit message explaining the change?

## Contact

If you need clarification about repository conventions, open an issue or contact the repository owner.

---

Do not add any useless comments.
