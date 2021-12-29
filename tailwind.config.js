module.exports = {
  content: ["./index.html", "./a-child-page/index.html"],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
