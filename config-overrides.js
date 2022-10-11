/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // disable fs
  config.resolve = {
    ...config.resolve,
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  };

  return config;
};
