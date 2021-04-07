import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import { babel } from "@rollup/plugin-babel";

const dirs = ["account", "home", "map", "review", "shared"];

export default dirs.map((name, index) => ({
  input: `slumlords/apps/${name}/static-src/${name}/js/main.js`,
  output: {
    file: `slumlords/apps/${name}/static/${name}/js/bundle.js`,
    format: "es",
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
  preserveSymlinks: true,
  inlineDynamicImports: true,
  plugins: [
    resolve(),
    commonjs(),
    scss({ output: `slumlords/apps/${name}/static/${name}/css/bundle.css` }),
    babel({ babelHelpers: "bundled", presets: ['@babel/preset-env'] }),
  ],
}));
