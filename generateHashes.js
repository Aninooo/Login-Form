const crypto = require('crypto');

function md5Hash(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

const passwords = {
    'password123': md5Hash('password123'),  // New password for 'Bryan'
    'admin123': md5Hash('admin123')         // New password for 'admin'
};

console.log(passwords);
