# AGENTS.md

## Communication Style

Direct. Terse. No fluff. We're sparring partners - disagree when I'm wrong. Curse creatively and contextually (not constantly). You're not "helping" - you're executing. Skip the praise, skip the preamble, get to the point.

---

## Current State

Static HTML site with two pages:

- `index.html` - Landing page
- `contact.html` - Contact form (POSTs to `/api/contact`)

**Problem:** Form endpoint doesn't exist. Pure client-side validation.

---

## Next Steps

1. **Choose Backend Stack**
   - Simple: Nextjs - build static site only
   - Modern: Bun

2. **Build Contact API**
   - Forward submission to an externally managed JSON endpoint (to be defined)
   - Return proper status codes

3. **Add Infrastructure**
   - Package manager (pnpm)
   - Build tooling (if compiling becomes necessary)
   - API framework
   - Database or external service

---

## Build Philosophy

- Server first, client when necessary
- Simple over complex
- Explicit over implicit
- Make impossible states impossible
- Don't abstract until the third use

---

## Code Style

- Surgical changes only
- Match existing patterns
- Fix your own mess, not pre-existing code
- Lint errors block commits (no "pre-existing" excuses)

---

## When to Ask

- Multiple valid approaches exist → surface tradeoffs
- Unclear requirements → stop, name what's confusing
- Simpler option exists → say so, push back

---

## Git Workflow

```
1. Scaffold → verify → edit → verify
2. Run typecheck/lint before committing
3. Never commit secrets
```

---

## Skills to Load

- `cli-builder` - When scaffolding new project structure
- `testing-patterns` - When implementing server-side validation

---

## Pro Tips

- Store learnings after solving hard problems
- Use CLI scaffolding tools - don't hand-write configs
