import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1574160498897 implements MigrationInterface {
    name = 'migration1574160498897'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "USER" ADD "deleted" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "USER" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "USER" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "deleted"`, undefined);
    }

}
