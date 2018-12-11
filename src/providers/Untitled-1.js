var CryptoJS = require('crypto-js');
var net = require('net');

var crypto = require('crypto');

    var client = net.connect(8001, "10.0.0.183", function () {
    console.log('connect');
    
    // Example encrypt and decrypt
    var ciphertext = CryptoJS.AES.encrypt('hello', 'secret key 123');
    console.log("sha256 encrypt",ciphertext.toString());

    //decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var text = bytes.toString(CryptoJS.enc.Utf8);
    console.log("sha256 decrypt ",text);

    //send data to service
    client.write("5016089");

    //get data from service
    client.on('data', function (data,err) {
       console.log(data);

        // console.log("Enter", data);
       var buf = Buffer.from(data,'base64').toString('ascii');

        var hope=new Buffer(data).toString('ascii');
      console.log('get '+hope)
     var bytes  = CryptoJS.AES.decrypt(data,'4625876');


try {
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log('hope', plaintext);
} catch (e) {
  var plaintext = "";
  console.log(e)
}
 
console.log("text data ",plaintext);

        client.end();
    });
    client.on('error', function (err) {
        console.log('error ' + err.message);
    })
    
    client.on('connection', function (socket) {
        console.log('connected ', socket.net);
        console.log('connect' + socket.remoteAddress +' '+socket.remotePort);
    })
});
