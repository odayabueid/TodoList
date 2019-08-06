const Sequelize = require("sequelize");

//Database connection
const db = new Sequelize('todoList', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql',
})

db.sync({ force: false, logging: false  }).then(() => {
    console.log("Database & tables created!")
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;