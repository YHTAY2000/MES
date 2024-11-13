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
    },
  },
  plugins: [
  ]
}

