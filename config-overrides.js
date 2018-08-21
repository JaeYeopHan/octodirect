const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (config, env) => {
  config = rewireUglifyJS(config, env);
  config = rewireBundleAnalyzer(config, env);
  return config;
};

function rewireUglifyJS(config, env) {
  env === 'production' &&
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
  env === 'production' && config.plugins.push(new BundleAnalyzerPlugin());
  return config;
}
