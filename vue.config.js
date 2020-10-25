const Dotenv = require('dotenv-webpack');
const path = require("path");

module.exports = {
  configureWebpack: {
    plugins: [new Dotenv()],
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/core/")],
          indentedSyntax: true,
        },
        prependData: '@import "~@/assets/scss/main.scss"',
      },
    },
  },
};
