function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        'aqua': 'var(--color-aqua)',
        'blue': 'var(--color-blue)',
        'bright-red': 'var(--color-bright-red)',
        'burgundy': 'var(--color-burgundy)',
        'copper': 'var(--color-copper)',
        'cornflower': 'var(--color-cornflower)',
        'flat-gold': 'var(--color-flat-gold)',
        'fluorescent-orange': 'var(--color-fluorescent-orange)',
        'fluorescent-pink': 'var(--color-fluorescent-pink)',
        'fluorescent-red': 'var(--color-fluorescent-red)',
        'fluorescent-yellow': 'var(--color-fluorescent-yellow)',
        'green': 'var(--color-green)',
        'kelly-green': 'var(--color-kelly-green)',
        'light-gray': 'var(--color-light-gray)',
        'light-teal': 'var(--color-light-teal)',
        'metallic-gold': 'var(--color-metallic-gold)',
        'mint': 'var(--color-mint)',
        'moss': 'var(--color-moss)',
        'orange':'var(--color-orange)',
        'orchid': 'var(--color-orchid)',
        'red': 'var(--color-red)',
        'risofederal-blue': 'var(--color-risofederal-blue)',
        'sunflower': 'var(--color-sunflower)',
        'yellow': 'var(--color-yellow)',
        'natural': 'var(--color-natural)',
      },
      lineHeight: {
        '12': '3rem'
      } 
    },
    fontFamily: {
      serif: ["Inknut Antiqua", "serif"],
      sans: ["DM Mono", "sans-serif"],
      mono: ["DM Mono", "sans-serif"],
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
};
