export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'quran',
    htmlAttrs: {
      lang: 'ar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { "http-equiv": 'Content-Type', content: 'text/html;charset=UTF-8' },
      { "http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests" },

      // https://tanzil.net/res/text/metadata/quran-data.js
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/select2@4.0.3/dist/css/select2.min.css' }
    ],
    script: [
      {
        src:
          'https://unpkg.com/jquery@3.1.1/dist/jquery.js'
      },
      {
        src:
          'https://unpkg.com/select2@4.0.3/dist/js/select2.js'
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/filters.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'lodash',
  ],
  bootstrapVue: {
    icons: true
  },

  axios: {
    // proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
