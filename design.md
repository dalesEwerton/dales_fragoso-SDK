# Architecture
To develop this SDK in TypeScript for the specified API endpoints, the architectural pattern used was the `Client Library pattern`. This pattern focuses on providing a client-side library that abstracts the API interactions and provides a convenient and easy-to-use interface for developers.

## Applying the pattern
To apply the pattern we used:

### SDK Core
SDK Core: The core module or class that will serve as the foundation for the SDK. This core module is responsible for handling the underlying communication and common functionality shared across different services. The file who represents this module is `./src/LotrClient.ts`

### Endpoint Modules
Endpoint Modules: these modules are composed of classes for each main endpoint we wanted to cover in the SDK, `MovieEndpoint` and `QuoteEndpoint`. These modules encapsulate the logic and methods specific to each endpoint. They are located at `./src/endpoints`.

### Service Classes
Service Classes: these classes will instantiate the endpoint modules and are responsible for converting the SDK input format to the API input format. They are also respoinble for processing the API responses and deliver the proper output for the SDK.

## SDK Configuration
A configuration mechanism was added to allow developers to provide their API key and other required settings during the SDK initialization. Currently the only parameters accepted are the API_KEY and the enableLogging (that can be used to enable the internal logging), but they could easily be extended to add more configuration options.

## Objective
The objective of the pattern is provide a clear and intuitive SDK interface for other developers. They can initialize the SDK with the necessary configuration and use the exposed methods to interact with the movie and quote endpoints seamlessly.

## References
Many popular SDKs are using a similar pattern, among them:
- the AWS SDK for JavaScript;
- Stripe JavaScript Library;
- Firebase JavaScript SDK;
- Azure SDK for JavaScript. 

These SDKs follow the Client Library pattern and were used as references for build this SDK, but of course, in a more simplified way, given the simplicity of the scope of this SDK.

Keep in mind that that the term "Client Library pattern" may vary in usage and terminology across different sources, so you might also find related patterns under different names such as "API Wrapper," "SDK Design", or "API Client Design."