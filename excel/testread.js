'use strict';

const exceljs = require('exceljs');

var wb = new exceljs.Workbook();

const onFileRead = () => {
  var sheet = wb.getWorksheet('my sheet');

  sheet.eachRow( (row, rowNumber) => {
    console.log('row #: ' + rowNumber);
    console.dir(row.values);

    row.eachCell( (cell, colNumber) => {
      console.log('cell #: ' + colNumber);
      console.dir(cell.value);
    });
  });

  sheet.spliceColumns(2, 0, ['test insesrt', 'val1-1', 'val2']);
  //sheet.spliceColumns(2, 1);//, ['new col-2', 'val1-1', 'val2']);
  //sheet.spliceColumns(2, 1, ['new col3', 'val1', 'val2'], ['new col4', 'val1', 'val2']);

  wb.xlsx.writeFile('./test.xlsx')
    .then( ()=> {
      console.log('file updated!')
    });
}

wb.xlsx.readFile('./test.xlsx')
  .then(onFileRead);
