const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/upload',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/users/login');
})

module.exports = router;