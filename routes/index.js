const express = require('express');
const router = express.Router();
const upload_module = require("../middleware/upload");
const upload = upload_module.upload;
const { ensureAuthenticated } = require("../config/auth.js");

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/upload');
    }
    res.redirect('/users/login');
})

router.get('/upload', ensureAuthenticated, (req, res) => {
    global.USER_IP = req.connection.remoteAddress;
    res.render('upload');
})

var xls_to_json = require('../middleware/xls_to_json');
var db = require('../config/db');

router.post("/upload", ensureAuthenticated, upload.single("file"), (req, res) => {
    res.render('upload', {
        file_originalname: req.file.originalname,
    });
});

router.get("/table", ensureAuthenticated, async (req, res) => {
    const document = await db.getDocument();
    var headers = [];
    document.metaData.forEach(header => {
        headers.push(header.name);
    });
    res.render("table", {
        columns: headers,
        rows: document.rows
    })
});

router.get("/uploadedSheet", ensureAuthenticated, (req, res) => {
    res.render("table", {
        columns: Object.keys(xls_to_json.getFile().Sheet1[0]),
        rows: xls_to_json.getFile().Sheet1
    })
})

router.get("/sampleTable", ensureAuthenticated, async (req, res) => {
    const document = await db.getSampleDocument();
    var headers = [];
    document.metaData.forEach(header => {
        headers.push(header.name);
    });
    res.render("table", {
        columns: headers,
        rows: document.rows
    })
});


router.get("/export_as_excel", ensureAuthenticated, async (req, res) => {
    var download_module = require("../middleware/download");
    downloadFileName = await download_module.getExcelFile();
    console.log(downloadFileName);
    res.download(downloadFileName);
});

module.exports = router;