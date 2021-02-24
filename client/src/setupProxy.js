const { createProxyMiddleware } = require("http-proxy-middleware"); //注意写法，这是1.0以后的版本，最好按抄

module.exports = function (app) {
  const url =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
  app.use(
    createProxyMiddleware("/api", {
      target: url,
      changeOrigin: true,
      secure: false,
      ws: true, // 启用websocket
      pathRewrite: {
        "^/api": "",
      },
    }),
  );
};
