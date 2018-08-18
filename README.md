# CheaprEats Node.js SDK

[![CircleCI](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK.png?circle-token=c1dfd1730e61c19638e259c11d07de7fc3a1eba5)](https://circleci.com/gh/wolfbeacon/CheaprEats-Node-SDK)

CheaprEats Node.js SDK

For detailed documentation, please visit [https://cheapreats.com/developer/docs/](https://cheapreats.com/developer/docs/)

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