const qlzModule = require('./build/Release/qlz.node');
const fs = require('fs')

function reformat(data) {
    // console.log("data to reformat =>>>", typeof data , data);
    try {
     //   return fs.readFileSync(data, "utf-8")
        if (typeof data == 'object')
            data = JSON.stringify(data);
        return data
    } catch (ex) {
        throw ex
    }
}

function BinaryToHex(compressedData) {
    var Binarybuffer = Buffer.from(compressedData, 'binary');
    var length = compressedData.length
    var bytearray = new Uint8Array(length / 2);
    for (var i = 0, j = 0; i < length; j++, i += 2) {
        bytearray[j] += ((Binarybuffer[i] << 4) | Binarybuffer[i + 1]);
    }
    var hexBuf = Buffer.from(bytearray, 'hex');

    return hexBuf;
}

module.exports = {
    compress: function (dataToCompress) {//take file path or string
        var stringifiedData = dataToCompress
     //   reformat(dataToCompress);
        var compressedData = qlzModule.qlz_compress_c(stringifiedData, stringifiedData.length);
        var hexBuffer = BinaryToHex(compressedData)
        var compressedData = hexBuffer.toString('base64');
        return {
            compressedData,
            CompressionLength: compressedData.length,
            ratio: compressedData.length / stringifiedData.length
        };
    }
}