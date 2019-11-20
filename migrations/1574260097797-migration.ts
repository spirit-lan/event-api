import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574260097797 implements MigrationInterface {
    name = 'migration1574260097797'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "USER_ROLES" ("uSERId" uuid NOT NULL, "rOLEId" uuid NOT NULL, CONSTRAINT "PK_d035ff45e9eefa144860c85d5ed" PRIMARY KEY ("uSERId", "rOLEId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e18052496a00fb5b489a560e22" ON "USER_ROLES" ("uSERId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6a5965c425a90d343680a011e2" ON "USER_ROLES" ("rOLEId") `, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_e18052496a00fb5b489a560e224" FOREIGN KEY ("uSERId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_6a5965c425a90d343680a011e24" FOREIGN KEY ("rOLEId") REFERENCES "ROLE"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_6a5965c425a90d343680a011e24"`, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_e18052496a00fb5b489a560e224"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6a5965c425a90d343680a011e2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e18052496a00fb5b489a560e22"`, undefined);
        await queryRunner.query(`DROP TABLE "USER_ROLES"`, undefined);
    }

}
