import fragment from './jsdom-fragment';

export default root => {
	const defineElements = root.defineElements;
	const customElements = root.customElements;

	for (let $custom of customElements) {
		const name = $custom.name;

		if (name in defineElements) {
			transformCustomElement(root, $custom, defineElements[name]);
		}
	}
};

const transformCustomElement = (root, $custom, $define) => {
	const $fragment = fragment($custom.location.outerHTML);
	const $firstChild = $fragment.firstChild;
	const innerHTML = $define.location.innerHTML;
	const fn = getFn(innerHTML);
	const newInnerHTML = fn.call($firstChild);
	const newAST = root.reshape.parser(newInnerHTML);

	$custom.replaceWith(newAST);
};

const getFn = innerHTML => {
	try {
		return new Function(`return \`${innerHTML}\``);
	} catch (error) {
		// do nothing
	}

	return () => innerHTML;
}
