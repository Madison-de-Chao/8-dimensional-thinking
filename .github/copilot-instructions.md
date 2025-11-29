# Copilot Instructions

## Architecture & Flow
- `client/src/App.tsx` is the single source of truth; it drives onboarding→daily tasks→journal/insight views and persists `cycle`, `entries`, `insight` into `localStorage` keys `maskoff_cycle`, `maskoff_entries`, `maskoff_insight`.
- Mood presets in `client/src/constants.ts` define color tokens consumed across components; pick from `MoodColor` enum and pass theme objects rather than ad-hoc Tailwind classes.
- Daily steps live in `DAILY_TASKS`; extending the journey requires updating this array plus the matching switch in `DailyCard` so validation (`isComplete`) and AI prompts stay aligned.
- `client/src/components/DailyCard.tsx` enforces the “get AI feedback before saving” flow: submissions call `getDailyAIFeedback` first, then users confirm via `onComplete`—respect this delay when altering UX.
- `JournalView` and `InsightsView` read from the same `entries` array; never mutate entries in-place, always create new arrays so React state triggers rerenders.
- `client/src/components/RadarChart.tsx` wraps Recharts; pass `Insight.radar` shape (0–100 scores) only and let the component handle labeling/legend.

## AI & Data
- `client/src/services/geminiService.ts` centralizes Gemini access; always obtain the API key via `process.env.API_KEY` or `import.meta.env.VITE_GEMINI_API_KEY` and avoid hard-coding.
- `getDailyAIFeedback` expects a single string per day, so aggregate structured fields before calling it; see `DailyCard`’s `feedbackInput = Object.values(input).join(' ')`.
- `generateWeeklyInsight` assumes seven entries in chronological order and returns fallback copy on failure; handle JSON parsing errors rather than propagating raw Gemini responses.
- Insight radar labels match the five-dimension schema in `types.ts`; if you change field names update both the `RadarData` type and chart ticks.

## Styling & UI
- Tailwind v4 is configured globally in `client/src/index.css`; use the defined CSS variables (`--background`, `--color-chart-*`) and `@theme` tokens instead of inventing new hex codes.
- `ThemeProvider` in `client/src/contexts/ThemeContext.tsx` syncs a `dark` class when `switchable` is true; wrap new routes/components with it rather than toggling `document.documentElement` yourself.
- Reuse shadcn-based primitives under `client/src/components/ui` plus the `cn` helper from `client/src/lib/utils.ts` to keep class merging predictable.
- `useComposition` + `usePersistFn` guard IME typing; keep them in mind when introducing keyboard shortcuts or textareas so Enter/Escape behavior remains consistent on Safari.

## Build & Tooling
- Workspace uses pnpm; run `pnpm install` once, then `pnpm dev` (Vite dev server on :3000) or `pnpm preview` for a production build preview.
- `pnpm build` does two steps: Vite outputs to `dist/public`, then esbuild bundles `server/index.ts` (currently a stub) into `dist/index.js` for hosting compatibility—do not delete the server folder even if “unused”.
- Static type safety relies on `pnpm check`; there is no automated test suite yet, so manual QA plus type checks are the default gate.
- Format with `pnpm format` (Prettier) before committing; Tailwind class ordering is handled via `tailwind-merge` inside `cn`.

## Project Conventions
- Keep all source imports relative to the configured aliases (`@` for `client/src`, `@shared`, `@assets`) as defined in `vite.config.ts`.
- Avoid adding new persistence keys unless necessary; if you do, namespace them with `maskoff_` to stay aligned with existing storage cleanup logic.
- `BottomNav` assumes a finite `View` union from `types.ts`; extend the union and nav buttons together to prevent orphaned views.
- When integrating new APIs, slot them beside Gemini inside `client/src/services` and expose small async helpers so UI layers stay declarative.
- Respect the localized tone (Traditional Chinese) for copy surfaced to users; English is reserved for developer-only strings like console errors.
- Clear `localStorage` (or expose a settings control) before testing onboarding changes; stale `cycle` data auto-loads and skips the onboarding flow.
