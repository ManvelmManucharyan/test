const User = require("../models/users");
const UserDto = require("../dto/user.dto");
const bcrypt = require("../auth/bcrypt");
const JWT = require("../auth/auth");
const { Op } = require("sequelize");

class UserService {
    static async register(body) {
        body.password = await bcrypt.hash(body.password);
        const newUser = await User.build(new UserDto(body));
        await newUser.save();
        const token = await JWT.jwtSign(body.name)
        return token;
    }

    static async login(body, user) {
        const auth = await bcrypt.compare(body.password, user.password);
        if(!auth){
            return false;
        }
        const token = await JWT.jwtSign(user)
        return token;
    }

    static async findByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    static async findByLogin(login) {
        return await User.findOne({ where: {[Op.or]: [{ email: login }, { phoneNumber: login }]}})
    }
}

module.exports = UserService;