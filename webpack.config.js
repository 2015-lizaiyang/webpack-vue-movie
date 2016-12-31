var webpack           = require('webpack');
var path              = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css到单独的css文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 获取开发环境或者是部署环境
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // entry: './src/main.js',
  // output: {
  //   path: './dist',
  //   filename: 'build.js'
  // },
    entry: {
    app: './src/main.js',
    vendor: ['jquery'],
  },
  output: {
    path: './dist/static',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      // {
      //   test: /\.css$/,
      //   laoder: 'style-loader!css-loader'
      // },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test:/\.sass$/,
        loaders:["style","css","sass"]
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new ExtractTextPlugin('button.css')
  ],
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  // webpack静态服务器配置
  devServer: {
    contentBase: './',
    host: '192.168.79.1',
    port: '3334',
    color: true
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    // extensions: [' ','.js','.vue','.css','.json','.scss'],
    alias: {
      'vue$': 'vue/dist/vue.js',
    }
  },
  devtool: '#eval-source-map',
  babel: {
    "presets": ['es2015','stage-0'],
    "plugins": ['transform-runtime']
  },
};

if (isProduction) {
  module.exports.devtool = '#source-map'

  module.exports.output.publicPath = 'static/'

  module.exports.plugins = (module.exports.plugins || []).concat([

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
