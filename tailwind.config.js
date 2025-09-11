/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* subtle-border */
        input: 'var(--color-input)', /* subtle-gray */
        ring: 'var(--color-ring)', /* deep-academic-blue */
        background: 'var(--color-background)', /* near-white */
        foreground: 'var(--color-foreground)', /* rich-charcoal */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep-academic-blue */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* warm-amber */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* sophisticated-purple */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear-red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* forest-green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* warm-amber */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear-red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* subtle-gray */
          foreground: 'var(--color-muted-foreground)', /* medium-gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* near-white */
          foreground: 'var(--color-card-foreground)', /* rich-charcoal */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* near-white */
          foreground: 'var(--color-popover-foreground)', /* rich-charcoal */
        },
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        'ceremonial': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'ceremonial-lg': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'ceremonial-xl': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'expand': 'expand 300ms ease-out',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'expand': {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: 'auto', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'ceremonial': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}