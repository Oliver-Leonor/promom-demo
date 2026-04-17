# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Repository is a fresh scaffold — only README and .gitignore exist. No source code, package manifests, or build tooling are present yet.

## Intended stack

Per README: React Native (Expo) client + NestJS server.

## To fill in once code lands

- **Commands**: install, dev server (Expo + Nest), build, test (including single-test invocation), lint, typecheck.
- **Workspace layout**: monorepo vs. split repos, package manager, how client and server are wired together.
- **Architecture**: client ↔ server boundary, auth model, data layer, shared types, env-var conventions.

Update this file as soon as the first working commands exist — don't let future Claude instances guess.
