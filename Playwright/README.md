# BrowserStack Automate — Playwright Onboarding

Run your Playwright tests on 3,000+ real browsers and devices in the BrowserStack cloud.

---

## Prerequisites

- **Node.js** v14 or later
- A **BrowserStack account** — [sign up free](https://www.browserstack.com/users/sign_up)
- Your **BrowserStack credentials** (Username and Access Key) from [Account Settings](https://www.browserstack.com/accounts/settings)

---

## Setup

### 1. Install dependencies

```bash
cd Playwright
npm install
```

### 2. Set your BrowserStack credentials

Export them as environment variables (recommended — keeps secrets out of source control):

**macOS / Linux:**
```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

**Windows (cmd):**
```cmd
set BROWSERSTACK_USERNAME=your_username
set BROWSERSTACK_ACCESS_KEY=your_access_key
```

**Windows (PowerShell):**
```powershell
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
```

> Find your credentials at: https://www.browserstack.com/accounts/settings

---

## Running Tests

### Run on BrowserStack Automate (cloud)

Runs all tests across the platforms defined in `browserstack.yml`:

```bash
npm test
```

### Run locally (BrowserStack SDK, Automate disabled)

Uses the BrowserStack SDK but routes tests to your local browser instead of the cloud.
Test Observability (reporting) still works. Works on macOS, Linux, and Windows:

```bash
npm run test:local
```

This uses `cross-env` to set `BROWSERSTACK_AUTOMATION=false` cross-platform, so the SDK
skips the remote grid and runs tests locally via Playwright.

---

## Configuration

### `browserstack.yml`

Controls which browsers and devices your tests run on in the cloud.

Key settings:

| Setting | Description |
|---|---|
| `userName` / `accessKey` | Your BrowserStack credentials (use env vars) |
| `platforms` | List of browsers/OS/devices to test on |
| `parallelsPerPlatform` | Number of parallel sessions per platform |
| `buildName` | Label for this test run in the BrowserStack dashboard |
| `projectName` | Groups builds under a project |
| `testObservability` | Enables Test Reporting & Analytics |
| `browserstackLocal` | Set `true` to test internal/localhost URLs via BrowserStack Local tunnel |

**Supported browser names for Playwright:**

| Browser | `browserName` value |
|---|---|
| Chrome | `chrome` |
| Edge | `edge` |
| Firefox | `playwright-firefox` |
| WebKit/Safari | `playwright-webkit` |

> ⚠️ For Playwright, Firefox must be `playwright-firefox` (not `firefox`).

### `playwright.config.ts`

Standard Playwright configuration. The BrowserStack SDK patches this at runtime to route
tests to the cloud — no changes needed for basic usage.

---

## Project Structure

```
Playwright/
├── tests/                        # Test specs
│   └── e2e-login-add-transaction.spec.ts
├── browserstack.yml              # BrowserStack platform & build config
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Scripts and dependencies
└── README.md                     # This file
```

---

## Viewing Results

After a run, open the BrowserStack dashboards:

- **Automate dashboard**: https://automate.browserstack.com
- **Test Reporting & Analytics**: https://automation.browserstack.com

Each build shows session videos, logs, screenshots, and network traces per platform.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `Invalid 'browser'. Use 'playwright-firefox'` | Change `browserName: firefox` → `browserName: playwright-firefox` in `browserstack.yml` |
| `BROWSERSTACK_USERNAME is not set` | Set `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` env vars |
| Tests time out on internal URLs | Set `browserstackLocal: true` in `browserstack.yml` and start BrowserStack Local |
| `browserstack-node-sdk` not found | Run `npm install` in the `Playwright/` directory |
| `cross-env` not found | Run `npm install` — it is listed as a dev dependency |

---

## Useful Links

- [BrowserStack Playwright docs](https://www.browserstack.com/docs/automate/playwright)
- [Supported browsers & devices](https://www.browserstack.com/list-of-browsers-and-platforms/automate)
- [BrowserStack Local (tunnel)](https://www.browserstack.com/local-testing)
- [Test Observability](https://www.browserstack.com/docs/test-observability)
