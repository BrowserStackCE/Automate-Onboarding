exports.config = {
  // ─── BrowserStack hub ────────────────────────────────────────────────────────
  user: process.env.BROWSERSTACK_USERNAME || '',
  key: process.env.BROWSERSTACK_ACCESS_KEY || '',

  // ─── Test files ──────────────────────────────────────────────────────────────
  specs: ['./tests/**/*.spec.js'],
  exclude: [],

  // ─── Parallel instances ──────────────────────────────────────────────────────
  maxInstances: 5,

  // ─── Common BrowserStack capabilities (merged into every capability) ─────────
  commonCapabilities: {
    'bstack:options': {
      debug: true,
      networkLogs: true,
      consoleLogs: 'info',
      interactiveDebugging: true,
    },
  },

  // ─── Per-platform capabilities ───────────────────────────────────────────────
  capabilities: [
    // ── Desktop ──
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      'bstack:options': { os: 'Windows', osVersion: '11' },
    },
    {
      browserName: 'edge',
      browserVersion: 'latest',
      'bstack:options': { os: 'Windows', osVersion: '10' },
    },
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      'bstack:options': { os: 'OS X', osVersion: 'Ventura' },
    },
    {
      browserName: 'firefox',
      browserVersion: 'latest',
      'bstack:options': { os: 'Windows', osVersion: '11' },
    },
    {
      browserName: 'safari',
      browserVersion: 'latest',
      'bstack:options': { os: 'OS X', osVersion: 'Sonoma' },
    },
    // ── Mobile Real Devices ──
    {
      browserName: 'safari',
      'bstack:options': { deviceName: 'iPhone 15', osVersion: '17' },
    },
    {
      browserName: 'chrome',
      'bstack:options': { deviceName: 'Samsung Galaxy S24', osVersion: '14.0' },
    },
    {
      browserName: 'chrome',
      'bstack:options': { deviceName: 'Google Pixel 8', osVersion: '14.0' },
    },
    {
      browserName: 'safari',
      'bstack:options': { deviceName: 'iPhone 14', osVersion: '16' },
    },
    {
      browserName: 'chrome',
      'bstack:options': { deviceName: 'Samsung Galaxy Tab S11', osVersion: '16.0' },
    },
  ],

  // ─── Framework ───────────────────────────────────────────────────────────────
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // ─── Services ────────────────────────────────────────────────────────────────
  services: [
    [
      'browserstack',
      {
        browserstackLocal: true,
        testObservability: true,
        testObservabilityOptions: {
          projectName: 'Automate_Onboarding',
          buildName: 'Onboarding_Build',
          buildTag: 'e2e'
        },
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21aa',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
        },
        selfHeal: true,
      },
    ],
  ],

  // ─── Reporters ───────────────────────────────────────────────────────────────
  reporters: ['spec'],
};

// Merge commonCapabilities into every capability's bstack:options
exports.config.capabilities.forEach((cap) => {
  const common = exports.config.commonCapabilities['bstack:options'] || {};
  cap['bstack:options'] = Object.assign({}, common, cap['bstack:options']);
});

