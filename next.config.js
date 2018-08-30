module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.module.rules.push({
      test: require.resolve("zepto"),
      use: "imports-loader?this=>window"
    });
    return config;
  }
};
