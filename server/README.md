# Explore ₿tc [nestjs](https://nestjs.com/) server.
It's expected that software dependencies were installed and have configured to run on signet (Bitcoin core and Electrs).

# Server Installation Guide
- It is expected that [nodejs](https://nodejs.org/en/download/) and node package manager is istalled.
- Create a .env file.
- Copy the variables in the .envexample to the .env file
- Fill the necessary information
  - PORT the port you want your nestjs to listen to default is 3000
  - CLIENT_ORIGIN is the array of origins you will allow to have access to the api, default is "*" which means all, but you will want to change that for security reasons if you are going to run in production, but accepting it's will suffice for education and development.
  - URL is the bitcoin rpc url e.g  http://username:password@host:port/
  - ELECTR_PORT the port your running electrs server is listening to, e.g 50001
  - ELECTR_HOST is the host of your electrs if it's installed in your local machine its 127.0.0.1 or the host of your remote host if it's hosted remote..


```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
''