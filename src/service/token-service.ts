import { UserService } from "./user-service";
import { LostPasswordToken } from "../model/LostPasswordToken";
import { TokenGenerator, TokenBase } from "ts-token-generator";
import { Repository, getRepository } from "typeorm";

export class TokenService {

    private repository: Repository<LostPasswordToken>
    constructor() {
        this.repository = getRepository(LostPasswordToken);
    }

    async setLostPasswordToken(email: string): Promise<void | LostPasswordToken> {
        let service = new UserService();
        let user = await service.getByEmail(email);

        if (user) {
            let lostPasswordToken = new LostPasswordToken()
            lostPasswordToken.token = this.generateToken();
            lostPasswordToken.email = user.email
            return this.repository.save(lostPasswordToken).catch(err => { console.log(err)});
        }
    }

    async getLostPasswordToken(token: string): Promise<LostPasswordToken> {
        return this.repository.findOne({
            where: [
                { token: token, deleted: false }
            ]
        })
    }

    async deleteToken(token: LostPasswordToken) {
        token.deleted = true;
        await this.repository.save(token);
    }

    private generateToken(): string {
        let tokGen = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
        return tokGen.generate();
    }
}