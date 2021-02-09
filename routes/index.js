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

var xls_to_json = require('../middleware/xls_to_json');
var db = require('../config/db');

// router.post("/upload", ensureAuthenticated, upload.single("file"), (req, res) => {
router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.connection.remoteAddress);
    console.log(ldap_username);
    res.render('upload', {
        file_originalname: req.file.originalname,
    });
});

// router.get("/table", ensureAuthenticated, (req, res) => {
router.get("/table", async (req, res) => {
    const document = await db.getDocument();
    console.log(document);
    var headers = [];
    document.metaData.forEach(header => {
        headers.push(header.name);
    });
    res.render("table", {
        columns: headers,
        rows: document.rows
    })
});

router.get("/uploadedSheet" ,(req, res) => {
    res.render("table", {
        columns: Object.keys(xls_to_json.getFile().Sheet1[0]),
        rows: xls_to_json.getFile().Sheet1
    })
})

module.exports = router;