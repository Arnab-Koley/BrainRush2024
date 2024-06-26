/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    colors: {
      sheader: "#eb131a",
      stext: "#fcfcfc",
      sbuttontext: "#4d4c4c",
      sboxshade: "#fcfcfc",
      sbutton: "#fcfcfc",
      slightgray:"#c4bebf",


      headerText: "rgb(9 64 94)",
      background: "#0f172a",
      subHeaderText: "#ed3d15",
      btnColor: "#f06141",
      btnColorDark: "#c21111",
      inputBgColor: "#cacbd366",
      inputBorder: '#05fa22',
      sbg:'rgba(0, 0, 0, 0.5)',
      countDownText: "#0b99b3",
      navcol: "#F1B860",
      purple: { 500: "rgb(24, 13, 238)", 800: "#fff" },
      pink: { 500: "#B2194A" },
      white: "#fff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#474646",
        300: "gray",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        900: "#0F172A",
      },
      yellow: {
        300: "#fde047",
        500: "#eab308",
      },
      black:{
        DEFAULT:'#050505',
      },
      red: {
        DEFAULT: '#F47675', // Adjust this to your desired base red
        50: '#FEF2F2',
        100: '#FDF1F1',
        200: '#FCEAE6',
        300: '#FBC2C2',
        400: '#F89C9C',
        500: '#F47675',
        600: '#EF5350',
        700: '#E91E2B',
        800: '#83181F',
        900: '#390B0F',
      },
    },
  },
  plugins: [],
};
