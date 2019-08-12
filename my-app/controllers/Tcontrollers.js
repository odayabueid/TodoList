db = require('../database/models.js')
const jwt = require('jsonwebtoken');
const { SECRET_KEY, DATABASE_URL } = require('../secret.js');

const bcrypt = require("bcrypt")
const { HTTP_UNAUTHORIZED, HTTP_SERVER_ERROR } = require('../constants.js')

//Create new user in the database

exports.createUser = function(req,res){
 const uname = req.body.username;
 const pass = req.body.password;
 const hashedPassword = bcrypt.hashSync(pass, 10);
    db.User.create({
        username:uname,
        password:hashedPassword 
    }).then(user =>{
        res.send("Sign up successful")
    }).catch(err =>{
        if(err.name === "SequelizeUniqueConstraintError"){
            return res.status(HTTP_BAD_REQUEST).send('This username is already taken');
        }
        return res.status(HTTP_SERVER_ERROR).send('hello Error');
    })
};

exports.findUser = function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    db.User.findOne({where: {username: username}
    }).then(user =>{
        if(!user){
            return res.status(HTTP_UNAUTHORIZED).send({error: 'Please sign up'}); 
        }
        const existingHashedPassword = user.password;
        
        bcrypt.compare(password, existingHashedPassword).then(function(isMatching){
            if(isMatching){
                //Create a token and send to client
                const token = jwt.sign({username: user.username}, SECRET_KEY, {expiresIn: 4000});
                return res.send({token: token});
            } else {
                return res.status(HTTP_UNAUTHORIZED).send({error: 'Wrong password'});
            }
        });

    })
}

exports.createTodo = function(req,res){
    db.User.findOne({
        where:{username:req.body.username}
    }).then(user=>{
        console.log(user)
        user.createList({
            todo:req.body.todo,
            createdate:req.body.createdate
        })
    }).then(list =>{
        res.send("Todo created")
    }).catch(err =>{
        console.log('Error is',err)
    })
};

exports.deleteTodo = function(req, res) {
	db.User.findOne({
        where:{username:req.body.username}
    }).then(user =>{
		db.List.destroy({where:{id:req.body.id}}).then(todo =>{
				res.send("deleted")
		})
    }).catch(err =>{
        console.log(err)
    })
};

exports.retrieveTodos= function(req,res){ // retriev all Todos of specific user
	db.User.findOne({
        where:{username:req.query.username}
    }).then(user =>{
        user.getLists().then(todos => {
			res.send(todos)
		})
    }).catch(err =>{
        console.log(err)
    })
 };

 exports.updateTodo = function(req, res) {  
	db.List.update({
		todo:req.body.todo
		},{where:{id:req.body.id}}
		).then(()=>{
			res.send("updated successfully for this todo")
		}).catch(err =>{
            console.log(err)
        })
};