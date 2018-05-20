import fetch from './fetch';
import path from 'path';
import polyfill from './reshape-polyfill';
import { isDefineExportElement } from './define-element-functions';

export const isLinkHtmlElement = node => Object(node).type === 'tag' &&
	node.name === 'link' &&
	Object(node.attrs).rel &&
	node.attrs.href &&
	/^html$/i.test(node.attrs.rel.slice(-1)[0].content);

export const addLinkHtmlElement = async $link => {
	const root = $link.root;

	const filename = path.resolve(
		path.dirname($link.location.filename),
		$link.attrs.href.slice(-1)[0].content
	);

	const parser = root.reshape.parser;

	const html = await fetch(filename);

	const linkRoot = await polyfill(parser(html, { filename }));

	Object.keys(linkRoot.defineElements).filter(
		name => isDefineExportElement(linkRoot.defineElements[name])
	).forEach(
		name => {
			root.defineElements[name] = linkRoot.defineElements[name];
		}
	);

	$link.removeSelf();
};
