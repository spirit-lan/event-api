import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity("USER")
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
