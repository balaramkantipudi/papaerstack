// module.exports = {
//   content: [
//     './src/app/**/*.{js,ts,jsx,tsx}',
//     './src/components/**/*.{js,ts,jsx,tsx}',
//     './src/pages/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         gilroy: ["Inter Tight", "Arial", "sans-serif"],
//         dmsans: ["Space Grotesk", "Arial", "sans-serif"],
//         roboto: ["Lora", "Georgia", "serif"],
//       },
//       colors: {
//         brand: {
//           teal: {
//             50: "#eef6f6",
//             100: "#d7eaea",
//             200: "#afd5d5",
//             300: "#87c0c0",
//             400: "#5fabab",
//             500: "#3d8f8f",
//             600: "#317272",
//             700: "#255656",
//             800: "#183939",
//             900: "#0c1d1d",
//             DEFAULT: "#3d8f8f",
//           },
//           earth: {
//             50: "#f9f5f0",
//             100: "#f0e9df",
//             200: "#e1d3bf",
//             300: "#d2bd9f",
//             400: "#c3a77f",
//             500: "#b49163",
//             600: "#9a7a53",
//             700: "#735c3f",
//             800: "#4d3d2a",
//             900: "#261f15",
//             DEFAULT: "#9a7a53",
//           },
//           slate: {
//             50: "#f2f4f8",
//             100: "#e3e7ee",
//             200: "#c7cfdd",
//             300: "#aab7cc",
//             400: "#8e9fbb",
//             500: "#7287aa",
//             600: "#5b6d8f",
//             700: "#45526b",
//             800: "#2e3648",
//             900: "#171b24",
//             DEFAULT: "#5b6d8f",
//           },
//         },
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [require('daisyui')]
// }








// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Inter Tight', ...fontFamily.sans],
        dmsans: ['Space Grotesk', ...fontFamily.sans],
        roboto: ['Lora', ...fontFamily.serif],
      },
      colors: {
        brand: {
          teal: {
            50: '#eef6f6',
            100: '#d7eaea',
            200: '#afd5d5',
            300: '#87c0c0',
            400: '#5fabab',
            500: '#3d8f8f',
            600: '#317272',
            700: '#255656',
            800: '#183939',
            900: '#0c1d1d',
            DEFAULT: '#3d8f8f',
          },
          earth: {
            50: '#f9f5f0',
            100: '#f0e9df',
            200: '#e1d3bf',
            300: '#d2bd9f',
            400: '#c3a77f',
            500: '#b49163',
            600: '#9a7a53',
            700: '#735c3f',
            800: '#4d3d2a',
            900: '#261f15',
            DEFAULT: '#9a7a53',
          },
          slate: {
            50: '#f2f4f8',
            100: '#e3e7ee',
            200: '#c7cfdd',
            300: '#aab7cc',
            400: '#8e9fbb',
            500: '#7287aa',
            600: '#5b6d8f',
            700: '#45526b',
            800: '#2e3648',
            900: '#171b24',
            DEFAULT: '#5b6d8f',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        customtheme: {
          primary: {
            DEFAULT: '#1B4F42',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#B89778',
            foreground: '#FFFFFF',
          },
          accent: '#75BFA8',
          neutral: '#2e3648',
          'base-100': '#FFFFFF',
          'base-200': '#F5F5F5',
          'base-300': '#E5E7EB',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
}
