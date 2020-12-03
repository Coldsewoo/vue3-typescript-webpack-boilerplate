'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const chalk = require('chalk')

const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    clientLogLevel: 'error',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html'),
        },
      ],
    },
    disableHostCheck: true,
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    openPage: config.dev.openPage,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    watchOptions: {
      poll: config.dev.poll,
    },
    quiet: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsRoot,
        },
      ],
    }),
  ],
  optimization: {
    moduleIds: 'named',
  },
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new webpack.ProgressPlugin({
          activeModules: false,
          entries: true,
          handler(percentage, message, ...args) {
            if (percentage === 1) {
              setTimeout(() => {
                console.log('')
                console.log('')
                console.log(
                  chalk.blue('◆　') +
                    chalk.green(`Your application is running here: `) +
                    chalk.white.underline(
                      `http://${devWebpackConfig.devServer.host}:${port}`
                    )
                )
                console.log(
                  chalk.blue('◆　') +
                    chalk.green('Or Here: ') +
                    chalk.white.underline(`http://dev.v2zenerate/`)
                )
                console.log('')
                console.log('')
              }, 500)
            }
          },
          modules: true,
          modulesCount: 5000,
          profile: false,
          dependencies: true,
          dependenciesCount: 10000,
          percentBy: null,
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
