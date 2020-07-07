require('dotenv').config()

const webpack = require('webpack')
const path = require('path')
const config = require('sapper/config/webpack.js')
const pkg = require('./package.json')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const alias = { svelte: path.resolve('node_modules', 'svelte') }
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html']
const mainFields = ['svelte', 'module', 'browser', 'main']

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              hydratable: true,
              hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
            }
          }
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        __FIREBASE_API_KEY__: String(`"${process.env.FIREBASE_API_KEY}"`),
        __FIREBASE_AUTH_DOMAIN__: String(`"${process.env.FIREBASE_AUTH_DOMAIN}"`),
        __FIREBASE_DATABASE_URL__: String(`"${process.env.FIREBASE_DATABASE_URL}"`),
        __FIREBASE_PROJECT_ID__: String(`"${process.env.FIREBASE_PROJECT_ID}"`),
        __FIREBASE_STORAGE_BUCKET__: String(`"${process.env.FIREBASE_STORAGE_BUCKET}"`),
        __FIREBASE_MESSAGING_SENDER_ID__: String(`"${process.env.FIREBASE_MESSAGING_SENDER_ID}"`),
        __FIREBASE_APP_ID__: String(`"${process.env.FIREBASE_APP_ID}"`),
        __FIREBASE_MEASUREMENT_ID__: String(`"${process.env.FIREBASE_MEASUREMENT_ID}"`)
      })
    ].filter(Boolean),
    devtool: dev && 'inline-source-map'
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              css: false,
              generate: 'ssr',
              dev
            }
          }
        }
      ]
    },
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
}
