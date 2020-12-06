const qlzModule = require('./build/Release/qlz.node');
const fs = require('fs');
var fileData = fs.readFileSync('./data.json');
var fileData = "hello";
var buf = qlzModule.qlz_compress_c(fileData, fileData.length);

var Bbuffer = Buffer.from(buf, 'binary');
var length = buf.length

var bytearray = new Uint8Array(length / 2);

console.log('Bbuffer', Bbuffer)

console.log('bytearray', bytearray)

var i = 0, j = 0;
for (var i = 0; i < length;) {
    bytearray[j] += ((Bbuffer[i] << 4) | Bbuffer[i + 1]);
    i += 2;
    j++;
}

console.log("byte array", bytearray);
var hexBuf = Buffer.from(bytearray, 'hex');
console.log("=======================hex", hexBuf);
var str_b64 = hexBuf.toString('base64');
/////////////////////////////////////////
console.log("str_b64", str_b64, "\n size after base64", str_b64.length);
fs.writeFileSync('comp_ser1', str_b64);
