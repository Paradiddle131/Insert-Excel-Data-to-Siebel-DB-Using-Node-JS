module.exports = {
    user: process.env.SIEBEL_USER,
    password: process.env.SIEBEL_PASSWORD,
    connectString: process.env.SIEBEL_HOST + ":" + process.env.SIEBEL_PORT + "/" + process.env.SIEBEL_SERVICE_NAME,
    externalAuth: false
}

// module.exports = {
//     HOST: process.env.SIEBEL_HOST,
//     USER: process.env.SIEBEL_USER,
//     PASSWORD: process.env.SIEBEL_PASSWORD,
//     DB: process.env.SIEBEL_DB,
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }

// }