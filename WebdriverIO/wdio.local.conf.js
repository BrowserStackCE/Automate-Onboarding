const { config: bstackConfig } = require('./wdio.conf.js');

exports.config = {
  ...bstackConfig,

  // ─── Override: run locally against Chrome ────────────────────────────────────
  user: undefined,
  key: undefined,
  hostname: undefined,

  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
    },
  ],

  // Local runs use no BrowserStack service — TRA reporting is via Automate runs only.
  services: [],
};
