import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Role } from "./role";

@Entity("SP_USER")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  pseudo: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  birthdate: Date;
  @Column()
  deleted: Boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToMany(type => Role)
  @JoinTable({ name: "USER_ROLES" })
  roles: Role[];
}
