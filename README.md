# Typescript-Authentication Demo With JWT & Session 

## Description
The project creates a user info and saves it into local mongo database with /register route, creates sessionID and JWT Token with post to /login route and then checks the credentials at get /users route.

![authhome](https://user-images.githubusercontent.com/61908293/150197444-e7876236-ef1e-49f6-93e9-254ed4a0bc33.png)

## How It Works
After a user is registered, user can now login fron the /login route. The login route creates a JWT token and a sessionID which includes the username. 

Logged in users can now access /users route to check their info. Info consists the name, surname, username, sessionID, JWT token, JWT initiation and expiration date. 

/users route checks for JWT Token & session with middlewares. If one of them expired, user cannot access to /users route and must login again. 

Session info can be checked via req.session and JWT Token is sent via res.cookie to the client.

/users page renders the current user's info

### Main dev tools used:

`NodeJS & ExpressJS` - `MongoDB` - `Typescript` - `EJS`

### Installation
Use the package manager **npm** to deploy dependencies after clonening the project.

<<<<<<< HEAD
- _**MUST** have MongoDB installed in your local_

=======
>>>>>>> e236aea1f5ccf2a96c1b151107a6cbe0ceb58c4f
```bash
npm install 
```
### Usage

```bash
npm run dev
```
<<<<<<< HEAD
=======
- _**MUST** have MongoDB installed in your local_

>>>>>>> e236aea1f5ccf2a96c1b151107a6cbe0ceb58c4f
Then go to **localhost:3000** to test it out.

### .env
.env file contains the following; Replace the **XXXX** as you wish.
- ACCESS_TOKEN_SECRET=XXXX
- PORT=3000
- MONGO_DB_URL=mongodb://localhost:27017/XXXX

### License
<<<<<<< HEAD
[MIT](https://choosealicense.com/licenses/mit/)
=======
[MIT](https://choosealicense.com/licenses/mit/)
>>>>>>> e236aea1f5ccf2a96c1b151107a6cbe0ceb58c4f
