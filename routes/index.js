const express = require('express');
const router = express.Router();
const upload_module = require("../middleware/upload");
const upload = upload_module.upload;


router.get('/', (req, res) => {
    res.redirect('/users/login');
})

// router.get('/upload', ensureAuthenticated, (req, res) => {
router.get('/upload', (req, res) => {
    res.render('upload');
})

var file_json = require('../middleware/xls_to_json');
    
// router.post("/upload", ensureAuthenticated, upload.single("file"), (req, res) => {
router.post("/upload", upload.single("file"), (req, res) => {
    res.render('upload', {
        file_originalname: req.file.originalname,
        table_url: process.env.HOSTNAME + ":" + process.env.PORT + "/table"
    });
});

// router.get("/table", ensureAuthenticated, (req, res) => {
    router.get("/table", (req, res) => {
    res.render("table", {
        columns: Object.keys(file_json.getFile().Sheet1[0]),
        rows: file_json.getFile().Sheet1
    })
});

module.exports = router;