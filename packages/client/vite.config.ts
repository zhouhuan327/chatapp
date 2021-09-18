import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";
import { API } from "./src/constants";
// @ts-ignore
import builtins from "rollup-plugin-node-builtins";
// @ts-ignore
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
  plugins: [reactRefresh(), svgr(), builtinsPlugin, globalPlugin],
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
    port: 2333,
    proxy: {
      "/api": {
        target: API,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
