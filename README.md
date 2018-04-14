# CheaprEats Node.js SDK

[![CircleCI](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK.png?circle-token=c1dfd1730e61c19638e259c11d07de7fc3a1eba5)](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK)

CheaprEats Node.js SDK

## Project Structure

Some important files are outlined below, for detailed information, please refer to full API documentation.

```
app/
├── adaptors/                               # Network adaptors
|   └── CheaprEatsApolloAdaptor.js          # Adaptor for CheaprEats GraphQL API
├── controllers/                            # Controllers
├── factories/                              # Factories
├── links/                                  # Network links, used by adaptors
|   └── synchronouslinks/
|       └── ApolloLink.js                   # Network link for Apollo GraphQL server
├── models/                                 # Models
├── observers/                              # Observers, mainly used by App
|   └── ModelObserver.js                    # Observes Model
├── utilities/                              # Anything else
├── App.js                                  # Primary entry point
```

![Structure](https://i.imgur.com/BKFVAGb.png)

Adaptors are used to control Links, Links are used to send requests to server.

Models are class representation of API resources.

Factory is used to make Models. App is the main controller.

For example, to create a new resource, you may do:

```javascript
let user = sdk.modelFactory.make('User');
user.fill({
    username: 'junthehacker'
});
user.save(); // This will trigger Adaptor to send a request to server.
```

Or if you want to get resources, you might do:
```javascript
const getUser = async () => {
    let user = await sdk.Models.User.getCurrent();
    return user;
}
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

## API Reference

ALL methods are async, and return a `Promise`.

**!IMPORTANT! If we say `method() -> string`, it means the function will eventually resolve to a string.**

### Graph

Graph describes the GraphQL API data structure. For detailed information regarding types, please refer to internal Confluence.

##### Graph.query(query: String) -> object

Query the server, use standard GraphQL query format. You can only have maximum of 1 query.

```javascript
CE.Graph.query(`
    vendor {
        id
        name
        menuItems {
            id
            name
        }
    }
`).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})
```

### Verify

##### Verify.getCode(phoneNumber, countryCode) -> boolean

Get a SMS verification code. Return true if code sent.

```javascript
CE.Verify.getCode("3063411035", "1").then(result => {
    console.log("Verification code sent");
}).catch(e => {
    console.log(e);
})
```

### Customer

##### Customer.create(firstName: String, lastName: String, emailAddress: String, password: String, phoneNumber: String, code: String) -> int

Create a new customer.
`code` is the verification code retrieved using `Verify.getCode`.

```javascript
CE.Customer.create(
    "Jun",
    "Zheng",
    "me@jackzh.com",
    "1234567890",
    "3063411035",
    "123456")
.then(id => {
    console.log("Customer created with ID", id);
}).catch(e => {
    console.log(e);
})
```

##### Customer.authenticate(emailAddress: String, password: String) -> string

Authenticate a customer, return the authentication token.

If authentication is successful, SDK will automatically be authenticated as well.

```javascript
CE.Customer.authenticate("me@jackzh.com", "1234567890").then(token => {
    console.log("Customer authenticated with token", token);
}).catch(e => {
    console.log(e);
})
```

If you did not pass in the password, then `emailAddress` will be considered authentication token. The method will return user ID if token is valid, and authenticate the SDK.

```javascript
CE.Customer.authenticate("21d27124-97f6-45ca-8cfd-ef9b5911bf23").then(id => {
    console.log("SDK authenticated with User ID", id);
}).catch(e => {
    console.log(e);
})
```

If you did not pass in anything, then the method will simply check SDK authentication status, and return customer ID if authenticated.

```javascript
CE.Customer.authenticate().then(id => {
    console.log("SDK authenticated with User ID", id);
}).catch(e => {
    console.log(e);
})
```

### Vendor

##### Vendor.authenticate(emailAddress: String, password: String) -> string

Authenticate a vendor, return the authentication token.

If authentication is successful, SDK will automatically be authenticated as well.

```javascript
CE.Vendor.authenticate("me@jackzh.com", "1234567890").then(token => {
    console.log("Vendor authenticated with token", token);
}).catch(e => {
    console.log(e);
})
```

If you did not pass in the password, then `emailAddress` will be considered authentication token. The method will return user ID if token is valid, and authenticate the SDK.

```javascript
CE.Vendor.authenticate("21d27124-97f6-45ca-8cfd-ef9b5911bf23").then(id => {
    console.log("SDK authenticated with User ID", id);
}).catch(e => {
    console.log(e);
})
```

If you did not pass in anything, then the method will simply check SDK authentication status, and return vendor ID if authenticated.

```javascript
CE.Vendor.authenticate().then(id => {
    console.log("SDK authenticated with User ID", id);
}).catch(e => {
    console.log(e);
})
```
