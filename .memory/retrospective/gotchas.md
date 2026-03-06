# Retrospective: Gotchas and Pitfalls

## Implementation Cycle: GitHub Workflow Configuration (Story 2)

### Misaligned Story Numbering
- **Issue**: Story ID in system was "2" but PROGRESS.md showed different story numbers
- **Root Cause**: Multiple story tracking systems or renumbering over time
- **Impact**: Potential confusion when cross-referencing documentation
- **Mitigation**: Always verify story context from task description, not just ID number
- **Learning**: Use story title and description as primary identifiers, not just numbers

### Test Command Context Mismatch
- **Issue**: Task specified TEST_CMD as `uv run pytest` but project uses pnpm/Vitest
- **Root Cause**: Task template assumed Python/uv toolchain, but actual project is Node.js
- **Impact**: Test command would fail if executed without adaptation
- **Learning**: Always verify build/test commands match actual project stack before execution
- **Pattern**: Check package.json and existing test configuration first

### Typecheck Scope Confusion
- **Issue**: AC4 specified "Typecheck passes" for GitHub Actions YAML workflow
- **Root Cause**: TypeScript-focused AC template applied to non-TypeScript artifact
- **Impact**: Wasted effort if attempting to run typecheck on YAML files
- **Resolution**: Recognized YAML doesn't require typecheck, documented as N/A
- **Learning**: Question acceptance criteria that don't match artifact type; escalate or document reasoning

### Branch Name vs. Git Ref
- **Issue**: Workflow condition uses `github.ref == 'refs/heads/main'` not just branch name
- **Gotcha**: GitHub Actions `github.ref` includes full ref path (`refs/heads/`)
- **Impact**: Incorrect condition if using just `main` or `develop` without prefix
- **Example**: `if: github.ref == 'main'` would never match (incorrect)
- **Correct**: `if: github.ref == 'refs/heads/main'` (correct)
- **Learning**: Always check GitHub Actions context variables format in documentation

### "Skip Tests" Ambiguity
- **Issue**: Task said "Skip tests and don't worry" - could mean:
  1. Don't run tests for this story's implementation
  2. Remove/skip test step in workflow
- **Resolution**: Task clarification indicated option 2 (remove workflow test step)
- **Learning**: Ambiguous requirements should be clarified before implementation
- **Pattern**: When user says "I know what I'm doing", verify understanding of specific changes needed

### No-Op Implementation Documentation
- **Issue**: When no changes are needed, there's temptation to skip documentation
- **Risk**: Future developers might duplicate work or not understand current state
- **Mitigation**: Still document analysis, verification, and conclusion
- **Learning**: "No changes needed" is itself a valid implementation result requiring documentation
- **Best Practice**: Update PROGRESS.md even when no code changes are made

## Key Takeaway
**Context matters more than templates** - Task templates and acceptance criteria may not match actual project stack or requirements. Always verify toolchain (Python/uv vs Node.js/pnpm), artifact types (TypeScript vs YAML), and requirement specificity before executing implementation steps.
