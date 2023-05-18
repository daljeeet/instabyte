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
        width: "width 0.2s ease-in-out",
        loader: "loader 1.2s ease-in-out infinite",
        "gradient-x": "gradient-x 5s ease infinite",
        "gradient-y": "gradient-y 5s ease infinite",
        "gradient-xy": "gradient-xy 5s ease infinite",
      },
      keyframes: {
        width: {
          "0%": { width: "0" },
          "100%": { width: "52" },
        },
        loader: {
          "0%": { width: "0%" },
          "50%": { width: "100%", left: "0" },
          "100%": { width: "0", right: "0", left: "unset" },
        },

        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      colors: {
        darkbg: "#0f172a",
        textlight: "#ffffff",
        lightbg: "#ffffff",
        textdark: "#0f172a",
        grey_shade: "#324053",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
    // ...
  ],
};
