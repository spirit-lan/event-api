import { Role } from "../model/role";
import { getRepository, Repository } from "typeorm";
import * as _ from "lodash";

export class RoleService {
  private repository: Repository<Role>;
  constructor() {
    this.repository = getRepository(Role);
  }

  //addRole(user: User, role: Role): Promise<void |User> {
  //    if (user.roles.indexOf(role) == -1) {
  //        user.roles.push(role);
  //        let repository = getRepository(User);
  //        return repository.save(user);
  //    }
  //    throw ''
  //}
  //
  //removeRole(user: User, role: Role): Promise<User> {
  //    if (user.roles.indexOf(role) == -1) {
  //        _.remove(user.roles, (el: Role) => { return el.id === role.id });
  //        let repository = getRepository(User);
  //        return repository.save(user);
  //    }
  //}
}
