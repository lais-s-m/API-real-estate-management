import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { SchedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("boolean", { default: false, nullable: true })
  sold: boolean = false;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  size: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => Addresses, { nullable: true })
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories)
  @JoinColumn()
  category: Categories;

  @OneToMany(() => SchedulesUserProperties, (schedules) => schedules.property)
  schedules: SchedulesUserProperties[];
}

export { Properties };
