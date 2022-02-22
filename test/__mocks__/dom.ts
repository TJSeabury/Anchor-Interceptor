import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock</title>
</head>
<body>
    <h1>Mock</h1>
    <p>Nothing but test data.</p>
</body>
</html>`, {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
});

// @ts-ignore
global.window = dom.window;
// @ts-ignore
global.document = dom.window.document;
