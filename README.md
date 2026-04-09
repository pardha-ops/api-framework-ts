# api-framework-ts

Production-grade API test framework built with TypeScript and Playwright APIRequestContext.

## Architecture

src/
├── client/ # HttpClient - base HTTP wrapper
├── builder/ # RequestBuilder - chainable request construction
├── validator/ # ResponseValidator - assertions and schema validation
├── schemas/ # Zod schemas - one file per resource type
└── utils/ # Shared utilities (retry, poll, factories)
tests/
├── happy/ # Happy path scenarios
├── negative/ # Error and rejection scenarios
├── boundary/ # Edge cases and limits
└── auth/ # Authentication and RBAC scenarios

## API Under Test

Restful Booker: https://restful-booker.herokuapp.com

## Setup

```bash
npm install
cp .env.example .env
```

## Run Tests

```bash
npm test                  # full suite
npm run test:smoke        # smoke tests only
npm run report            # generate and open Allure report
```

## Stack

- TypeScript 5.x
- Playwright APIRequestContext
- Zod schema validation
- Allure reporting
