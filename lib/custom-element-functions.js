export const isCustomElement = node => Object(node).type === 'tag' && /^\w+-\w+/.test(node.name);

export const addCustomElement = $custom => {
	$custom.root.customElements.push($custom);
};
