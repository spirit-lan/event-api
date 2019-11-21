import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("SP_ROLE")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  code: string;
  @Column()
  name: string;
}
