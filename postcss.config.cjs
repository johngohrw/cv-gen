const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const tailwindcssnesting = require("tailwindcss/nesting")

const config = {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcssnesting,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
};

module.exports = config;
