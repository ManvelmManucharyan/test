const UserService = require("../services/user.service");

class UserController {
    static async signup(req, res) {
        try {
            if(!req.body.email || !req.body.password || !req.body.phoneNumber || !req.body.name || Object.keys(req.body).length > 4 ) {
                res.status(400).send("Please fill fields right");
            }
            const userByEmail = await UserService.findByEmail(req.body.email);
            const userByPhoneNumber = await UserService.findByPhoneNumber(req.body.phoneNumber);
            if(userByEmail || userByPhoneNumber) {
                res.status(400).send(`User by this ${userByEmail ? "email" : "phone number"} already exist`);
            } else {
                const user = await UserService.signup(req.body); 
                res.send(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async signin(req, res) {
        try {
            if(!req.body.id || !req.body.password || Object.keys(req.body).length > 2) {
                res.status(400).send("Please fill fields right");
            }
            const user = await UserService.findByLogin(req.body.id);
            if(!user) {
                return res.status(400).send("Wrong login or password");
            } else {
                const result = await UserService.signin(req.body, user);
                if(!result) {
                    res.status(401).send("Wrong login or password");
                } else {
                    res.cookie("token", result.authToken);
                    res.cookie("refreshToken", result.refreshToken);
                    res.send(result);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async info(req, res) {
        try {
            const user = await UserService.findByEmail(req.user.email);
            res.send(`${user.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    static async logout(req, res) {
        try {
            res.cookie("token", undefined);
            res.cookie("refreshToken", undefined);
            const token = await UserService.logout(req.user.id);
            res.send(token);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateToken(req, res) {
        try {
            if(!req.cookies.refreshToken || req.cookies.refreshToken === "undefined") {
                return res.send("Token already updated");
            }
            res.cookie("token", req.cookies.refreshToken);
            res.cookie("refreshToken", undefined);
            res.send("Token updated");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController;
