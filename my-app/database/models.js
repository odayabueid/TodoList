    
const { db, Sequelize } = require("./db.js");

const List = db.define('list', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    todo: {type: Sequelize.STRING, required: true},
    createdate: {type: Sequelize.STRING, required: true}
})

const User = db.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: Sequelize.STRING, required: true, unique: true},
    password: {type: Sequelize.STRING, required: true}
});

User.hasMany(List);
List.belongsTo(User); //Add userId foreign key to Place


module.exports.List = List;
module.exports.User = User;