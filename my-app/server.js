// require the importent stuff for server and start it in port 8001
const express = require('express');
const cors = require("cors");
const path = require('path')
const Router= require("./router.js");
const { printTime, bodyParser, authenticate } = require('./middleware.js');
const app = express();
const normalizePort =port =>parseInt(port,10);
const port = normalizePort(process.env.PORT || 8001);
// to buld the app and push it in heroku
app.use(express.static(path.join(__dirname, "/build")))
app.use(printTime);
app.use(bodyParser);
app.use(cors()); //Allow cross origin requests (browser security lecture)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use("/",Router.router)

app.listen(port,err=>{
    if(err) throw err
    console.log('oday server started',port)
})
