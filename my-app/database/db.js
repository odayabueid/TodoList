

const Sequelize = require("sequelize");
var mysql = require('mysql')
//Database connection
// const db = new Sequelize("x8FEnBCOLn", "x8FEnBCOLn", 'LmiuJP0yon', {
//     host:"remotemysql.com",
//     dialect: 'mysql',
// })

const db = new Sequelize("cqKKB9vyiL", "cqKKB9vyiL", '8pAoEG8TV4', {
        host:"remotemysql.com",
        dialect: 'mysql'
    })


db.sync({ force: false, logging: false  }).then(() => {
    console.log("Database & tables created!")
});

module.exports.db = db;
module.exports.Sequelize = Sequelize;