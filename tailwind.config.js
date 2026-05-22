/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './dist/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8a84b',
          light: '#8b6914',
          dim: 'rgba(200,168,75,0.12)'
        },
        compass: {
          bg: '#0f0f0f',
          surface: '#242424',
          text: '#e8e4da',
          muted: '#8a8680',
          subtle: '#9a9690'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)'
      },
      maxWidth: {
        prose: '600px',
        wide: '1100px'
      }
    }
  },
  plugins: []
};
