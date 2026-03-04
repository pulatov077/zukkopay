
export default defineNuxtConfig({
  // Nuxt modullari
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'

  ],
  supabase: {
    redirect: false // Hozircha login qilmasdan ham sahifalarni ko'rishimiz uchun
  },

  // Loyiha moslashuvchanlik sanasi
  compatibilityDate: '2025-07-15',

  // Ishlab chiqish vositalari
  devtools: { enabled: false },

})