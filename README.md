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
