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

router.route("/addTodo").post((req,res)=>{
    Controllers.createTodo(req,res)
})

router.route("/deleteTodo").delete((req,res)=>{
    Controllers.deleteTodo(req,res)
})

router.route("/retriveTodos").get((req,res)=>{
    Controllers.retrieveTodos(req,res)
})

router.route("/updateTodo").put((req,res)=>{
    Controllers.updateTodo(req,res)
})


module.exports.router=router
