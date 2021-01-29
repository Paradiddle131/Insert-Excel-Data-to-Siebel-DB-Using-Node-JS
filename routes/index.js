const express = require('express');
const router = express.Router();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const upload = require("../middleware/upload");

const {
    ensureAuthenticated
} = require("../config/auth.js")

router.get('/', (req, res) => {
    res.redirect('/users/login');
})

router.get('/upload', ensureAuthenticated, (req, res) => {
    res.render('upload');
})

// router.post("/upload", upload.single("file"), excelController.upload);

// router.get("/documents", excelController.getTutorials);

/*router.post('/upload', ensureAuthenticated, upload.single('fileName'), (req, res) => {
    var form = new formidable.IncomingForm();
    form.multiples = false;
    form.uploadDir = '/data/uploads/';
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
            if (err) throw err;
            const file_path = '/data/uploads/'+file.name
        });
      });
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function() {
        res.statusMessage = "Process cashabck initiated";
        res.statusCode = 200;
        // res.redirect('/')
        res.end()
   });
   form.parse(req, function(err, fields, file){ 
  
    var oldPath = file.path; 
    var newPath = path.join(__dirname, '/data/uploads') 
            + '/' +file.name 
    var rawData = fs.readFileSync(oldPath) 
    console.log("oldPath -> " + oldPath);
    console.log("rawData -> " + rawData);
  
    fs.writeFile(newPath, rawData, function(err){ 
        if(err) console.log(err) 
        return res.send("Successfully uploaded") 
        })
    })


//    var result = form.parse(req);
//    console.log(typeof result);
//    console.log(result);
//    fs.write(result);


    res.render('upload', {
        user: req.users
    });
})*/

module.exports = router;