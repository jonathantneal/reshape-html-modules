import { isCustomElement, addCustomElement } from './custom-element-functions';
import { isDefineElement, addDefineElement } from './define-element-functions';
import { isLinkHtmlElement, addLinkHtmlElement } from './link-html-element-functions';
import transformCustomElements from './transform-custom-elements';

export default async (ast, reshape) => {
	const root = {
		content: ast,
		defineElements: {},
		customElements: [],
		reshape
	};

	await walk(root, async node => {
		if (isCustomElement(node)) {
			addCustomElement(node);

			transformCustomElements(root);
		} else if (isDefineElement(node)) {
			addDefineElement(node);

			transformCustomElements(root);
		} else if (isLinkHtmlElement(node)) {
			await addLinkHtmlElement(node);

			transformCustomElements(root);
		}
	});

	return root;
}

async function walk(parent, fn) {
	const content = parent.content.slice(0);

	for (let node of content) {
		bind(node, parent);

		await fn(node);

		if (node.content === Object(node.content) && node.content.length) {
			await walk(node, fn);
		}
	}
}

function bind(node, parent) {
	Object.defineProperties(node, {
		parent: {
			value: parent,
			writable: true
		},
		replaceWith: {
			value: replaceWith,
			writable: true
		},
		removeSelf: {
			value: removeSelf,
			writable: true
		},
		root: {
			get() {
				let target = node;

				while (target.parent) {
					target = target.parent;
				}

				return target;
			}
		},
		walk: {
			value: walk.bind(null, node),
			writable: true
		}
	});
}

// remove a node from its parent
function removeSelf() {
	const node = this;
	const parent = node.parent;

	if (parent) {
		const index = parent.content.indexOf(node);

		parent.content.splice(index, 1);

		node.parent = null;
	}
}

// replace a node with another node or nodes
function replaceWith(replaceNodeOrNodes) {
	const node = this;

	if (node.parent) {
		const parent = node.parent;

		const index = parent.content.indexOf(node);

		const replaceNodes = [].concat(replaceNodeOrNodes);

		parent.content.splice(index, 1, ...replaceNodes);

		replaceNodes.forEach(replaceNode => {
			replaceNode.parent = parent;
		});

		node.parent = null;
	}
}
