import { DbUser } from "../model/dto/db-user";
import { User } from "../model/user";
import { Role } from "../model/role";
import { getRepository } from "typeorm";
import * as _ from "lodash";

export class RoleService {
    addRole(user: User, role: Role): Promise<DbUser> {
        if (user.roles.indexOf(role) == -1) {
            user.roles.push(role);
            let repository = getRepository(DbUser);
            return repository.save(user);
        }
    }

    removeRole(user: User, role: Role): Promise<DbUser> {
        if (user.roles.indexOf(role) == -1) {
            _.remove(user.roles, (el: Role) => { return el.id === role.id });
            let repository = getRepository(DbUser);
            return repository.save(user);
        }
    }
}