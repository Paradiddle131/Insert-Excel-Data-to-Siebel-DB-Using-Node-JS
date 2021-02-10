const dbConfig = require("./db.config.js");
const oracledb = require('oracledb');
oracledb.autoCommit = true;
var connection;

exports.initializeOracleClient = function () {
    try {
        oracledb.initOracleClient({ libDir: process.env.PATH_ORACLE_INSTANT_CLIENT });
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

exports.getDocument = async function () {
    if (!connection) var connection = await connectDb();
    let query = `SELECT * FROM SIEBEL.EBU_USER_EXCEL_INSERT WHERE USER_IP='${USER_IP}' ORDER BY msisdn`;
    console.log(query);
    const result = await connection.execute(query);
    return result;
}

exports.getSampleDocument = async function () {
    if (!connection) var connection = await connectDb();
    let query = `SELECT * FROM SIEBEL.EBU_USER_EXCEL_INSERT WHERE rownum<25 ORDER BY msisdn`;
    const result = await connection.execute(query);
    return result;
}

function fixKeys(keys) {
    var mapObj = {
        GSM: "MSISDN",
        AD: "NAME",
        SOYAD: "SURNAME",
        "KİMLİK SERİ NO": "ID_SERI_NO",
        TC: "TC_ID",
        "BABA ADI": "FATHER_NAME",
        "DOGUM YERİ": "BIRTH_PLACE",
        "DOĞUM TARİHİ": "BIRTH_DATE"
    };
    return keys.replace(/GSM|AD|SOYAD|KİMLİK SERİ NO|TC|BABA ADI|DOGUM YERİ|DOĞUM TARİHİ/gi, function (matched) {
        return mapObj[matched];
    });
}

exports.insertDocument = async function (dict) {
    if (!connection) var connection = await connectDb();
    if (USER_IP !== "") dict["USER_IP"] = USER_IP;
    if (LDAP_USERNAME !== "") dict["USER_NAME"] = LDAP_USERNAME;
    var keys = ""; var values = "";
    Object.keys(dict).forEach((key, i, arr) => {
        if (key !== "MUSTERI NO" && key !== "KULLANICI ADI") {
            if (!arr[i + 1]) {
                if (key === "DOĞUM TARİHİ") {
                    values += "'" + dict[key].toLocaleDateString("tr-TR") + "'";
                } else {
                    values += "'" + dict[key] + "'";
                }
                keys += key;
            } else {
                if (key === "DOĞUM TARİHİ") {
                    values += "'" + dict[key].toLocaleDateString("tr-TR") + "', ";
                } else {
                    values += "'" + dict[key] + "', ";
                }
                keys += key + ", ";
            }
        }
    });
    keys += ", PROCESSED_DATE, IS_PROCESSED, IS_MERNIS_VERIFIED";
    values += ", sysdate, 'S', 'Y'";
    keys = keys.trim();
    values = values.trim();
    keys = fixKeys(keys);
    let query = `INSERT INTO SIEBEL.EBU_USER_EXCEL_INSERT (${keys}) VALUES (${values})`;
    console.log(query);
    const result = await connection.execute(query);
    console.log("Rows inserted: " + result.rowsAffected);
    console.log("ROWID of new row: " + result.lastRowid);
}