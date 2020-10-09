const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')

// 处理多页打包
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  // glob.sync中的匹配方式实现同步读取本地中的文件
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      // 自动生成和压缩html文件
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  mode: 'none',
  devtool: 'inline-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js', // 输出的js文件使用chunkhash
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
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]' // 输出的图片文件使用hash
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
    // 拷贝静态文件文件夹
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    }),
    // 打包前清除输出目录
    new CleanWebpackPlugin(
      { cleanStaleWebpackAssets: false } // 防止清空dist里面没有改动的文件
    ),
    // 单独生成css文件
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css' // 输出的css文件使用contenthash
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ].concat(htmlWebpackPlugins),
}