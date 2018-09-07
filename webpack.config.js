require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const package = require('./package.json')

// const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInsertAtBodyEndPlugin = require('html-webpack-insert-at-body-end')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackDevServerPort = parseInt(process.env.PORT || '3000', 10)
const production = process.env.NODE_ENV === 'production'
const handlebars = require('handlebars')
handlebars.registerHelper('loop', (n, block) => {
  var accum = ''
  for (var i = 0; i < n; ++i) {
    accum += block.fn(i)
  }
  return accum
})
const routes = require('./src/routing/app.json')

let cssLoaders = [
  production ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
      minimize: production,
      sourceMap: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: false
    }
  }
]

module.exports = {
  entry: {
    app: [
      './src/assets/js/app.js',
      './src/assets/stylesheet/app.scss'
    ]
    // vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: production ? './' : '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        use: cssLoaders.concat([
          {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: false
            }
          }
        ])
      },
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre'
      // },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/[name].[ext]?[hash]'
      //       }
      //     },
      //     {
      //       loader: 'img-loader',
      //       options: {
      //         enabled: production
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: path.join(__dirname, 'src/task', 'assemble-loader.js'),
            options: {
              layouts: path.resolve('./src/views/layout.hbs'),
              partials: path.resolve('./src/views/partials/*.hbs'),
              data: path.resolve('./src/data/**/*.json')
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      slicknav: 'slicknav/dist/jquery.slicknav'
    }),
    // new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/js/pages',
        to: 'js/pages'
      },
      {
        from: 'src/assets/images',
        to: 'images'
      },
      {
        from: 'node_modules/font-awesome/fonts',
        to: 'css/fonts'
      },
    ], {})
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.hbs'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    quiet: true,
    port: webpackDevServerPort,
    hot: true
  }
}
routes.forEach((route) => {
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${route.page}.html`,
      template: `./src/views/pages/${route.page}.hbs`,
      inject: true,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // }
    })
  );
});
routes.forEach((route) => {
  if (route.script) {
    module.exports.plugins.push(
      new HtmlWebpackInsertAtBodyEndPlugin({
        filename: `${route.page}.html`,
        template: `./src/views/pages/${route.page}.hbs`,
        scriptSrc: `./js/pages/${route.page}.js`
      })
    );
  }
})
