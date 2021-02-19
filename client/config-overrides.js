const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    assets: path.resolve(__dirname, "./src/assets"),
    components: path.resolve(__dirname, "./src/components"),
    store: path.resolve(__dirname, "./src/store"),
    utils: path.resolve(__dirname, "./src/utils"),
    hooks: path.resolve(__dirname, "./src/hooks"),
  }),
);
// fixBabelImports("import", {
//   libraryName: "antd",
//   libraryDirectory: "es",
//   style: true,
//   // style: true,
// }),
// addLessLoader({
//   lessOptions: {
//     javascriptEnabled: true,
//     modifyVars: {
//       "@primary-color": "#4762D6",
//       "link-color": "#3C59D6",
//       "@font-family": `-apple-system,PingFang SC, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
//               'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
//               'Noto Color Emoji'`,
//     },
//   },
// }),
// addWebpackAlias({}),
