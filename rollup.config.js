import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import scss from "rollup-plugin-scss";

const dirs = ["account", "home", "map", "review", "shared"];

export default dirs.map((name, index) => ({
  input: `slumlords/${name}/static-src/${name}/js/main.js`,
  output: {
    file: `slumlords/${name}/static/${name}/js/bundle.js`,
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
    scss({ output: `slumlords/${name}/static/${name}/css/bundle.css` }),
    babel({
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    }),
  ],
}));
