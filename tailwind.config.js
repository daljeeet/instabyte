/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        width: 'width 0.2s ease-in-out',
        loader: 'loader 1s ease-in-out infinite',
      },
      keyframes: {
        width: {
          '0%': { width:"0" },
          '100%': { width:'52' },
        },
        loader:{
          "50%":{width:"100%"},
          "100%":{width:"0",right:"0",left:"unset"}
        }
      },
      colors: {
        'darkbg': '#0f172a',
        "textlight":"#ffffff",
        "lightbg":"#ffffff",
        "textdark":"#0f172a"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}