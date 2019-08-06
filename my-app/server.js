const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const Router= require("./router.js");
const { printTime, bodyParser, authenticate } = require('./middleware.js');
const { SECRET_KEY, DATABASE_URL } = require('./secret.js');
const { HTTP_CREATED, HTTP_UNAUTHORIZED, HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } = require('./constants.js');
const { Place, User } = require('./database/models.js');

const app = express();
const port = process.env.PORT || 8001;

//Middleware
app.use(printTime);
app.use(bodyParser);
app.use(cors()); //Allow cross origin requests (browser security lecture)

app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use("/",Router.router)

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});