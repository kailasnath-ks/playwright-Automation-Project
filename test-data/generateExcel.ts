/**
 * Run this ONCE to generate the Excel test data file:
 *   npx ts-node test-data/generateExcel.ts
 */
import * as XLSX from 'xlsx';
import * as path from 'path';

const users = [
  { username: 'standard_user',    password: 'secret_sauce', role: 'valid' },
  { username: 'locked_out_user',  password: 'secret_sauce', role: 'locked' },
  { username: 'wrong_user',       password: 'wrong_pass',   role: 'invalid' },
];

const products = [
  { name: 'Sauce Labs Backpack', minPrice: 20, maxPrice: 50 },
  { name: 'Sauce Labs Bike Light', minPrice: 5, maxPrice: 20 },
];

const wb = XLSX.utils.book_new();

const wsUsers = XLSX.utils.json_to_sheet(users);
XLSX.utils.book_append_sheet(wb, wsUsers, 'Users');

const wsProducts = XLSX.utils.json_to_sheet(products);
XLSX.utils.book_append_sheet(wb, wsProducts, 'Products');

const outputPath = path.join(__dirname, 'testData.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`✅ Excel test data written to: ${outputPath}`);
