const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor2.js',
    library: {
      name: "monitor2.js",
      type: "umd"
    },
  },
};