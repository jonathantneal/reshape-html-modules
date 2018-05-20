import polyfill from './jsdom-polyfill';

polyfill(window);

const parser = new DOMParser();

export default html => {
	const parsed = parser.parseFromString(html, 'text/xml');
	const documentFragment = window.document.createDocumentFragment();

	documentFragment.appendChild(parsed.documentElement);

	return documentFragment;
}
