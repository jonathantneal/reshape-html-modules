# Reshape Source [<img src="http://jonathantneal.github.io/reshape-logo.svg" alt="reshape" width="90" height="90" align="right">][Reshape]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[Reshape Source] lets you do this in HTML.

```html
<example>

<!-- becomes -->

<example>
```

## Usage

Add [Reshape] and [Reshape Source] to your build tool:

```bash
npm install reshape reshape-source --save-dev
```

#### Node

Use [Reshape Source] to process your HTML:

```js
import reshape from 'reshape';
import reshapeSource from 'reshape-source';

reshape({
  plugins: [ reshapeSource(/* options */) ]
}).process(YOUR_HTML);
```

#### Webpack

Add [Reshape Loader] to your build tool:

```bash
npm install reshape-loader --save-dev
```

Use [Reshape Source] in your Webpack configuration:

```js
import reshapeSource from 'reshape-source';

export default {
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'reshape-loader',
      options: {
      plugins: [ reshapeSource(/* options */) ]
    }
    }]
  }
}
```

[cli-url]: https://travis-ci.org/jonathantneal/reshape-source
[cli-img]: https://img.shields.io/travis/jonathantneal/reshape-source.svg
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/reshape/reshape
[npm-url]: https://www.npmjs.com/package/reshape-source
[npm-img]: https://img.shields.io/npm/v/reshape-source.svg

[Reshape]: https://github.com/reshape/reshape
[Reshape Loader]: https://github.com/reshape/loader
[Reshape Source]: https://github.com/jonathantneal/reshape-source
