import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./address";

@Entity("SP_EVENT")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    theme: 'SUMMER' | 'WINTER'
    @Column()
    maxPlayers: Number;
    @OneToOne(type => Address)
    @JoinColumn()
    address: Address;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}