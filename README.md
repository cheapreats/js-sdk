# CheaprEats Node.js SDK

[![npm version](https://badge.fury.io/js/%40cheapreats%2Fsdk.svg)](https://badge.fury.io/js/%40cheapreats%2Fsdk) [![Documentation](https://img.shields.io/badge/docs-js--sdk.cheapreats.com-blue.svg)](https://js-sdk.cheapreats.com/)

CheaprEats Node.js SDK

```
$ npm install @cheapreats/sdk
```

## Using the Published SDK Version

```
const CE = require('@cheapreats/sdk');
```

## Using the SDK Locally

Locally importing is used typically while testing new SDK method implementations.

```javascript
const CE = require('./index');
```

If you are using browser, link to `ce.js`, it will automatically populate `window.CE`.

```html
<script src="build/ce.js"></script>
```

## Example Usage

```
const CE = require('./index');
// const CE = require("cheapreats-node-sdk")

CE.setAuthenticationToken('YOUR_TOKEN');

CE.Verification.sendSms(12508574718)
.then(verification_request_id => console.log("SMS Sent", verification_request_id))
.catch(e => console.log(e));
```

An additional example can be found in the [/demo/vanilla-js](https://github.com/CheaprEats/js-sdk/tree/master/demo/vanilla-js) folder.

## Publishing to NPM

* `npm run build`
* `npm publish`
* `npm run generate-docs` (Publishes docs)
