import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import RoleMiddleware from '../middleware/RoleMiddleware'

export class RoleController {
    async getRoles(req: Request, res: Response) {
        //let user = req.body.user;
        //let role = req.body.role;
        //
        //var service = new RoleService();
        //user = await service.addRole(user, role);
        res.json(req.user);
    }
}

export class RoleControllerRouting {
    public static routes(): express.Router {
        const roleRoutes = express.Router();
        let controller: RoleController = new RoleController();
        roleRoutes.post("/", passport.authenticate("jwt"), RoleMiddleware.idAdmin, controller.getRoles);
        return roleRoutes;
    }


}



