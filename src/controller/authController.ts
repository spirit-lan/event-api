import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RegisterValidator } from "../validator/register-validator";
import { LoginValidator } from "../validator/login-validator";
import { User } from "../model/user";
import { UserService } from "../service/user-service";


export class AuthController {
  async login(req: Request, res: Response) {
    let login = req.body.login;
    let password = req.body.password;
    let service = new UserService();

    let user = await service.getByLoginPassword(login, password);
    if (user) {
      var tokentContent = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        birthdate: user.birthdate
      }
      let token = jwt.sign(JSON.stringify(tokentContent), 'superspirit')
      res.json({ token: token })
    }
    else res.status(401).json({ error: "Incorrect login" })
  }

  async register(req: Request, res: Response) {
    let user = req.body as User;
    let service = new UserService();

    try {
      user = await service.create(user);
      res.json(user);
    } catch (err) {
      res.status(409).json({ error: err });
    }
  }
}

export class AuthControllerRouting {
  public static routes(): express.Router {
    const authRoutes = express.Router();
    let controller: AuthController = new AuthController();

    let loginValidator = new LoginValidator();
    authRoutes.post("/login", loginValidator.rules, loginValidator.validate, controller.login);

    let registerValidator = new RegisterValidator();
    authRoutes.post("/register", registerValidator.rules, registerValidator.validate, controller.register);

    return authRoutes;
  }
}
