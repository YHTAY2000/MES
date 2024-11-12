/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      screens: {
        'lg': '1024px', // adjust this breakpoint as needed
      },
    },
  },
  plugins: [],
}

