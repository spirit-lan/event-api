import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { DbRole } from "./db-role";
@Entity("USER")
export class DbUser {
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

  @ManyToMany(type => DbRole)
  @JoinTable({name: 'USER_ROLES'})
  roles: DbRole[]
}
