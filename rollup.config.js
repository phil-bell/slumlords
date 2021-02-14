// export default {
//     input: 'slumlords/static-src/js/main.js',
//     output: {
//       file: 'slumlords/static/js/bundle.js',
//       format: 'umd',
//     },
//     inlineDynamicImports: true,
//   };

import resolve from 'rollup-plugin-node-resolve';

export default {
  // If using any exports from a symlinked project, uncomment the following:
	input: 'slumlords/static-src/js/main.js',
	output: {
    file: 'slumlords/static/js/bundle.js',
		format: 'es',
		sourcemap: true
	},
  preserveSymlinks: true,
  inlineDynamicImports: true,
	plugins: [
    resolve()
  ]
};