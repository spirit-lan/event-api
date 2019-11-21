import express, { Request, Response } from "express";
import { RegisterValidator } from "../validator/register-validator";
import { LoginValidator } from "../validator/login-validator";
import { User } from "../model/user";
import { UserService } from "../service/user-service";
import { TokenGenerator, TokenBase } from 'ts-token-generator';
import { LostPasswordRequestValidator } from "../validator/lostPasswordRequest-validator";
import { TokenService } from "../service/token-service";
import { EmailService } from "../service/email-service";
import LostPasswordEmail from "../email/lostPassword-email";
import { RenewPasswordValidator } from "../validator/renewPassword-validator";


export class AuthController {
  async login(req: Request, res: Response) {
    let login = req.body.login;
    let password = req.body.password;
    let service = new UserService();

    let token = await service.getAuthToken(login, password);

    if (token) res.json({ token: token })
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

  async lostPasswordRequest(req: Request, res: Response) {
    let strEmail = req.body.email
    let tokenService = new TokenService();
    let emailService = new EmailService();

    let token = await tokenService.setLostPasswordToken(strEmail);

    if(!token)
      res.status(200).json();
    else{
      let email = LostPasswordEmail;
      email.to = [req.body.email];
      await emailService.send(email);
      res.status(200).json();
    }
    
    
  }

  async renewPasswordRequest(req: Request, res: Response) {
    let strToken = req.body.token;
    let newPassword = req.body.newPassword;
    
    let service = new UserService();

    try{
      await service.renewPassword(strToken, newPassword)
      res.status(200).json();
    }
    catch(err){
      res.status(403).json();
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

    let lostPasswordRequestValidator = new LostPasswordRequestValidator();
    authRoutes.post("/lostPassword", lostPasswordRequestValidator.rules, lostPasswordRequestValidator.validate, controller.lostPasswordRequest);

    let renewPasswordValidator = new RenewPasswordValidator()
    authRoutes.post("/renewPassword", renewPasswordValidator.rules, renewPasswordValidator.validate, controller.renewPasswordRequest);
    return authRoutes;
  }
}
