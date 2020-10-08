const path = require('path')
const webpack =  require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    main: './src/main.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        // use: 'file-loader'
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'html-webpack-plugin',
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 9000,
    clientLogLevel: 'silent',
    open: true,
    quiet: true
  }
}