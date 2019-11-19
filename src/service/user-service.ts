import { User } from "../model/user";
import bcrypt from "bcrypt-nodejs";
import { getRepository } from "typeorm";
import { DbUser } from "../model/dto/db-user";

export class UserService {
  async create(user: User): Promise<User> {
    let password: string;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, undefined, (err, hash) => {
        password = hash;
      });
    });

    var repo = getRepository(DbUser);

    let dbUser = await repo.findOne({ where: [{ email: user.email }] });
    if (dbUser) throw "User already exist";

    user.password = password;
    user.deleted = false;
    return repo.save(user);
  }

  async exist(login: string, password: string): Promise<User> {
    var repo = getRepository(DbUser);
    let dbUser = await repo.findOne({ where: [{ email: login }] });

    if (!dbUser) return null;

    if (!bcrypt.compareSync(password, dbUser.password)) return null;

    return dbUser as User;
  }
}
