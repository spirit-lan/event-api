import { DbUser } from "../model/dto/db-user";
import { User } from "../model/user";
import { Role } from "../model/role";
import { getRepository } from "typeorm";


export class RoleService {
    addRole(user: User, role: Role): Promise<DbUser> {
        if (user.roles.indexOf(role) == -1) {
            user.roles.push(role);
            let repository = getRepository(DbUser);
            return repository.save(user);
        }
    }
}