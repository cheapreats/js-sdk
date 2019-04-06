# CheaprEats Node.js SDK

[![npm version](https://badge.fury.io/js/%40cheapreats%2Fsdk.svg)](https://badge.fury.io/js/%40cheapreats%2Fsdk)

CheaprEats Node.js SDK

```
$ npm install @cheapreats/sdk
```

## Using the Published Version

```
const CE = require('@cheapreats/sdk');
```

## Get Started Locally

```javascript
const CE = require('./index');
```

If you are using browser, link to `ce.js`, it will automatically populate `window.CE`.

```html
<script src="build/ce.js"></script>
```

## Terminal Usage
First run the local node server

```node```

Then declare the SDK as a variable

```const CE = require('./index');``` or ```const CE = require("cheapreats-node-sdk")```

Then test

```
CE.setAuthenticationToken('YOUR_TOKEN');

CE.Verification.sendSms(12508574718)
.then(verification_request_id => console.log("SMS Sent", verification_request_id))
.catch(e => console.log(e));
```

## Publishing to NPM

* `npm run build`
* `npm publish`
