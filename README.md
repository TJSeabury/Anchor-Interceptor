![example workflow](https://github.com/TJSeabury/Anchor-Interceptor/actions/workflows/test.yml/badge.svg)
![GitHub](https://img.shields.io/github/license/TJSeabury/Anchor-Interceptor)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TJSeabury/Anchor-Interceptor)
<a href="https://www.npmjs.com/package/ts-jest"><img src="https://img.shields.io/npm/v/@tjseabury/anchor-interceptor/latest.svg?style=flat" alt="NPM version" /> </a>

# AnchorInterceptor

Intercepts anchor navigation behavior and applies smooth scroll, as well as maintains clean urls.

Interceptor constructor may be called with a css selector string
that targets the header or nav that is used when calculating
scroll offsets; e.g., '.main-header.style-fixed'; an array of
classes must also be provided for interception targets. If an empty
targets array is provided all click events on anchors will be intercepted.
( Quite obviously, that can lead to undesireble conflicting behavior, but one
may do that if they wished. )

# Installation
```bash
npm install @tjseabury/anchor-interceptor
```

# Usage example
```js
import AnchorInterceptor from '@tjseabury/anchor-interceptor';

// with a header to offset
const interceptor = new AnchorInterceptor(
  'header.my-header-selector',
  [
    "smoothScrollThis",
    "js-smooth-scroll",
  ]
);

// or without
const interceptor = new AnchorInterceptor(
  false,
  [
    "smoothScrollThis",
    "js-smooth-scroll",
  ]
);
```
