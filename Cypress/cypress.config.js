const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  e2e: {
    baseUrl: 'https://bstackdemo.com',
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {},
  },
})
