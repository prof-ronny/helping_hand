const CryptoJS = require("crypto-js");

function generateSHA256Hash(input) {
    const hash = CryptoJS.SHA256(input);
    return hash.toString(CryptoJS.enc.Hex);
}

var hash = generateSHA256Hash('entidade@entidade.orgentidade');
console.log(hash);