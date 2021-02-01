// const Document = require('../models/document');

const readXlsxFile = require('read-excel-file/node');

const upload = async (req, res) => {
    try {
        console.log("REQ FILE -> "+ req.file)
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = __basedir + "/data/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let documents = [];

            rows.forEach((row) => {
                let document = {
                    gsm: row[0],
                    username: row[1],
                    name: row[2],
                    surname: row[3],
                    id_serial_no: row[4],
                    tckn: row[5],
                    father_name: row[6],
                    birthplace: row[7],
                    birthdate: row[8],
                    customer_no: row[9]
                };
                documents.push(document);
            });

            console.log("DOCUMENTS:");
            console.log(documents);
            // Document.bulkCreate(documents)
            //     .then(() => {
            //         res.status(200).send({
            //             message: "Uploaded the file successfully: " + req.file.originalname,
            //         });
            //     })
            //     .catch((error) => {
            //         res.status(500).send({
            //             message: "Fail to import data into database!",
            //             error: error.message,
            //         });
            //     });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

// const getDocuments = (req, res) => {
//     Document.findAll()
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving tutorials.",
//             });
//         });
// };

module.exports = {
    upload,
    // getDocuments,
};