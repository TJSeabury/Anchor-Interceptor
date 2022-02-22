![example workflow](https://github.com/TJSeabury/Anchor-Interceptor/actions/workflows/test.yml/badge.svg)
<a href="https://www.npmjs.com/package/ts-jest"><img src="https://img.shields.io/npm/v/@tjseabury/anchor-interceptor/latest.svg?style=flat-square" alt="NPM version" /> </a>

# Anchor-Interceptor

Intercepts anchor navigation behavior and applies smooth scroll, as well as maintains clean urls.

Interceptor constructor may be called with a css selector string
that targets the header or nav that is used when calculating
scroll offsets; e.g., '.mk-header.header-style-1'; an array of
classes must also be provided for interception targets. If an empty
targets array is provided all click events on anchors will be intercepted.
( Quite obviously, that can lead to undesireble conflicting behavior, but one
may do that if they wished. )

Usage example:

```js
const interceptor = new AnchorInterceptor(false, [
  "smoothScrollThis",
  "js-smooth-scroll",
]);
```
