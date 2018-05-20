import polyfill from './lib/reshape-polyfill';

export default () => {
	// options
	// ...

	return async (ast, reshape) => {
		const root = await polyfill(ast, reshape);

		return root.content;
	};
};
