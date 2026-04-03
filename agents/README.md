# Launchframe AI Agents

Universal system prompts for AI coding tools. Copy-paste into your tool of choice.

## Available agents

| Agent | File | Purpose |
|-------|------|---------|
| **Launchframe Agent** | [launchframe-agent.md](launchframe-agent.md) | Work inside a Launchframe-generated project — knows stack, architecture, workflows, rules |
| **SaaS Agent** | *separate repo (coming soon)* | Build a production SaaS from scratch through conversational flow |

## Usage

### Cursor

Add as a rule that always applies:

1. Copy the contents of `launchframe-agent.md`
2. Create `.cursor/rules/launchframe.mdc` in your project:

```yaml
---
description: Launchframe project assistant
alwaysApply: true
---
```

3. Paste the prompt content below the frontmatter

Or: paste into **Settings > Rules > User Rules** for it to apply across all projects.

### Claude Code

Add to your project root as `CLAUDE.md`:

```bash
cp agents/launchframe-agent.md CLAUDE.md
```

Claude Code reads `CLAUDE.md` automatically.

### Codex / OpenAI

Add to `AGENTS.md` in the project root (Launchframe already generates one — append or replace).

### GitHub Copilot

Copy into `.github/copilot-instructions.md`:

```bash
mkdir -p .github
cp agents/launchframe-agent.md .github/copilot-instructions.md
```

### Windsurf

Paste into **AI > Custom Instructions** in settings.

### ChatGPT / API

Use as the system message when starting a conversation about a Launchframe project.

### Any other tool

Paste wherever custom instructions or system prompts are configured.

## Tips

- The agent prompt is self-contained — no external files needed
- It complements (not replaces) the `AGENTS.md` that ships with every generated project
- For best results, also point the agent to `AGENTS.md` and `ARCHITECTURE.md` in the project root
- The prompt is ~200 lines / ~2500 tokens — fits comfortably in any context window
