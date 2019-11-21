import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("SP_EVENT")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    street: string;
    @Column()
    postcode: string;
    @Column()
    city: string;
    @Column()
    country: string;
    @Column()
    latitude: Number;
    @Column()
    longitude: Number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
