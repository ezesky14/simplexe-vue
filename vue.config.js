module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simplexe-vue/'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false
    }
  }
}
