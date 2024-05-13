// eslint-disable-next-line
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@entities': path.resolve(__dirname, 'src/entities')
    }
  }
};
