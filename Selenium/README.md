# Selenium pytest — BrowserStack Automate

Equivalent of the Playwright `e2e-login-add-transaction` spec, ported to **Selenium 4 + pytest** and wired to **BrowserStack Automate** via the BrowserStack SDK.

## Prerequisites

- Python 3.9+
- Google Chrome (for local runs)

## Setup

**macOS / Linux:**
```bash
cd Selenium
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Windows (PowerShell):**
```powershell
cd Selenium
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run locally

Uses `browserstack-sdk pytest` with `BROWSERSTACK_AUTOMATION=false` — the SDK still reports results to Test Observability but runs Chrome locally without spinning up cloud browsers.

**macOS / Linux:**
```bash
source .venv/bin/activate
export BROWSERSTACK_USERNAME=<your_username>
export BROWSERSTACK_ACCESS_KEY=<your_access_key>
export BROWSERSTACK_AUTOMATION=false
browserstack-sdk pytest tests/ -v
```

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
$env:BROWSERSTACK_USERNAME="<your_username>"
$env:BROWSERSTACK_ACCESS_KEY="<your_access_key>"
$env:BROWSERSTACK_AUTOMATION="false"
browserstack-sdk pytest tests/ -v
```

## Run on BrowserStack

Set `BROWSERSTACK_AUTOMATION=true` so the BrowserStack SDK intercepts the `webdriver.Chrome()` call and redirects it to the BrowserStack hub.

**macOS / Linux:**
```bash
source .venv/bin/activate
export BROWSERSTACK_USERNAME=<your_username>
export BROWSERSTACK_ACCESS_KEY=<your_access_key>
export BROWSERSTACK_AUTOMATION=true
browserstack-sdk pytest tests/ -v
```

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
$env:BROWSERSTACK_USERNAME="<your_username>"
$env:BROWSERSTACK_ACCESS_KEY="<your_access_key>"
$env:BROWSERSTACK_AUTOMATION="true"
browserstack-sdk pytest tests/ -v
```

Credentials are read from environment variables. `BROWSERSTACK_AUTOMATION=true` routes the WebDriver to the BrowserStack hub; `BROWSERSTACK_AUTOMATION=false` keeps it local while still reporting to Test Observability.
