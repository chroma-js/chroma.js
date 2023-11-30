import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import buble from "@rollup/plugin-buble";
import license from "rollup-plugin-license";
import replace from "@rollup/plugin-replace";
import path from "path";
import { terser } from "rollup-plugin-terser";
import { version } from './package.json'

const minify = !process.env.ROLLUP_WATCH && !process.env.DEV;
/** globals process, __dirname **/

module.exports = [
  bundle("index.js", "chroma"), // Full
  bundle("index-light.js", "chroma-light"), // Minimum color manipulation
  bundle("index-ultra-light.js", "chroma-ultra-light"), // For color conversion
];

function bundle(input, target) {
  return {
    input,
    output: {
      file: `${target}${minify ? ".min" : ""}.js`,
      format: "esm",
      name: "chroma",
    },
    plugins: [
      resolve(),
    //   commonjs(),

      replace({
        delimiters: ["@@", ""],
        preventAssignment: true,
        version,
      }),

      // If we're building for production (npm run build
      // instead of npm run dev), transpile and minify
    //   buble({
    //     transforms: { dangerousForOf: true },
    //   }),
      minify &&
        terser({
          mangle: true,
        }),
      license({
        sourcemap: true,
        //cwd: '.', // Default is process.cwd()

        banner: {
          content: {
            file: path.join(__dirname, "LICENSE"),
          },
        },
      }),
    ],
  };
}