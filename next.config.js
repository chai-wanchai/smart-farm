const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript()
module.exports = {
  distDir: 'build',
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  }

}