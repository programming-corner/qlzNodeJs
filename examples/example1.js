const { compress } = require('../QLZNodjs');

const fs = require('fs'), path = require('path')
 //var data = fs.readFileSync('../data.json', "utf-8");
// //var data = require('../data.json')
// //path

//console.log(":::::::::::::", path.join(__dirname, '../data'));

let { compressedData, CompressionLength, ratio } = compress("hello")
console.log(CompressionLength, ":::::::::", ratio)

fs.writeFileSync('./compressedData.txt', compressedData)