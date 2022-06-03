import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import stdLibBrowser from "node-stdlib-browser";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [
    solidPlugin(),
    {
      ...inject({
        global: [
          require.resolve(
            "./node_modules/node-stdlib-browser/helpers/esbuild/shim"
          ),
          "global",
        ],
        process: [
          require.resolve(
            "./node_modules/node-stdlib-browser/helpers/esbuild/shim"
          ),
          "process",
        ],
        Buffer: [
          require.resolve(
            "./node_modules/node-stdlib-browser/helpers/esbuild/shim"
          ),
          "Buffer",
        ],
      }),
      enforce: "post",
    },
  ],
  resolve: {
    alias: stdLibBrowser,
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
