import { Column, Entity, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("SP_LOST_PASSWORD_TOKEN")
export class LostPasswordToken {
  @PrimaryColumn()
  token: string;
  @Column()
  email: string;
  @Column()
  deleted: Boolean;
  @CreateDateColumn()
  createdAt: Date;

  constructor(){
    this.deleted = false;
  }
}
