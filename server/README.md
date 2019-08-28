### Server
The server is a NodeJS application written in JavaScript.

### Technologies/Frameworks
* [NPM](https://www.npmjs.com/)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mocha](https://mochajs.org/)
* [Here Api](https://developer.here.com/)

### Setup
1. Install latest version of [NPM](https://www.npmjs.com/)
2. Install latest version of [NodeJS](https://nodejs.org/en/)
2. Install latest version of [MongoDB Community Server](https://www.mongodb.com/download-center/community)
3. be in `/server`
4. run `npm i`
5. Create a local-config.json file with the following pattern
    ```json

    {
      "mongodbUrl" : "mongodb://localhost:27017/ExamplePropertyProject",
      "mongodbTestUrl" : "mongodb://localhost:27017/ExamplePropertyProjectTest",
      "hereAppId" : "EXAMPLE_HERE_APP_ID",
      "hereAppCode" : "EXAMPLE_HERE_APP_CODE"
    }

   ````
  Here you can get [Here Api credentials](https://developer.here.com/)

### Start Server
1. Make sure `mongod` process of MongoDB is running
2. run `npm start`
3. Server endpoint is now `http://127.0.0.1:8080/`

### Run tests
1. Run `npm install --global mocha`
2. Make sure `mongod` process of MongoDB is running
3. Run `npm test`

### Web Application usage
Open `http://127.0.0.1:8080/` in Browser

### API usage
* Endpoint `http://127.0.0.1:8080/`
* `/users/USER_ID/bookings` will return bookings made by a specific user with a user id `USER_ID` 
* `/propeties/PROPERTY_ID/bookings` will return bookings made for a property with a property id `PROPERTY_ID`
You can find out these ids by looking up the `mongodbUrl` with a MongoDB client.
The collections are `users` and `properties` and the id keys are in both cases `_id`.

