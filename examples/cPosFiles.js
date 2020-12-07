const path = require('path');
const fs = require('fs');
const { compress } = require('../QLZNodjs');
var files = fs.readdirSync((path.join(__dirname, './posRepo')));

files.forEach(file => {
    var data = fs.readFileSync((path.join(__dirname, `./posRepo/${file}`)), "utf-8");
    let { compressedData, CompressionLength, ratio } = compress(data);

    (!fs.existsSync(path.join(__dirname, `./compressed`))) ? fs.mkdirSync(path.join(__dirname, `./compressed`)) : "";
    fs.writeFileSync((path.join(__dirname, `./compressed/${file.split('.')[0]}.txt`)), compressedData)
    console.log( "file name :" , file, CompressionLength, ":::::::::", ratio)
})
