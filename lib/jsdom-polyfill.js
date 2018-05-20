export default window => {
	const DOMStringMap = window.DOMStringMap;
	const Element = window.Element;

	DOMStringMap.prototype.toString = function toString() {
		return Object.keys(this).map(
			key => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}="${this[key]}"`
		).join(' ');
	};

	Object.defineProperty(Element.prototype, 'xAttrs', {
		get() {
			return Array.prototype.filter.call(
				this.attributes,
				attr => /^x-/.test(attr.name)
			).reduce(
				(domStringMap, attr) => Object.assign(domStringMap, {
					[attr.name.slice(2).replace(/-\w/g, $0 => $0.slice(1).toUpperCase())]: attr.value
				}),
				Object.create(DOMStringMap.prototype)
			);
		},
		configurable: true
	});

	Object.defineProperty(Element.prototype, 'attrs', {
		get() {
			return Array.prototype.filter.call(
				this.attributes,
				attr => /^(aria-)?[^-]+$/.test(attr.name)
			).reduce(
				(domStringMap, attr) => Object.assign(domStringMap, {
					[attr.name]: attr.value
				}),
				Object.create(DOMStringMap.prototype)
			);
		},
		configurable: true
	});
}
