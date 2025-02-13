# Playwright UI framework
 UI test framework  on Playwright framework

## Requirements
- Node v22

## Project structure
### Folder structure
1. `tests` - folder that contains fixtures and tests. Root file `base.fixture.ts` contains base fixtures and expects to be used across the tests. Each subfolder represent the part of the application this subfloder is testing.
2. `pages` - all interactions with the application and are encapsulated in the Page Objects under this folder
3. `utils` -  folder that contains all the utils, types and links.
4. `Examples of test documentation` -  folder contains sample test documentation 

## Installation
Make sure you have the correct node version.
```sh
node -v
```

## Building Service
### Prepare service
1. Go to root project folder
2. Install Playwright: 
```sh
npm init playwright@latest
```

## Project configuration
1. Playwright Configuration: See `playwright.config.ts` for global settings such as test directory, timeout.

## Test execution
1. To execute tests, run `npx playwright test` 
2. If you need to debug your tests, use [link](https://playwright.dev/docs/test-cli)


If you want to see the test report:
```
$ npx playwright show-report
```

## Other commands
### Run linter
- Run linter `npm run lint`
- Run linter and try to fix all lint errors `npm run lint-fix`