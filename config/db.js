const dbConfig = require("./db.config.js");
const oracledb = require('oracledb');

exports.initializeOracleClient = function() {
    try {
    oracledb.initOracleClient({libDir: process.env.PATH_ORACLE_INSTANT_CLIENT});
    } catch (err) {
    console.error("Couldn't initialize Oracle Instant Client.");
    console.error(err);
    process.exit(1);
    }
}

async function connectDb() {
    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection(dbConfig);
      console.log('Oracle DB connection was successful!');
      return connection
    } catch (err) {
      console.error(err);
    } 
    // finally {
    //   if (connection) {
    //     try {
    //       await connection.close();
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    // }
  }

exports.getDocument = async function() {
    var connection = await connectDb();
    let query = `SELECT * FROM SIEBEL.EBU_USER_EXCEL_INSERT WHERE rownum<25 ORDER BY msisdn`;
    const result = await connection.execute(query);
    // console.log("Executed: " + query);
    // console.log("Number of rows returned: " + result.rows.length);
    // console.log(result.rows);
    return result;
}

exports.insertDocument = async function(dict) {
    var connection = connectDb();
    var keys = ""; var values = "";
    for (var key in j) {
        keys += key + " ";
        values += j[key] + " ";
    }
    keys = keys.trim();
    values = keys.trim();
    let query = `INSERT INTO SIEBEL.EBU_USER_EXCEL_INSERT (${keys}) VALUES (${values})`;
    const result = await connection.execute(query);
    console.log("Rows inserted: " + result.rowsAffected);
    console.log("ROWID of new row: " + result.lastRowid);
}