var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const libPath = './public/lib/manifest.json';

module.exports = {
    // 页面入口文件配置
    entry : ['babel-polyfill', './client/index.js'],
    // 入口文件输出配置
    output : {
        path : __dirname + '/public/js/',
        filename : 'bundle.js'
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
    // 其他解决方案配置
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json'],
        modules: [
          path.resolve('./'),
          path.resolve('./node_modules')
        ]
    },
    // 插件项
    plugins : [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(libPath),
        }),
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),*/
        new ExtractTextPlugin('styles.css'),
    ]
}
