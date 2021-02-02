const multer = require("multer");
const excelToJson = require('convert-excel-to-json');
const path_folder = __basedir + "data/uploads";
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const express = require('express');
const router = express.Router();
var app = express()
function convert_to_json(path_file){
    return excelToJson({
        sourceFile: path_file,
        header:{
            rows: 1 // skip header
        },
        // sheets: ["gsm"],
        columnToKey: {
        	A: '{{A1}}',
            B: '{{B1}}',
            C: '{{C1}}',
            D: '{{D1}}',
            E: '{{E1}}',
            F: '{{F1}}',
            G: '{{G1}}',
            H: '{{H1}}',
            I: '{{I1}}',
            J: '{{J1}}'
        },
        // columnToKey: {
        // 	A: 'GSM',
        //     B: 'username',
        //     C: 'name',
        //     D: 'surname',
        //     E: 'id_serial_no',
        //     F: 'tckn',
        //     G: 'father_name',
        //     H: 'birth_place',
        //     I: 'birth_date',
        //     J: 'customer_no'
        // }
    });
}

const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
};

var file_json = require('./xls_to_json');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_folder);
    },
    filename: (req, file, cb) => {
        const file_name = `${Date.now()}-${file.originalname}`;
        cb(null, file_name);
        sleep(1500).then(() => {
            file_json.setFile(convert_to_json(path_folder + "/" + file_name));
        });
    },
});

var uploadFile = multer({
    storage: storage,
    fileFilter: excelFilter
});

module.exports = {
    upload: uploadFile,
}