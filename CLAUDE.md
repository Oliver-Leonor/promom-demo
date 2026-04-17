# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace layout

Monorepo with two independent npm projects as siblings. No workspaces, no lerna, no shared package — each project has its own `package.json` and `node_modules/`.

- `mobile/` — Expo React Native app (TypeScript, blank template)
- `backend/` — NestJS app (TypeScript, default scaffold)

## Commands

Mobile (`cd mobile`):
- `npx expo start` — dev server (Metro; scan QR with Expo Go, or press `i` / `a`)
- `npx expo run:android` — build and run on a connected Android device/emulator

Backend (`cd backend`):
- `npm run start:dev` — Nest dev server with watch mode

## Architecture

- Mobile calls backend via REST over HTTP.
- Backend proxies requests to the Claude API (Anthropic SDK); the API key never leaves the server.
- No shared types package yet — if a contract grows, duplicate types on both sides or add a `shared/` package later.

## Env vars

- `backend/.env` holds `ANTHROPIC_API_KEY`. `.env` is gitignored at the repo root.
- Mobile does not need any env vars for now; it will hit the backend at a hardcoded dev URL.
