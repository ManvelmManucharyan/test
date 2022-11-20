require("dotenv").config();
var jwt = require("jsonwebtoken");
const File = require("../models/files.js");

class JWT {
    static jwtSign(user) {
        const authToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "20m" });
        return { authToken, refreshToken };
    }

    static async authenticateToken(req, res, next) {
        let authToken = req.cookies.token;
        req.headers["authorization"] = `Bearer ${authToken}`;
        if(!authToken || authToken === "undefined") return res.status(403).send("Please login");
        let user, error;
        jwt.verify(authToken, process.env.JWT_SECRET, (err, u) => {
            if(err) {error = err.name;}
            else {user = u;}
        });
        if(error) {
            error = undefined;
            authToken = req.cookies.refreshToken;
            jwt.verify(authToken, process.env.JWT_SECRET, (err, u) => {
                if(err) {error = err.name;}
                else {user = u;}
            });
            if(error) {
                return res.status(400).send("Token Expired");
            }
            const result = JWT.jwtSign(user);
            res.cookie("token", result.authToken);
            res.cookie("refreshToken", result.refreshToken);
            req.user = user;
            next();
        } else {
            const result = JWT.jwtSign(user);
            res.cookie("token", result.authToken);
            res.cookie("refreshToken", result.refreshToken);
            req.user = user;
            next();
        }
    }

    static async checkFile (req, res, next) {
        const file = await File.findByPk(req.params.id);
        if(!file) {
            return res.status(404).send("File doesn't exist");
        }
        next();
    }
}

module.exports = JWT;