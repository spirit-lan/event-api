import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

class RoleMiddleware{

    idAdmin = (req: Request, res: Response, next: NextFunction) => {
        let user = req.user as User;
        if (user.roles.find(el => el.code === 'ADMIN'))
            return next();
        else res.status(401).json({error: "User not allowed"})
    }
}


export default new RoleMiddleware();

