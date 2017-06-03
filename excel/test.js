'use strict';

const exceljs = require('exceljs');

var wb = new exceljs.Workbook();
var sheet = wb.addWorksheet('my sheet');
sheet.columns = [
  { header: 'col1', key:'col1' }
];

var col1 = sheet.getColumn('col1');

sheet.addRow(['test value 1']);
sheet.addRow(['test value 2']);

wb.xlsx.writeFile('./test.xlsx')
  .then( ()=> {
    console.log('save file done!')
  });
