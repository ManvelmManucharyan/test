const UserService = require("../services/user.service");

class UserController {
  static async register(req, res) {
    try {
      const userByEmail = await UserService.findByEmail(req.body.email)
      if(userByEmail) {
        res.status(400).send("User by this email already exist")
      } else {
        const user = await UserService.register(req.body); 
        res.send(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
      const user = await UserService.findByLogin(req.body.id);
      if(!user) {
        return res.status(400).send("Wrong login or password");
      } else {
        const result = await UserService.login(req.body, user);
        if(!result) {
          res.status(401).send("Wrong login or password");
        } else {
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
      res.send(`${user.id}`)
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(req, res) {
    try {
      const user = await UserService.findByLogin(req.body.id);
      if(!user) {
        return res.status(400).send("Wrong login or password");
      } else {
        const result = await UserService.login(req.body, user);
        if(!result) {
          res.status(401).send("Wrong login or password");
        } else {
          res.send(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
