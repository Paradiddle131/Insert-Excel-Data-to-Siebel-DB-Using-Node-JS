module.exports = {
    user: process.env.SIEBEL_USER,
    password: process.env.SIEBEL_PASSWORD,
    connectString: process.env.SIEBEL_HOST + ":" + process.env.SIEBEL_PORT + "/" + process.env.SIEBEL_SERVICE_NAME,
    externalAuth: false
}