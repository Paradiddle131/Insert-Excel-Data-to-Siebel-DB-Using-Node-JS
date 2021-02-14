const ExcelJS = require('exceljs');
const fs = require("fs");
var downloadFileName = __basedir + "\\data\\downloads\\exported.xlsx";

exports.getExcelFile = async function () {
    if (fs.existsSync(downloadFileName)) fs.unlinkSync(downloadFileName);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    var tempArray = [];
    SELECT_RESULT.metaData.forEach((row, i) => {
        tempArray.push(row.name);
    });
    worksheet.addRow(tempArray);

    SELECT_RESULT.rows.forEach((row, i) => {
        var tempArray = [];
        row.forEach((cell, j) => {
            if (cell instanceof Date) {
                tempArray.push(cell);
            } else if (cell && cell !== null && cell !== 'undefined') {
                tempArray.push(cell);
            } else {
                tempArray.push("");
            }
        });
        worksheet.addRow(tempArray);
    });
    await workbook.xlsx.writeFile(downloadFileName);
    return downloadFileName;
}