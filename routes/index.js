const express = require('express');
const router = express.Router();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const upload_module = require("../middleware/upload");
const upload = upload_module.upload;
const file_json = upload_module.file_json_converted;
const excelController = require("../controllers/excel.controller");
// var multer = require("multer");
// var upload = multer();

const {
    ensureAuthenticated
} = require("../config/auth.js")

router.get('/', (req, res) => {
    res.redirect('/users/login');
})

router.get('/upload', ensureAuthenticated, (req, res) => {
    res.render('upload');
})

router.post("/upload", ensureAuthenticated, upload.single("file"), (req, res) => {
    console.log("file_json:");
    console.log(file_json);
    res.render('upload');
});

router.get('/table', (req, res) => {
    res.render('table');
})

// router.post("/upload", ensureAuthenticated, upload.single("file"), excelController.upload);

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + "/storage/");
//     //   cb(null, '../data/uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//     }
//   })
  
// var uploaded = multer({ storage: storage });

// router.post("/upload", ensureAuthenticated, upload.single("file"), function (req, res, next) {
//     console.log("REQ FILE ON INDEX.JS:");
//     console.log(req.file);
//     console.log(req.body);
// })

// router.post("/upload", uploaded.single("file"), (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//         const error = new Error('Please choose file')
//         error.httpStatusCode = 400
//         return next(error)
//       }
//         res.send(file)
// });

// router.get("/documents", excelController.getTutorials);

/*router.post('/upload', upload.single('file'), function (req, res) {
    console.log("REQ FILE ON INDEX.JS:");
    console.log(req.file);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '../data/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
      })
      
    var uploaded = multer({ storage: storage });
    console.log(uploaded);

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