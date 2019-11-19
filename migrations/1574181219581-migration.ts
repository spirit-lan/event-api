import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574181219581 implements MigrationInterface {
    name = 'migration1574181219581'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "pseudo" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "deleted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "USER"`, undefined);
    }

}
