import { JSDOM } from 'jsdom'
import polyfill from './jsdom-polyfill';

const dom = new JSDOM();

polyfill(dom.window);

export default html => JSDOM.fragment(html);
