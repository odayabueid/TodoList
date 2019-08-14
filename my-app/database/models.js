// create two tables List and User  and make a relation between them  
const { db, Sequelize } = require("./db.js");
// list table has todo and createdate
const List = db.define('list', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    todo: {type: Sequelize.STRING, required: true},
    createdate: {type: Sequelize.STRING, required: true}
})
// user table has username and password
const User = db.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: Sequelize.STRING, required: true, unique: true},
    password: {type: Sequelize.STRING, required: true}
});
// user has many todos 
User.hasMany(List);
List.belongsTo(User); //Add userId foreign key to Place


module.exports.List = List;
module.exports.User = User;