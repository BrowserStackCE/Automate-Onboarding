# WebdriverIO + BrowserStack Automate — Onboarding Demo

End-to-end test for **Finstack** (login → add expense transaction) using **WebdriverIO v9** with **`@wdio/browserstack-service`**, in this repo.

---

## Prerequisites

| | Windows | macOS |
|---|---|---|
| Node.js | ≥ 18 — [nodejs.org](https://nodejs.org) | ≥ 18 — `brew install node` or [nodejs.org](https://nodejs.org) |
| npm | Bundled with Node.js | Bundled with Node.js |
| Chrome | For local runs | For local runs |

---

## Setup

### macOS

```bash
cd path/to/Automate-Onboarding/WebdriverIO
npm install
```

### Windows

```powershell
cd path\to\Automate-Onboarding\WebdriverIO
npm install
```

---

## Run locally (Chrome on your machine)

### macOS

```bash
npm run test:local
```

### Windows (PowerShell)

```powershell
npm run test:local
```

Uses `wdio.local.conf.js` — connects directly to local Chrome, no BrowserStack credentials needed.

---

## Run on BrowserStack Automate (10 platforms)

### macOS

```bash
export BROWSERSTACK_USERNAME=<your-username>
export BROWSERSTACK_ACCESS_KEY=<your-access-key>
npm test
```

Or inline:

```bash
BROWSERSTACK_USERNAME=<your-username> BROWSERSTACK_ACCESS_KEY=<your-access-key> npm test
```

### Windows (PowerShell)

```powershell
$env:BROWSERSTACK_USERNAME="<your-username>"
$env:BROWSERSTACK_ACCESS_KEY="<your-access-key>"
npm test
```

### Windows (Command Prompt)

```cmd
set BROWSERSTACK_USERNAME=<your-username>
set BROWSERSTACK_ACCESS_KEY=<your-access-key>
npm test
```

> Credentials are at [automate.browserstack.com](https://automate.browserstack.com) → **Account → Settings**.

---

## npm scripts

| Script | Config | Where it runs |
|---|---|---|
| `npm run test:local` | `wdio.local.conf.js` | Local Chrome |
| `npm test` | `wdio.conf.js` | BrowserStack (10 platforms) |

---

## Platform matrix (BrowserStack)

| # | Platform | Browser |
|---|---|---|
| 1 | Windows 11 | Chrome (latest) |
| 2 | Windows 10 | Edge (latest) |
| 3 | Windows 11 | Firefox (latest) |
| 4 | macOS Ventura | Chrome (latest) |
| 5 | macOS Sonoma | Safari (latest) |
| 6 | iPhone 15 (iOS 17) | Safari |
| 7 | iPhone 14 (iOS 16) | Safari |
| 8 | Samsung Galaxy S24 (Android 14) | Chrome |
| 9 | Google Pixel 8 (Android 14) | Chrome |
| 10 | Samsung Galaxy Tab S11 (Android 16) | Chrome |

---

## Project structure

```
WebdriverIO/
├── tests/
│   └── e2e-login-add-transaction.spec.js   # E2E test spec
├── wdio.conf.js                             # BrowserStack config + capabilities
├── wdio.local.conf.js                       # Local Chrome config
├── package.json
└── README.md
```

---

## Test scenario

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to `/login` | Sign-in button visible |
| 2–3 | Enter email + password | Fields populated |
| 4 | Click Sign In | Redirected to `/dashboard`, greeting visible |
| 5 | Click Add Transaction | Modal dialog opens |
| 6–7 | Enter amount `150.00` + description `Grocery Shopping` | Fields populated |
| 8–9 | Select Category → Food & Dining | Option selected |
| 10–11 | Select Account → Main Checking | Option selected |
| 12 | Submit transaction | — |
| 13 | Verify modal closes | Dashboard greeting still visible |
