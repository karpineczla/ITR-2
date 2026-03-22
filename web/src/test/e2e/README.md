## run these things:

npx playwright install chromium

npx playwright codegen https://www.sanity.io/manage/project/a9qy1267/members --save-storage=.auth/sanity-manage.json

2. After login completes and members page loads, close the codegen browser.

## Required env vars

Set these before running tests:

- `SANITY_PROJECT_ID` (defaults to `a9qy1267`)
- `SANITY_MANAGE_STORAGE_STATE` (path to saved storage state JSON)

## Example to run GF-002 only

npm run test:e2e:gf002

## Run all e2e tests

npm run test:e2e
