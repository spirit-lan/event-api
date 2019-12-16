import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { UserService } from "../src/service/user-service";
import { User } from "../src/model/user";
import { Role } from "../src/model/role";
import { RoleSeed } from "../src/seed/role.seed";

export class migration1575033488594 implements MigrationInterface {
  name = "migration1575033488594";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `SP_ADRESS` (`id` varchar(36) NOT NULL, `street` varchar(255) NOT NULL, `postcode` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, `latitude` int NOT NULL, `longitude` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `SP_EVENT` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `theme` varchar(255) NOT NULL, `maxPlayers` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `addressId` varchar(36) NULL, UNIQUE INDEX `REL_a8fde6421c63964f05df9e3b93` (`addressId`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `SP_LOST_PASSWORD_TOKEN` (`token` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `deleted` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`token`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `SP_ROLE` (`id` varchar(36) NOT NULL, `code` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `SP_USER` (`id` varchar(36) NOT NULL, `firstname` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `pseudo` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `birthdate` datetime NOT NULL, `deleted` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `USER_ROLES` (`sPUSERId` varchar(36) NOT NULL, `sPROLEId` varchar(36) NOT NULL, INDEX `IDX_c271f79678e2120925edcae82d` (`sPUSERId`), INDEX `IDX_16c70d7a5cbebf123971066b6a` (`sPROLEId`), PRIMARY KEY (`sPUSERId`, `sPROLEId`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `SP_EVENT` ADD CONSTRAINT `FK_a8fde6421c63964f05df9e3b938` FOREIGN KEY (`addressId`) REFERENCES `SP_ADRESS`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `USER_ROLES` ADD CONSTRAINT `FK_c271f79678e2120925edcae82df` FOREIGN KEY (`sPUSERId`) REFERENCES `SP_USER`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `USER_ROLES` ADD CONSTRAINT `FK_16c70d7a5cbebf123971066b6a4` FOREIGN KEY (`sPROLEId`) REFERENCES `SP_ROLE`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `USER_ROLES` DROP FOREIGN KEY `FK_16c70d7a5cbebf123971066b6a4`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `USER_ROLES` DROP FOREIGN KEY `FK_c271f79678e2120925edcae82df`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `SP_EVENT` DROP FOREIGN KEY `FK_a8fde6421c63964f05df9e3b938`",
      undefined
    );
    await queryRunner.query(
      "DROP INDEX `IDX_16c70d7a5cbebf123971066b6a` ON `USER_ROLES`",
      undefined
    );
    await queryRunner.query(
      "DROP INDEX `IDX_c271f79678e2120925edcae82d` ON `USER_ROLES`",
      undefined
    );
    await queryRunner.query("DROP TABLE `USER_ROLES`", undefined);
    await queryRunner.query("DROP TABLE `SP_USER`", undefined);
    await queryRunner.query("DROP TABLE `SP_ROLE`", undefined);
    await queryRunner.query("DROP TABLE `SP_LOST_PASSWORD_TOKEN`", undefined);
    await queryRunner.query(
      "DROP INDEX `REL_a8fde6421c63964f05df9e3b93` ON `SP_EVENT`",
      undefined
    );
    await queryRunner.query("DROP TABLE `SP_EVENT`", undefined);
    await queryRunner.query("DROP TABLE `SP_ADRESS`", undefined);
  }
}
