const router= require("express").Router()
const Controllers = require('./controllers/Tcontrollers.js')
const db = require('./database/models.js')
const bcrypt = require("bcrypt")

// signup router to create a new user
router.route("/signup").post((req,res)=>{
    Controllers.createUser(req,res)
})
// signin router to find a user
router.route("/signin").post((req,res)=>{
    Controllers.findUser(req,res)
})
// addtodo router to create a new todo
router.route("/addTodo").post((req,res)=>{
    Controllers.createTodo(req,res)
})
// deletetodo router to delete specific todo
router.route("/deleteTodo").delete((req,res)=>{
    Controllers.deleteTodo(req,res)
})
// retriveTodos router to retrive all todos
router.route("/retriveTodos").get((req,res)=>{
    Controllers.retrieveTodos(req,res)
})
// updatetodo router to update a specific todo
router.route("/updateTodo").put((req,res)=>{
    Controllers.updateTodo(req,res)
})


module.exports.router=router
