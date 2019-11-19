import express, { Request, Response } from "express";
import { RegisterValidator } from "../validator/register-validator";
import { User } from "../model/user";
import { UserService } from "../service/user-service";

export class AuthController {
  async login(req: Request, res: Response) {
    let login = req.body.login;
    let password = req.body.password;
    let service = new UserService();

    let user = await service.exist(login, password);

    //todo generate token
    if (user) res.json(user);
    else res.status(401).json({ error: "Incorrect login" });
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
    let rValidator = new RegisterValidator();
    authRoutes.post("/login", controller.login);
    authRoutes.post(
      "/register",
      rValidator.rules,
      rValidator.validate,
      controller.register
    );
    return authRoutes;
  }
}
