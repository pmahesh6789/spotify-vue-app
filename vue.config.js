const Dotenv = require('dotenv-webpack');

module.exports = {
  configureWebpack: {
    plugins: [new Dotenv()],
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/main.scss";
        `,
      },
    },
  },
};
