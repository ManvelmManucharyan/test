require("dotenv").config();
var jwt = require("jsonwebtoken");

class JWT {
    static jwtSign(user) {
        const authToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "10m" });
        return { authToken, refreshToken };
    }

    static authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token) return res.sendStatus(403);

        jwt.verify(token, process.env.JWT_SECRET, (error, user)=> {
            if(error) return res.sendStatus(403);
            req.user = user;
            next();
        })
    }
}

module.exports = JWT;