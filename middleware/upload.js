const multer = require("multer");
const excelToJson = require('convert-excel-to-json');
const path_folder = __basedir + "data/uploads";
var file_json;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

function convert_to_json(path_file){
    return excelToJson({
        sourceFile: path_file,
        header:{
            rows: 1
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




var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_folder);
        // cb(null, __basedir + "/data/uploads/");
    },
    filename: (req, file, cb) => {
        const file_name = `${Date.now()}-${file.originalname}`;
        console.log("original name -> " + file.originalname);
        cb(null, file_name);
        sleep(1500).then(() => {
            file_json = convert_to_json(path_folder + "/" + file_name); 
            console.log("file path:");
            console.log(path_folder + "/" + file_name);
            console.log("file_json (upload.js):");
            console.log(file_json);
        });
    },
});

var uploadFile = multer({
    storage: storage,
    fileFilter: excelFilter
});
// module.exports = uploadFile;
module.exports = {
    file_json_converted: file_json,
    upload: uploadFile,
}