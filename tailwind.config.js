/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // Kelajakda Zukkopay uchun maxsus ranglar kerak bo'lsa, shu yerga qo'shamiz
    },
  },
  plugins: [],
}