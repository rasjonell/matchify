const bases = ['progress', 'tooltip'];
const types = ['info', 'error', 'success', 'warning', 'primary', 'secondary'];
const safelist = bases.flatMap((base) =>
	types.map((type) => `${base}-${type}`)
);

module.exports = {
	safelist,
	content: ['./src/{routes,lib}/**/*.{svelte,js,ts}'],
	plugins: [require('daisyui')],
};
