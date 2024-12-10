import VueInspector from 'vite-plugin-vue-inspector';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },

  plugins: ['~/plugins/firebase.js'],
})