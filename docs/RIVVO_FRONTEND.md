# Rivvo Frontend

## Setup

1. Install dependencies: `pnpm install`
2. Create `.env.local` (optional) and set `VITE_API_BASE` to your API URL.
3. Run dev server: `pnpm dev`
4. Build: `pnpm build`

## Notes

- Axios instance at `src/services/api.ts` attaches `rivvo:token` automatically.
- Auth state is persisted in localStorage via `src/store/useAuth.ts`.
- Basic UI components live under `src/components/ui`.
- Stores are in `src/store` (Zustand).

## Next steps / TODOs

- Add Recharts usage in `src/pages/Insights.tsx`.
- Implement filters, pagination and exports in History page.
- Add accessibility tests and unit tests.
