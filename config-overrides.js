'use strict';

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const manifestJson = require('./public/manifest.json');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = (config, env) => {
  if (env === 'production') {
    config = rewireUglifyJS(config, env);
    config = rewireBundleAnalyzer(config, env);
    config = rewireStringReplace(config, env);
  }
  return config;
};

function rewireUglifyJS(config, env) {
  config.plugins.unshift(
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        drop_console: true,
        unused: true,
        dead_code: true,
      },
    }),
  );

  return config;
}

function rewireBundleAnalyzer(config, env) {
  config.plugins.push(new BundleAnalyzerPlugin());
  return config;
}

function rewireStringReplace(config, env) {
  console.log(`[INFO] octodirect version : ${manifestJson.version}`);

  config.module.rules.push({
    test: /(\.tsx)$/,
    loader: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: /#__VERSION__#/gi,
          replacement: function(match, p1, offset, string) {
            return manifestJson.version;
          },
        },
      ],
    }),
  });
  config.plugins.push(new StringReplacePlugin());

  return config;
}
