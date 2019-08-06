const router= require("express").Router()
const Controllers = require('./controllers/Tcontrollers.js')
const db = require('./database/models.js')
const bcrypt = require("bcrypt")


router.route("/signup").post((req,res)=>{
    Controllers.createUser(req,res)
})

router.route("/signin").post((req,res)=>{
    Controllers.findUser(req,res)
})

module.exports.router=router
