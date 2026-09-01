# BrowserStack Automate — Cypress Onboarding

Run your Cypress tests on 3,000+ real browsers and devices in the BrowserStack cloud.

---

## Prerequisites

- **Node.js** v14 or later
- A **BrowserStack account** — [sign up free](https://www.browserstack.com/users/sign_up)
- Your **BrowserStack credentials** (Username and Access Key) from [Account Settings](https://www.browserstack.com/accounts/settings)

---

## Setup

### 1. Install dependencies

```bash
cd Cypress
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

Runs all tests across the platforms defined in `browserstack.json`:

```bash
npm run test:bstack
```

### Run locally

Runs tests directly in the local Electron browser (no BrowserStack account needed):

```bash
npm test
```

> **Note:** When running locally inside VS Code or any Electron-based environment, prefix the command with `env -u ELECTRON_RUN_AS_NODE` to prevent the host Electron process from interfering with Cypress:
> ```bash
> env -u ELECTRON_RUN_AS_NODE npx cypress run
> ```

---

## Configuration

### `browserstack.json`

Controls which browsers and devices your tests run on in the cloud.

Key settings:

| Setting | Description |
|---|---|
| `auth.username` / `auth.access_key` | Your BrowserStack credentials (use env vars — leave blank) |
| `browsers` | List of browsers/OS to test on |
| `run_settings.specs` | Glob pattern for test files to run |
| `run_settings.parallels` | Number of parallel sessions |
| `run_settings.build_name` | Label for this test run in the BrowserStack dashboard |
| `run_settings.project_name` | Groups builds under a project |
| `run_settings.cypress_version` | Cypress version to use on BrowserStack |
| `connection_settings.local` | Set `true` to test internal/localhost URLs via BrowserStack Local tunnel |

**Supported browsers for Cypress on BrowserStack:**

| Browser | `browser` value |
|---|---|
| Chrome | `chrome` |
| Firefox | `firefox` |
| Edge | `edge` |
| WebKit (experimental) | `webkit` |

> ⚠️ WebKit support requires `experimentalWebKitSupport: true` in `cypress.config.js`.

### `cypress.config.js`

Standard Cypress configuration. Key settings:

| Setting | Description |
|---|---|
| `baseUrl` | The URL your tests navigate to |
| `defaultCommandTimeout` | How long Cypress retries commands (ms) |
| `pageLoadTimeout` | How long to wait for page load events (ms) |
| `experimentalWebKitSupport` | Enables WebKit browser support |

---

## Project Structure

```
Cypress/
├── cypress/
│   ├── e2e/                          # Test specs
│   │   └── e2e-login-add-transaction.cy.js
│   └── support/
│       └── e2e.js                    # Support file (global config/commands)
├── browserstack.json                 # BrowserStack platform & build config
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Scripts and dependencies
└── README.md                         # This file
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
| `bad option: --no-sandbox` | Run with `env -u ELECTRON_RUN_AS_NODE` prefix (VS Code / Electron environment sets this var) |
| `BROWSERSTACK_USERNAME is not set` | Set `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` env vars |
| `Your project has set supportFile` | Ensure `cypress/support/e2e.js` exists |
| Page load timeout on bstackdemo.com | Increase `pageLoadTimeout` in `cypress.config.js` or use `cy.visit('/', { timeout: 120000 })` |
| Tests time out on internal URLs | Set `"local": true` in `browserstack.json` and start BrowserStack Local |
| WebKit SSL error | Ensure `experimentalWebKitSupport: true` is set in `cypress.config.js` |

---

## Useful Links

- [BrowserStack Cypress docs](https://www.browserstack.com/docs/automate/cypress)
- [Supported browsers & devices](https://www.browserstack.com/list-of-browsers-and-platforms/automate)
- [Cypress WebKit support](https://www.browserstack.com/docs/automate/cypress/browsers-and-os#using-webkit-experimental)
- [BrowserStack Local (tunnel)](https://www.browserstack.com/local-testing)
- [Test Observability](https://www.browserstack.com/docs/test-observability)
