const multer = require("multer");
const XlsxPopulate = require("xlsx-populate");
const excelToJson = require('convert-excel-to-json');
const path_folder = __basedir + "data/uploads";
const path_decrypted = path_folder + "/decrypted.xlsx";
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

function convert_to_json(path_file) {
    return excelToJson({
        sourceFile: path_file,
        header: {
            rows: 1 // skip header
        },
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
        }
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

var xls_to_json = require('./xls_to_json');
var db = require('../config/db');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_folder);
    },
    filename: (req, file, cb) => {
        const file_name = file.originalname;
        cb(null, file_name);
        sleep(1500).then(() => {
            (async () => {
                if (FORM_PARAMS.filePassword) {
                    workbook = await XlsxPopulate.fromFileAsync(path_folder + "/" + file_name, { password: FORM_PARAMS.filePassword });
                    await workbook.toFileAsync(path_decrypted);
                    xls_to_json.setFile(await convert_to_json(path_decrypted));
                } else {
                    xls_to_json.setFile(convert_to_json(path_folder + "/" + file_name));
                }
                xls_to_json.getFile().Sheet1.forEach(dict => {
                    db.insertDocument(dict);
                });
            })();
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