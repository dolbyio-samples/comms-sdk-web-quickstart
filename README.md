# Communications APIs Quick Start Application

## About this Quick Start Application (v quickstart)
 
This example is targeted for rapid deployment with just a developer token. The example contains a front-end application and uses a client token authenticate with the Dolby.io API. 

For the purposes of running this application, you'll need to sign-up to following platforms:
- [Dolby.io](https://dolby.io/signup)

The application works across all the majory browsers, however we recommend using Chrome to take advantage of additional features offered by the browser. 


##  Step One: Create an application and find your keys:

 - First you'll need an **Consumer API key** and **Consumer API secret** to comunicate with the Dolby.io APIs:
  
	- Select the  **SIGN IN**  link located in the upper right corner of the [Dolby.io](https://dolby.io) page. 
     - Log in using your email and password.
     - Sign-in will bring you to the applications summary page.
     - Create a new application and/or select an existing application.
     - When you select the application name, that will display your API keys. 
  
## Step Two: Set your Developer (Client) Token:
This app requires a Developer Token, you will ned to generate a client token and update **/scripts/constants.js** file.
  1. How to generate a token:  
     - First create an Auth2 token, this token can be created by going to the [Dolby.io Application Summary page](https://dashboard.dolby.io) selecting an app, clicking on the API keys link, then copying your application's API **Consumer Key** and **Consumer secret** somewhere convenient.  
     - Next go to our [REST API Documentation](https://docs.dolby.io/communications-apis/reference/get-client-access-token) and follow the instructions to create the client access token using the code example tool. 
     - The default token expires in 3600 milliseconds or about 1 hour, just enough time to try out this app.  You may optionally to adjust the expriation time to a longer amount of time when you create your own developer client token.
  2. Open **/scripts/constants.js** and if missing, replace the **apiToken** value with your developer token.
  3. Run your app! 
      ```
      VS Code: Select the index.html file and run with live server.
      ```
  Congrats! You've just deployed your first Dolby.io Communication API video conference app!