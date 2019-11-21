import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574348613235 implements MigrationInterface {
    name = 'migration1574348613235'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "SP_LOST_PASSWORD_TOKEN" ("token" character varying NOT NULL, "email" character varying NOT NULL, "deleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49e19e1ef16a11aa99072c59650" PRIMARY KEY ("token"))`, undefined);
        await queryRunner.query(`CREATE TABLE "SP_ROLE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6e94244cc6a72ab8a1895e5396b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "SP_USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "pseudo" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "deleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f372848bfeb46ddd5da80cea5db" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "USER_ROLES" ("sPUSERId" uuid NOT NULL, "sPROLEId" uuid NOT NULL, CONSTRAINT "PK_a4150a5106d4466f818ef749acf" PRIMARY KEY ("sPUSERId", "sPROLEId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c271f79678e2120925edcae82d" ON "USER_ROLES" ("sPUSERId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_16c70d7a5cbebf123971066b6a" ON "USER_ROLES" ("sPROLEId") `, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_c271f79678e2120925edcae82df" FOREIGN KEY ("sPUSERId") REFERENCES "SP_USER"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" ADD CONSTRAINT "FK_16c70d7a5cbebf123971066b6a4" FOREIGN KEY ("sPROLEId") REFERENCES "SP_ROLE"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_16c70d7a5cbebf123971066b6a4"`, undefined);
        await queryRunner.query(`ALTER TABLE "USER_ROLES" DROP CONSTRAINT "FK_c271f79678e2120925edcae82df"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_16c70d7a5cbebf123971066b6a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c271f79678e2120925edcae82d"`, undefined);
        await queryRunner.query(`DROP TABLE "USER_ROLES"`, undefined);
        await queryRunner.query(`DROP TABLE "SP_USER"`, undefined);
        await queryRunner.query(`DROP TABLE "SP_ROLE"`, undefined);
        await queryRunner.query(`DROP TABLE "SP_LOST_PASSWORD_TOKEN"`, undefined);
    }

}
