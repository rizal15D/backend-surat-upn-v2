const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

function generateSecretKey() {
    return crypto.randomBytes(64).toString('hex');
}

// Generate the secret key
const secretKey = generateSecretKey();

// Write the secret key to the .env file
fs.appendFileSync(path.join(__dirname, '.env'), `\nSECRET_KEY=${secretKey}`);

// Now you can access the secret key using process.env.SECRET_KEY
console.log(process.env.SECRET_KEY);

module.exports = secretKey;