TO DO: 


Update access and refresh token expiry times. 
Populate the website with users and give them some skills

README
👤
&#9776; ☰


MAYBE: 
TARTE AU CITRON
CAPTCHA

# SUMMARY

back folder: a node.js server connected to a MongoDB database with the following dependencies: argon2, cookie-parser, cors, dotenv, express, express-rate-limit, jsonwebtoken, mongoose, multer cloudinary multer-storage-cloudinary

front folder: vanilla html/css/javascript that links to the routes in the backend 

This code is designed to be used as starter code for projects that have users that will need to be authorised and authenticated. Both the front and backend code will most likely need to be adapted to your specific project (but it gives a solid base so that you dont have to start from scratch). 

## BACK:
- has a User model (mongoose schema - (see './back/models/User.js`)
- has users routes (register (CREATE), modify (UPDATE), delete (DELETE) as well as getAll should it be required. There is no getUserById.) - (see './back/routes/userRoutes.js` and './back/controllers/userControllers.js`)
- has auth routes (login (POST), logout (POST) and refresh (GET) using a refreshToken to get a new accessToken) - (see './back/routes/authRoutes.js` and './back/controllers/authControllers.js`)
- allows the protection of certain routes controlled using jwt access and refresh tokens (see `./back/middleware/verifyJWT.js`) 
- allows user roles by sending username and user roles in the refreshToken in the cookie.
- uses `express-rate-limit` to disuade users trying to guess passwords (see `./back/middleware/loginLimiter.js`)

> [!NOTE]
- DELETE USER (CODE SHOULD BE UPDATED SO THAT A USER CANNOT DELETE THEMSELVES...)
- UPDATE USER (CODE REQUIRES YOU TO PROVIDE ALL USER FIELDS EXCEPT PASSWORD - MAYBE UPDATE CODE SO YOU CAN SELECT WHICH FIELDS TO SEND / UPDATE)

## FRONT: 
- fetches for the backend routes (see './front/fetches/authFetches' and './front/fetches/userFetches') 
- HTML forms with labels / inputs / submits / ids and other relevant attributes to verify the data provided by a user (see './front/index.html') 
- frontend form submission validation logic in javascript for ID, USERNAME, EMAIL and PASSWORD inputs including REGEX (see './front/formLogic/formLogic.js')
- example decoding of the refresh cookie in React in order to get a user's roles (see './front/userRolesExampleReactComponent')

> [!NOTE]
- Example code of how to access and use 'user roles' is included in './front/userRolesExampleReactComponent' but this logic is not incorperated into this project.

# HOW TO USE

## TEST THE CODE 
- Clone the Git repository into your IDE or download the zip folder of the project and open the extracted folder in your IDE.

### BACKEND
- In the terminal navigate to the folder in your project where the package.json for the backend is located ('/back').

> [!IMPORTANT]
- create a .env file in the back folder with the following variables (you will need to create your own mongoDB database and collection and use the connection string provided for `DATABASE_URI`): 
```
NODE_ENV=development
DATABASE_URI=mongodb+srv://connorsexton:ElbidHXFWTAn7Um8@cluster0.opeis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ACCESS_TOKEN_SECRET=248d959590237cb375c2141f45021c6623277dbe894c3f11efe5371b60643583668fd0690ff48eab7fd0d0c04a709b05a68b69e41f67aa672d21d9de1a40b753
REFRESH_TOKEN_SECRET=4d811e30aa0927baa08efc5917ea12f0dd70a9e4e081c4616aa43279e197b704d47263feac8bf5147947b3166437199bea2e8e25e4ac81923843d713540463c7
PORT=4000
```

> [!TIP]
- In terminal type `node`
- require('crypto').randomBytes(64).toString('hex')
- This will give you a random code to use as the access and refresh tokens secrets keys

- Install dependencies
  ```bash
  npm install 
  ```
- Start the app
  ```bash
  npm start
  ```

- Either deploy your frontend on port 5500 or add your frontend's localhost address to the corsOptions variable (back/config/allowedOrigins.js).

### FRONTEND
- Open the `./Code/front/index.html` file in your web browser (either on port 5500 or having updated the backend code as per the instruction above).

> [!TIP]
- The refresh route is only set for when you initially load the page. 
- Once your front and back end are up and running locally if you have not changed the expiry time for your accessToken token (1 minute) then you will get the "Unauthorized" or "Forbidden" response on the protected routes pretty quickly.
- You can change the accessToken expiry time when running locally to avoid this.
- You should update your fetchs' logic for your own project to check the refresh route before returning these messages to the user (it may just be that a new accessToken is required).   

## USE THE CODE IN YOUR PROJECT AND DEPLOYMENT / PRODUCTION
### BACK: 
Copy and paste the code in the back folder into your project and follow the instructions in the "TEST CODE" section above to get it running. 

To adapt the code to your project in development: 
- see the comments in the server.js file on how to add the jwtVerify middleware to your routes

Before going to production / deploying your project online: 
- There is a handy NODE_ENV secret key set to development - if you deploy your project you can change this to production as a reminder that the code may no longer work / be suitable locally.
- remove || !origin from './config/corsOptions'
- update the access and refresh token expiry times (in the './controllers/authController' file) as advised in the comments

### FRONT
Copy and paste anything that may be relevant into your project and update as required (for example you will need to update the urls of the fetches so that calls are made to your server and adapt the various forms' HTML and their js verification logic). 

# WHAT THIS CODE PROVIDES
mongoose schema for a User model ('./models/User.js) - which contains username, password, email, roles and active fields (update this as you require)
userRoutes ('/users') with following methods in the userController:
GET getAllUsers
POST createNewUser
PATCH updateUser
DELETE deleteUser (this function ('./controllers/userController')) needs to be updated with any other database info (specific to your project) associated with this user being deleted at the same time.  

authRoutes ('/auth') with following methods in the authController:
('/') POST login: send the username and password in the body. A succesful response sends the accessToken in the body and refreshToken is set automatically in the cookie 
('/refresh') GET refresh: issues a new accessToken assuming a valid refresh token
('/logout') POST logout: removes the refreshToken from the cookie

# WHAT TO DO ON THE FRONTEND
## LOGOUT
The easist of the routes: 
A logout button that sends a POST request to the /auth/logout route. Nothing to add in the body or the header. Either there was no jwt refresh token in the header to begin with or it is removed. 
Upon receipt of response you should re-direct the user to the home / login page (if working in React you should clear relevant state eg accessToken). 

## LOGIN
Send the username and password in the body of the request to the post  

## REFRESH
When accessing protected routes (as per the below) you need to check the response. If the accessToken is expired you need to send a GET request to the auth/refresh route. 
Either you will get a new accessToken and you can retry your protected route. Or your refresh token is expired and the user is going to have to log back in.  

## ACCESSING ANY ROUTE WHICH IS PROTECTED BY JWT: 
headers.set("authorization", `Bearer ${accessToken}`) //assuming you are in React and getting the accessToken from the state