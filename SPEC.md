# BellySafe — Feature Spec

## What it is

BellySafe is a mobile screen where a pregnant user types in the name of a food or medication and gets an AI-assessed safety verdict with reasoning. Demo scope of ProMom's production BellySafe feature.

## User flow

1. User opens the app, lands on the BellySafe screen.
2. User types a query into a single text input. Examples: "soft cheese", "ibuprofen 200mg", "sushi", "acetaminophen".
3. User taps a "Check" button.
4. Mobile hits POST /check on the backend with { query: string }.
5. Backend calls Claude with a structured-output prompt.
6. Backend returns { verdict, reasoning, disclaimer } to mobile.
7. Mobile renders a verdict card.

## Verdict structure

Backend returns a strictly-typed JSON object:

    {
      "verdict": "safe" | "caution" | "avoid",
      "reasoning": [ "short bullet", "short bullet" ],
      "disclaimer": "single sentence disclaimer"
    }

- verdict drives the card color: safe → green, caution → amber, avoid → red.
- reasoning is 2-4 bullets, each under 20 words.
- disclaimer is a one-sentence reminder to consult a healthcare provider.

## UI requirements

- Single screen. No navigation, no tabs.
- Title: "BellySafe"
- Subtitle: "Check if something is safe during pregnancy"
- Text input with placeholder "e.g. soft cheese, ibuprofen"
- Submit button labeled "Check"
- Loading state during API call (spinner + "Checking..." text, disabled input and button)
- Verdict card below the input, rendered only after a response arrives:
  - Large colored verdict badge (SAFE / CAUTION / AVOID)
  - List of reasoning bullets
  - Disclaimer in smaller text
- Error state if API call fails (plain text error + retry button)
- Keyboard dismisses on submit
- Works on the Pixel 8 emulator at default size

## Out of scope

Auth, check history, saved favorites, offline mode, iOS-specific polish, real medical accuracy (disclaimer carries this).

## Backend contract

- POST /check
- Request: { "query": string } (1-200 chars)
- Response: the verdict structure above
- Error response: { "error": string } with 4xx or 5xx status
- Backend validates query length, calls Claude, parses JSON, returns it.

## Environment

- Backend runs at http://localhost:3000 in dev.
- Mobile on Android emulator reaches backend at http://10.0.2.2:3000 (Android emulator's host alias).
- Backend reads ANTHROPIC_API_KEY from backend/.env.
- Claude model: use the current Sonnet model at build time — verify via Anthropic docs when wiring the backend, do not hardcode from memory.

## Demo script preview

3-minute demo flow this spec supports:
1. "soft cheese" → avoid verdict with listeria reasoning
2. "acetaminophen" → safe verdict with dosage caveat
3. "ibuprofen" → avoid verdict with trimester reasoning

Three queries, three colors, ~15 seconds per verdict.
