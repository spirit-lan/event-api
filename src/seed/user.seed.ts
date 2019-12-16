import { User } from "../model/user";
import { getRepository } from "typeorm";
import { Role } from "../model/role";
import { UserService } from "../service/user-service";

let svc = new UserService();
var admin = new User();
admin.firstname = "Admin";
admin.lastname = "SPIRIT";
admin.pseudo = "Admin";
admin.birthdate = new Date("2000-01-01");
admin.email = "webmaster@spirit-lan.com";
admin.password = svc.generatePassword("superspirit");

export const UserSeed: User[] = [admin];
