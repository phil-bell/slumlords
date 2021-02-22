import resolve from 'rollup-plugin-node-resolve';

export default {
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