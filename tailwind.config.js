/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
      Orbitron: ['Orbitron', 'sans-serif'],
      Sirr:['Sriracha','sans-serif'] ,
      Lex:['Lexend','sans-serif'],
      Mont:['Montserrat','sans-serif'],
      OpenSans:['Open Sans','sans-serif'],
      Zen:['Zen Dots','sans-serif'] // Example for Google Font
    },
    backgroundImage: {
      'exam-bg': "url('https://getwallpapers.com/wallpaper/full/a/9/1/1400199-geometric-wallpapers-3840x2160-pc.jpg')"
    },
  },
},
  plugins: [],
}
