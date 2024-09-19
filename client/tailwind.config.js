// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust to your file extensions and locations
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
    fontFamily: {
     
      gorditaRegular: ["gorditaRegular"],
      gorditaBold: ["gorditaBold"],
      gorditaMedium: ["gorditaMedium"],
      avenirBook: ["avenirBook"],
      AbrilRegular:["AbrilRegular"]
    },
  },
  plugins: [],
};
