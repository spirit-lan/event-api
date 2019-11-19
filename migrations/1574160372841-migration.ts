import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574160372841 implements MigrationInterface {
    name = 'migration1574160372841'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "USER"`, undefined);
    }

}
