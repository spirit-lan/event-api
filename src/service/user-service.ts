import { User } from "../model/user";
import bcrypt from "bcrypt-nodejs";
import { getRepository, Repository } from "typeorm";
import { DbUser } from "../model/dto/db-user";

export class UserService {

  private repository: Repository<DbUser>
  constructor(){
    this.repository = getRepository(DbUser);
  }

  async create(user: User): Promise<User> {
    let password: string;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, undefined, (err, hash) => {
        password = hash;
      });
    });

    let dbUser = await this.repository.findOne({ where: [{ email: user.email, deleted: false }] });
    if (dbUser) throw "User already exist";

    user.password = password;
    user.deleted = false;
    return this.repository.save(user);
  }

  async getByLoginPassword(login: string, password: string): Promise<User> {
    let dbUser = await this.repository.findOne({ where: [{ email: login }] });

    if (!dbUser) return null;

    if (!bcrypt.compareSync(password, dbUser.password)) return null;

    return dbUser as User;
  }

  async getById(id: string): Promise<User>{
   return await this.repository.findOneOrFail({ where: [{ id: id }], relations: ["roles"] })
  }
}
