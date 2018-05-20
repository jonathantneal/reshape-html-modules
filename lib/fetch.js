import fetch from 'node-fetch';
import fs from 'fse';

export default async url => {
	const isURL = /^\w+:\/\//.test(url);

	if (isURL) {
		const response = await fetch(url);
		const text = response.text();

		return text;
	} else {
		const text = await fs.readFile(url, 'utf8');

		return text;
	}
}
