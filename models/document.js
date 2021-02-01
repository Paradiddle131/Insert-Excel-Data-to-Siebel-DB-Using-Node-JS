// const dbConfig = require("../config/db.config.js");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(process.env.SIEBEL_DATABASE, process.env.SIEBEL_USERNAME, process.env.SIEBEL_PASSWORD, {
//     host: process.env.SIEBEL_HOST,
//     port: process.env.SIEBEL_PORT,

// });

// // const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
// //     host: dbConfig.HOST,
// //     dialect: dbConfig.dialect,
// //     operatorsAliases: false,

// //     pool: {
// //         max: dbConfig.pool.max,
// //         min: dbConfig.pool.min,
// //         acquire: dbConfig.pool.acquire,
// //         idle: dbConfig.pool.idle
// //     }
// // });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.tutorials = require("./document.model.js")(sequelize, Sequelize);

// module.exports = db;