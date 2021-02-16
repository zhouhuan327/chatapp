const { override } = require("customize-cra");
const path = require("path");

module.exports = override();
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
