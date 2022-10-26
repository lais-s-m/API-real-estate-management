import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;
}

export { Addresses };
