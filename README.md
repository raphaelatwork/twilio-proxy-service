# Twilio Proxy Service

An OpenAPI defined web service for communicating with the Twilio platform.

## Objectives
##### A Single Source of Truth
With API development comes the risk of deploying a service that breaches the contract advertised to consumers. We describe our web service via the [OpenAPI 3.0 specification][openapi3] which takes the form of a JSON document that we can both advertise to consumers and develop against. We use this document in conjuction with [express-openapi-validator][openapimiddleware] and our testing framework [Jest][jest] to verify that the application adheres to API contract at every phase of the development process leading up to deployment.

##### A Portable Development Environment
Irreproducible builds plague the development process. We use [Vagrant][vagrant] to provision a virtual machine with all the dependencies necessary to run and test the application. Further, we provide instructions on how to debug on said virtual machine using [VS Code][vscode], thus eliminating the need to build or run the application on your local machine.

## Getting Started
##### Requirements
- Install [Vagrant][installVagrant]
- Install [Visual Studio Code][installVSCode]
- Install the [Remote Development Extension Pack][installRemoteDevVSCode] from Visual Studio Code

##### Spinning up the VM
Enter the following command into your terminal window to bring up the virtual machine:
```sh
vagrant up
```
![vagrant_up]
Once the process runs to completion, your VM should be fully provisioned and ready for you to start working with. You can proceed by using the following command to SSH into the VM, giving you access to a shell: 
```sh
vagrant ssh
```
![vagrant_ssh]

All files relevant to the app should be located in the `/vagrant` folder.
##### Launching the App
Once you've entered the `/vagrant` directory in the VM, you should run all the necessary build steps with the following command:
```sh
npm run build
```
Now you can run the app with the following command: 
```sh
npm run start
```
You can access the service at the following URL: `http://192.168.33.10:8000/` from your local machine. This address is configurable via the file `Vagrantfile` in the root folder of our repository. Changes to `Vagrantfile` do not take effect until after you exit the VM and run the following command:
```sh
vagrant reload
```
We've also enabled "hot-reload" via [nodemon][nodemon]. The aim of "hot-reload" is for your development environment to automatically detect changes in your source code and reflect them in a running instance of application. We suggest running the application in your VM while editing code from your local machine and syncing your local code with the code in the VM. You begin the automatic syncing process begins with the following command:
```sh
vagrant rsync-auto
```
This command watches for changes in your local directory and makes them available in the VM. Once your file syncing is in place, you can start the app with hot-reloading with the following command: 
```sh
npm run hot-reload
```
##### Viewing Documentation
We've set up [Redoc][redoc] to process our service's OpenAPI definition to render documentation as a stand-alone web app [(more OpenAPI tools)][openapitools]. To view the documentation locally, run the following command within the `/vagrant` directory inside the development VM:
```sh
npm run redoc
```
The command above kicks off an instance of [http-server][httpserver] from within the VM that we've configured to serve said web app. http-server is configured to serve at port 8080 by default on the localhost. Here's what you should see when accessing `http://192.168.33.10:8080` from the browser on your local machine after kicking the server off in the VM: 
![redocwebapp]

##### Running Tests
Running our test suite locally requires first running an instance of the [Twilio mock API server][prismmock] within the VM which you can do by running the following script from within the `/vagrant` directory of the VM: 
```sh
./runMockTwilioServer.sh
```
You can be certain the mock server is running once you see a printed statement in the shell that says "Prism is listening on http://127.0.0.1/4010" as shown below:
![prismshell]

Once the mock server is running, you can run the test suite in the VM in another shell by entering the following command: 
```sh
npm run test
```
![testsuiteshell]
##### Debugging with VS Code
_TODO_

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [jest]: <https://jestjs.io>
   [openapimiddleware]: <https://www.npmjs.com/package/express-openapi-validator>
   [vagrant]: <https://www.vagrantup.com>
   [openapi3]: <https://swagger.io/specification>
   [vscode]: <https://code.visualstudio.com>
   [installVagrant]: <https://www.vagrantup.com/docs/installation>
   [installVSCode]: <https://code.visualstudio.com/Download>
   [installRemoteDevVSCode]: <https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack>
   [vagrant_up]: <https://raw.githubusercontent.com/raphaelatwork/twilio-proxy-service/main/readme_images/vagrant_up.png>
   [vagrant_ssh]: <https://raw.githubusercontent.com/raphaelatwork/twilio-proxy-service/main/readme_images/vagrant_ssh.png>
   [nodemon]: <https://nodemon.io/>
   [redoc]: <https://redoc.ly/docs/redoc/quickstart/html/>
   [openapitools]: <https://openapi.tools/#documentation>
   [httpserver]: <https://www.npmjs.com/package/http-server>
   [prismmock]: <https://www.twilio.com/docs/openapi/mock-api-generation-with-twilio-openapi-spec>
   [prismshell]: <https://raw.githubusercontent.com/raphaelatwork/twilio-proxy-service/main/readme_images/prismshell.png>
   [testsuiteshell]: <https://raw.githubusercontent.com/raphaelatwork/twilio-proxy-service/main/readme_images/test_suite_shell.png>
   [redocwebapp]: <https://raw.githubusercontent.com/raphaelatwork/twilio-proxy-service/main/readme_images/redoc.png>