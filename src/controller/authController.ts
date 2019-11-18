import express, {Request, Response} from 'express';

export class AuthController{
    login(req: Request, res: Response){
        res.json({message : 'Hello auth/login'})
    }

    register(req: Request, res: Response){
        res.json({ message : 'Hello auth/register'})
    }
}

export class AuthControllerRouting{

    public static routes() : express.Router{
        const authRoutes = express.Router();
        let controller : AuthController = new AuthController();
        authRoutes.get('/login', controller.login);
        authRoutes.get('/register', controller.register);
        return authRoutes;
    }
}

