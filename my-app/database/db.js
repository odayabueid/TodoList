
// define a sequalize database
const Sequelize = require("sequelize");
var mysql = require('mysql')
// connect online database
const db = new Sequelize("cqKKB9vyiL", "cqKKB9vyiL", '8pAoEG8TV4', {
        host:"remotemysql.com",
        dialect: 'mysql'
       })

      db.sync({ force: false, logging: false  }).then(() => {
        console.log("Database & tables created!")
      });

module.exports.db = db;
module.exports.Sequelize = Sequelize;