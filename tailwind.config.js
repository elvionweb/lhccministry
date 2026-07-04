// tailwind.config.js
import { defineConfig } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',     // Calm Blue
        secondary: '#FFC857',   // Warm Gold
        accent: '#1ABC9C',      // Teal
        darktext: '#333333',    // Dark Gray
        lighttext: '#7D7D7D',   // Light Gray
        bgsoft: '#F5F5F5',      // Soft background
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        quote: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    lineClamp, // enables line-clamp for truncating text
  ],
})
