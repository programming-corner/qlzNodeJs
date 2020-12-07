const path = require('path');
const fs = require('fs');
const { compress } = require('../QLZNodjs');
var files = fs.readdirSync((path.join(__dirname, './posRepo')));
(!fs.existsSync(path.join(__dirname, `./compressed`))) ? fs.mkdirSync(path.join(__dirname, `.//compressed`)) : "";

files.forEach(file => {
    if (file)
        // var data = JSON.stringify(fs.readFileSync((path.join(__dirname, `./posRepo/${file}`)), "utf-8"));
        var data = JSON.stringify(require(path.join(__dirname, `./posRepo/${file}`)));

    let { compressedData, CompressionLength, ratio } = compress(data);
    fs.writeFileSync((path.join(__dirname, `./compressed/${file.split('.')[0]}.txt`)), compressedData);
    console.log("file name :", file, CompressionLength, ":::::::::", ratio)
})
