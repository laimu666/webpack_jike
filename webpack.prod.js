const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    main: './src/index/main.js',
    search: './src/search/search.js'
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
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
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,          
          'css-loader',
          'less-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //       require('autoprefixer')()
          //     ]
          //   }
          // },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        // use: 'file-loader'
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
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
      title: 'search',
      template: './src/search/index.html',
      filename: 'search.html',
      chunks: ['search'],
      inject: 'true',
      minify: false
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './src/index/index.html',
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ],
}