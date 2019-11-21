
import bcrypt from "bcrypt-nodejs";
import { getRepository, Repository } from "typeorm";

import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { TokenService } from "./token-service";
import { EmailService } from "./email-service";

export class UserService {

  private repository: Repository<User>
  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: User): Promise<User> {
   
    let dbUser = await this.repository.findOne({ where: [{ email: user.email, deleted: false }] });
    if (dbUser) throw 'Email already exist';

    user.password = this.generatePassword(user.password);
    user.deleted = false;

    return this.repository.save(user);
  }

  async getAuthToken(login: string, password: string): Promise<null | string> {
    let dbUser = await this.repository.findOne({ where: [{ email: login }] });

    if (!dbUser) return null;

    if (!bcrypt.compareSync(password, dbUser.password)) return null;

    let token = this.generateAuthToken(dbUser);

    return token;
  }

  async getById(id: string): Promise<User> {
    return await this.repository.findOneOrFail({ where: [{ id: id }], relations: ["roles"] })
  }

  async getByEmail(email: string) : Promise<void | User>{
    return await this.repository.findOne({where: [{email: email}]});
  }

  async renewPassword(token: string, newPassword: string){
    let tokenService = new TokenService();
    let userService = new UserService();

    let tok = await tokenService.getLostPasswordToken(token);
    if(!tok)
      throw 'Token expired or not found'
    
    let user = await userService.getByEmail(tok.email)
    if(!user)
      throw 'Unable to find user'

    user.password = this.generatePassword(newPassword)
    this.repository.save(user).then(user => {
      tokenService.deleteToken(tok)
    });
  }

  private generateAuthToken(user: User): string {
    var tokentContent = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
      birthdate: user.birthdate
    }

    let token = jwt.sign(JSON.stringify(tokentContent), 'superspirit')
    return token;
  }

  private generatePassword(clearString: string) : string{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(clearString, salt);
    return hash;
  }
}
