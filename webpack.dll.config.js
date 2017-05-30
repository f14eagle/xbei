const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDebug = process.env.NODE_ENV === 'development';
//const outputPath = isDebug ? path.join(__dirname, '../common/debug') : path.join(__dirname, '../common/dist');
const outputPath = path.join(__dirname, './public/lib/');
const fileName = '[name].js';

// 资源依赖包，提前编译
const lib = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'redux-logger',
  //'react-bootstrap',
  'immutable',
  'immutable-devtools',
  'bootstrap',
  'jquery',
  'babel-polyfill',
  './public/css/bootstrap.min.css',
  './public/css/font-awesome.css'
];

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
];

if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery"
    }),
    new ExtractTextPlugin('lib.css')
  );
}

module.exports = {
  devtool: '#source-map',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: fileName,
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
      // 加载器配置
      loaders: [
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
          })
      },
      {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader'
      }
      ]
  },
  plugins: plugin
};
