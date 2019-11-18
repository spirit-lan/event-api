import { PrimaryGeneratedColumn, Column } from "typeorm";

export class DbUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  birthdate: Date;
}
