const bcrypt = require('bcrypt');

class Bcrypt {
    static async hash(password) {
        return await bcrypt.hash(password, 12);
    }

    static async compare(newPassword, userPassword) {
        return await bcrypt.compare(newPassword, userPassword);
    }
}

module.exports = Bcrypt;