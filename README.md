# CheaprEats Node.js SDK

[![CircleCI](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK.png?circle-token=c1dfd1730e61c19638e259c11d07de7fc3a1eba5)](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK)

CheaprEats Node.js SDK

```
$ npm install @cheapreats/sdk
```

## Get Started

If you are using ES6 import, simply do:

```javascript
import CE from './index'
```

If you are using CommonJS modules, do:
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

```CE.Verification.sendSms(12508574718)
.then(verification_request_id => console.log("SMS Sent", verification_request_id))
.catch(e => console.log(e));```
