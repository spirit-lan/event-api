import express, { Request, Response } from 'express';
import bcrypt from "bcrypt-nodejs";
import { check, validationResult } from "express-validator";
import { RegisterValidator } from '../validator/register-validator';
import { User } from '../model/user';
import { getRepository } from 'typeorm';
import { DbUser } from '../model/dto/db-user';

export class AuthController {
    login(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        res.json({ message: 'Hello auth/login' })
    }

    register(req: Request, res: Response) {
        let user = req.body as User;

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(user.password, salt, undefined, (err, hash) => {

                user.password = hash;
                user.deleted = false;
                var repo = getRepository(DbUser);

                repo.findOneOrFail({ where: [{ email: user.email }] }).then(result => {
                    return res.status(409).json({
                        errors: {global :"User already exist"}
                    })
                }).catch(result => {
                    repo.save(user).then(usr =>
                        res.json({ user: usr })
                    )
                })

            });

        });
    }
}

export class AuthControllerRouting {

    public static routes(): express.Router {
        const authRoutes = express.Router();
        let controller: AuthController = new AuthController();
        let rValidator = new RegisterValidator();
        authRoutes.post('/login', controller.login);
        authRoutes.post('/register', rValidator.rules, rValidator.validate, controller.register);
        return authRoutes;
    }
}

