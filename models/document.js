const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const oracledb = require('oracledb');

try {
  oracledb.initOracleClient({libDir: process.env.PATH_ORACLE_INSTANT_CLIENT});
} catch (err) {
  console.error("Couldn't initialize Oracle Instant Client.");
  console.error(err);
  process.exit(1);
}

async function run() {
    let connection;
    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection(dbConfig);
      console.log('Oracle DB connection was successful!');
      let query = ```SELECT * FROM SIEBEL.EBU_USER_EXCEL_INSERT WHERE rownum<5 ORDER BY msisdn```
      const result = await connection.execute(
        query,
        { offset: 0, maxnumrows: 3 },
        { prefetchRows: 3 + 1, fetchArraySize: 3 }
      );
      console.log("Executed: " + sql);
      console.log("Number of rows returned: " + result.rows.length);
      console.log(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
run();



const sequelize = new Sequelize(process.env.SIEBEL_DATABASE, dbConfig.SIEBEL_USERNAME, dbConfig.SIEBEL_PASSWORD, {
    host: dbConfig.SIEBEL_HOST,
    port: dbConfig.SIEBEL_PORT,
});

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./document.model.js")(sequelize, Sequelize);

module.exports = db;