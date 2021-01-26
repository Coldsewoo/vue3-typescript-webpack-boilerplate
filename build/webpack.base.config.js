'use strict'

const path = require('path')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: '@vue/runtime-dom',
      '@': resolve('src'),
      Assets: resolve('src/assets'),
      Components: resolve('src/components'),
      Libraries: resolve('src/libraries'),
      Services: resolve('src/services'),
      Views: resolve('src/views'),
      Mixins: resolve('src/mixins'),
      Constants: resolve('src/constants'),
      Layouts: resolve('src/layouts'),
      Projects: resolve('src/projects'),
      Hooks: resolve('src/hooks'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              'babel-preset-typescript-vue3',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'production',
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  node: {
    global: false,
  },
}
