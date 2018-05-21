require('idempotent-babel-polyfill');

const reshape = require('reshape');
const plugin  = require('..');

const currentScript = document.currentScript;

// transform <style> source with a plugin
const transformDocument = async () => {
	// prepare the plugin options
	const pluginOptions = Object(window.reshapeOptions);

	// prepare the html source
	const response = await fetch(window.location.href);
	const source = await response.text();

	// transform the source
	try {
		// replace the document with the transformed result
		const result = await reshape({
			parserOptions: {
				filename: window.location.href
			},
			plugins: [ plugin(pluginOptions) ]
		}).process(source);

		const html = result.output(Object(window.reshapeData));

		if (source !== html) {
			const parser = new DOMParser();
			const parsed = parser.parseFromString(html, 'text/html');
			const scripts = Array.prototype.filter.call(parsed.querySelectorAll('script'), script => {
				script.remove();

				return script.src !== currentScript.src;
			});

			document.open();
			document.appendChild(parsed.documentElement);

			scripts.forEach(script => {
				const newScript = document.createElement('script');

				if (script.src) {
					newScript.src = script.src;
				} else {
					newScript.appendChild(script.lastChild);
				}

				document.head.appendChild(newScript);
			});

			document.close();
		}
	} catch (error) {
		console.error(error);
	}
}

window.stop();

transformDocument();
