import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574259970476 implements MigrationInterface {
    name = 'migration1574259970476'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "ROLE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e741bff98568f2f915d401722d9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("uSERId" uuid NOT NULL, "rOLEId" uuid NOT NULL, CONSTRAINT "PK_88ef41095bb5477ea85f9562f54" PRIMARY KEY ("uSERId", "rOLEId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_187d7019b2e893d7d6638fb110" ON "user_roles_role" ("uSERId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d2b92182332e31fd56e3d6c186" ON "user_roles_role" ("rOLEId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_187d7019b2e893d7d6638fb1109" FOREIGN KEY ("uSERId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_d2b92182332e31fd56e3d6c1861" FOREIGN KEY ("rOLEId") REFERENCES "ROLE"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_d2b92182332e31fd56e3d6c1861"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_187d7019b2e893d7d6638fb1109"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d2b92182332e31fd56e3d6c186"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_187d7019b2e893d7d6638fb110"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles_role"`, undefined);
        await queryRunner.query(`DROP TABLE "ROLE"`, undefined);
    }

}
