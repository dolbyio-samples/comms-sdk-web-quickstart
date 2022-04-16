# Communications APIs Quick Start Application

## About this Quick Start Application Workshop (v quickstart)
 
This example is targeted for rapid deployment with just a developer token. The example contains a front-end application and uses a client token authenticate with the Dolby.io API. 

For the purposes of running this application, you'll need to sign-up to following platforms:
- [Dolby.io](https://dolby.io/signup)

The application works across all the majory browsers, however we recommend using Chrome to take advantage of additional features offered by the browser. 


## Download this application and find your developer token:

 - First you'll need a client developer token to initialize our SDK. 
 - Just login to our dashboard,select your application, click demos and copy the token.

![Client token example](assets/../www/assets/img/client-token.png)

 - Open **www/scripts/constants.js** file and replace the **apiToken** value with the developer token you just copied.


## Run your app! 
You'll need to run this app on localhost using VS code or if you prefer with any other server such as the one bundled with python. 

 ```
VS Code:
Select the www/index.html file and run with live server.
```
```
Python:
cd www
python -m SimpleHTTPServer 3000
```

  Congrats! You've just deployed your first Dolby.io Communication API video conference app!