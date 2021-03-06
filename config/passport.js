var http = require('http');
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();
var parseString = require('xml2js').parseString;
global.LDAP_USERNAME = "";

function getXml(username, password) {
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://wsserver">
    <soapenv:Header/>
    <soapenv:Body>
    <wss:checkAuthentication>
        <wss:wsUserId>LDMLDAP</wss:wsUserId>
        <wss:wsPassword>ldmvdfldap</wss:wsPassword>
        <wss:userName>` + username + `</wss:userName>
        <wss:password>` + password + `</wss:password>
        <wss:domainName>nsi</wss:domainName>
    </wss:checkAuthentication>
    </soapenv:Body>
    </soapenv:Envelope>`
}

var options = {
    host: process.env.LDAP_HOST,
    port: process.env.LDAP_PORT,
    path: process.env.LDAP_PATH,
    method: 'POST',
    headers: {
        'Content-Type': 'application/xml',
        'SOAPAction': ''
    }
};

module.exports = function (passport) {
    var localStrategyHandler = function (username, password, done) {
        var data = getXml(username, password);
        var req = http.request(options, function (res) {
            var msg = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                msg += chunk;
            });
            res.on('end', function () {
                parseString(msg, function (err, result) {
                    result_parse = JSON.parse(JSON.stringify(result));
                    result_ldap = result_parse['soapenv:Envelope']['soapenv:Body'][0]
                        .checkAuthenticationResponse[0].checkAuthenticationReturn[0]
                        .ldapResults[0].ldapResults[0].description[0] === 'LDAP Account : OK';
                    console.log(result_ldap);
                    if (result_ldap) {
                        done(null, username);
                    } else {
                        done(null, false, 'Invalid credentials');
                    }
                });
            });
        });
        req.write(data);
        req.end();
    };
    passport.use(new LocalStrategy(localStrategyHandler));
    passport.serializeUser(function (username, done) {
        LDAP_USERNAME = username;
        done(null, username);
    });

    passport.deserializeUser(function (username, done) {
        done(null, username);
    });
};