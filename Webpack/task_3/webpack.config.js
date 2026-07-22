const path = require('path');

module.exports = {
  entry: {
    header: './header/header.js',
    body: './body/body.js',
    footer: './footer/footer.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
    devServer: {
      port: 8564
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          'file-loader',
          'image-webpack-loader',
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
};