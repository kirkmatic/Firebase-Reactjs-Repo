module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all paths where TailwindCSS classes are used are included
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-section': "url('/src/assets/homesec_bg.svg')",
      },
    },
  },
  plugins: [],
}
