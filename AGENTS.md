# Project Working Rules

## Startup

Before substantial changes:

1. Read `README.md`
2. Read `memory/project-overview.md`
3. Read `memory/decisions.md`
4. Read `notes/todo.md`

## Documentation Discipline

- Record important decisions in `memory/decisions.md`
- Keep `workspace.yaml` aligned with the real project status and entry points
- Put durable plans in `doc/`
- Put temporary work tracking in `notes/`
- When the user asks for a weekly report, update `notes/weekly-summary/YYYY-Www.md` using the project weekly template and only record real work from that week

## Code Structure

- Keep business logic modular
- Avoid large multi-purpose files when feature modules are clearer
- Keep configuration separate from runtime logic
- Keep generated outputs out of source directories

## Editing Boundaries

- Preserve stack-native layout when the framework expects it
- Add new top-level directories only with a clear reason
- Prefer updating existing docs over duplicating the same guidance in multiple places
