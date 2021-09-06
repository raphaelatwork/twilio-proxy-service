# Twilio Proxy Service

An OpenAPI defined proxy web service for communicating with the Twilio platform.

## Objectives
##### A Single Source of Truth
With API development comes the risk of deploying a service that breaches the contract advertised to consumers. We describe our web service via the [OpenAPI 3.0 specification][openapi3] which takes the form of a JSON document that we can both advertise to consumers and develop against. We use this document in conjuction with [express-openapi-validator][openapimiddleware] and our testing framework [Jest][jest] to verify that the application adheres to API contract at every phase of the development process leading up to deployment.

##### A Portable Development Environment
Irreproducible builds plague the development process. We use [Vagrant][vagrant] to provision a virtual machine with all the dependencies necessary to run and test the application. Further, we provide instructions on how to debug on said virtual machine using [VS Code][vscode], thus eliminating the need to run the application on your local machine.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [jest]: <https://jestjs.io>
   [openapimiddleware]: <https://www.npmjs.com/package/express-openapi-validator>
   [vagrant]: <https://www.vagrantup.com>
   [openapi3]: <https://swagger.io/specification/>
   
