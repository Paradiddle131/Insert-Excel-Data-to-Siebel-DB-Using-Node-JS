const express = require('express');
const app = express();
const session = require('express-session');
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const favicon = require('serve-favicon');
app.use(express.static('public'));
const passport = require('passport');
require("./config/passport")(passport)

global.__basedir = __dirname + "/";

var db = require('./config/db');
db.initializeOracleClient();

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
app.use(favicon(__dirname + '/public/images/favicon.ico'));
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

const server = app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log('listening on port %s...', server.address().port);
});