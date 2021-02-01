const express = require('express');
const app = express();
const session = require('express-session');
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
app.use(express.static('public'));
const passport = require('passport');
require("./config/passport")(passport)

global.__basedir = __dirname + "/";
// global.__basedir = __dirname + "/..";

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({
    extended: false
}));
//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// authenticate
app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// console.log("ldap_auth -> " + typeof ldap_auth);
// console.log("ldap_auth -> " + ldap_auth);
// console.log("result_ldap -> " + result_ldap);

const server = app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log('listening on port %s...', server.address().port);
});