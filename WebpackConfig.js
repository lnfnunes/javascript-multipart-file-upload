'use strict';

// http://webpack.github.io/docs/
let webpack = require('webpack');


class WebpackConfig {

  constructor(descriptor, path) {
    this.name = descriptor.name;
    this.version = descriptor.version;
    this.homepage = descriptor.homepage;
    this.path = path;
  }

  get() {
    let entry = {};
    entry[this.name] = this.path.src;
    entry[this.name + '.min'] = this.path.src;

    return {
      entry,
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel'
          },
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'raw'}
        ]
      },
      devtool: 'source-map',
      output: {
        libraryTarget: 'umd',
        library: this.name,
        filename: '[name].js'
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/
        }),
        new webpack.BannerPlugin(
          `/*\n` +
          ` ${this.name} v${this.version}\n` +
          ` ${this.homepage}\n` +
          `*/\n`
        )
      ]
    };
  }
}

module.exports = WebpackConfig;
