import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          50:  '#fdf6f0',
          100: '#fae8d8',
          200: '#f5ceaf',
          300: '#eda97b',
          400: '#e08048',
          500: '#B87333',
          600: '#9e5e24',
          700: '#7d4a1e',
          800: '#663c1c',
          900: '#54321a',
        },
        brand: {
          black: '#0d0d0d',
          brown: '#1a0f07',
          beige: '#f5f0e8',
          darkbeige: '#e8dece',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'copper-gradient': 'linear-gradient(135deg, #B87333 0%, #d4944a 30%, #e8a862 60%, #B87333 100%)',
        'copper-radial': 'radial-gradient(ellipse at center, #d4944a 0%, #B87333 50%, #8a5520 100%)',
        'dark-texture': 'linear-gradient(180deg, #0d0d0d 0%, #1a0f07 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184, 115, 51, 0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(184, 115, 51, 0.8), 0 0 100px rgba(184, 115, 51, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
