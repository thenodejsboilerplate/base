'use strict'
let path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/public/js/index.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'src/public/build/'),
    publicPath: 'src/public/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          // path.resolve(__dirname, 'node_modules')
        ],
        include: [
          path.resolve(__dirname, 'src/public/js')
        ],
        loader: 'babel-loader'
      }
    //   {
    //     test: /\.scss$/,
    //     include: [
    //       path.resolve(__dirname, 'src/public/scss')
    //     ],
    //     use: ExtractTextPlugin.extract('css!sass')
    //   }
    //   {
    //     test: /\.sass$/,
    //     use: [
    //       'style-loader'
    //     ]
    //   }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('src/public/css/app.css')
    // if you want to pass in options, you can do so:
    new ExtractTextPlugin({
      filename: 'src/public/css/app.css'
    })
  ]

}
