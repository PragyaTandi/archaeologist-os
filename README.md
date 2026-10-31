# Archaeologist OS

## Deploy on Render

This repository includes a Render Blueprint for a single Node web service. It builds the Vite frontend and serves it alongside the `/api` endpoints.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run `server/schema.sql`.
3. Push this repository to GitHub and create a Blueprint in Render using `render.yaml`.
4. When prompted, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project settings. Keep the service role key in Render only; never add it to a `VITE_` variable or frontend code. Render generates `SESSION_SECRET`.
5. Deploy and check `/api/health` on the Render service URL.

Case files are stored in Supabase and are separated by a signed, HTTP-only anonymous browser session cookie. The browser also keeps a local cache for offline fallback. This does not provide sign-in or cross-device account recovery; add authentication before treating the data as private user accounts.

## Local development

Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SESSION_SECRET` in the shell, then start `npm start` in one terminal and `npm run dev` in another. Vite proxies `/api` requests to the local Node server.

The Gemma assistant is still in mock mode. No AI provider credentials or model calls are implemented by this backend.