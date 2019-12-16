import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../src/model/user";
import { Role } from "../src/model/role";
import { RoleSeed } from "../src/seed/role.seed";
import { UserSeed } from "../src/seed/user.seed";

export class migration1575033488595 implements MigrationInterface {
  name = "migration1575033488595";

  public async up(queryRunner: QueryRunner): Promise<any> {
    let roleRepo = getRepository<Role>("Role");

    await roleRepo.save(RoleSeed);
    let roleAdmin = await roleRepo.find({ where: { code: "ADMIN" } });
    UserSeed[0].roles = roleAdmin;
    await getRepository<User>("User").save(UserSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
