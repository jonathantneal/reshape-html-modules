export const isDefineElement = node => Object(node).type === 'tag' && node.name === 'define';

export const isDefineExportElement = node => isDefineElement(node) && node.attrs.export;

export const addDefineElement = $define => {
	const nameAttr = $define.attrs.name;
	const name = nameAttr && nameAttr.slice(-1)[0].content;

	$define.root.defineElements[name] = $define;

	$define.removeSelf();
};
