/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,vue}', // adjust paths to your project structure
    'node_modules/flowbite/**/*.js',

  ],
  theme: {
    extend: {
      screens: {
        'lg': '1024px',
      },
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutToLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 0.5s ease-out forwards',
        slideOutToLeft: 'slideOutToLeft 0.5s ease-in forwards',
      },
    },
  },
  plugins: [
  ]
}

