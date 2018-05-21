const reshape = require('reshape');
const plugin  = require('..');

// prepare the default plugin options
const defaultOptions = {};

// transform <style> source with a plugin
const transformBodyElement = $body => {
	// prepare the plugin options
	let pluginOptions

	try {
		pluginOptions = Object(window.reshapeOptions);
	} catch (error) {
		pluginOptions = defaultOptions;
	}

	// prepare the <style> source
	const source = $body.innerHTML

	// transform the source
	reshape({ plugins: [ plugin(pluginOptions) ] }).process(source)
	// replace the <style> source with the transformed result
	.then(
		result => {
			const html = result.output(Object(window.reshapeData));

			if (source !== html) {
				$body.innerHTML = html;
			}
		},
		// otherwise, use a fallback and log the error
		error => {
			console.error(error)
		}
	)
}

document.addEventListener('DOMContentLoaded', () => {
	transformBodyElement(document.body);
});
