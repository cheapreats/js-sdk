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

## Example Usage

```
const CE = require('./index');
// const CE = require("cheapreats-node-sdk")

CE.setAuthenticationToken('YOUR_TOKEN');

CE.Verification.sendSms(12508574718)
.then(verification_request_id => console.log("SMS Sent", verification_request_id))
.catch(e => console.log(e));
```

## Auto-generating code for New Mutation 

The `npm run add:mutation <Object>.<methodName>` command auto-generates code for the *Object* and *methodName* passed.

For example - `npm run add:mutation Category.batchArchive`

## Publishing to NPM

* `npm run build`
* `npm publish`
* `npm run generate-docs` (Publishes docs)
