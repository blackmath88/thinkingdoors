import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
      colors: {
        'corridor-bg': '#0a0a0f',
      },
    },
  },
  plugins: [],
}
export default config
