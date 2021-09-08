import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
const builtinsPlugin = {
  ...builtins({ jsesc: true }),
  name: "builtins",
};
const globalPlugin = {
  ...globals(),
  name: "globals",
};

const { resolve } = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgr(),builtinsPlugin,globalPlugin],
  root: ".",
  resolve: {
    alias: {
      "/@": resolve(__dirname, "./src"),
    },
  },
  define: {
    // process: {
    //   env: {},
    // },
    // Buffer: {},
  },
  server: {
    proxy: {
      // 字符串简写写法
      // "/api": "http://localhost:3305/",
      // 选项写法
      "/api": {
        target: "http://localhost:3305/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
