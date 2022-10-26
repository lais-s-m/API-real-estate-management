import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SchedulesUserProperties } from "./schedulesUserProperties.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120, nullable: true })
  password: string;

  @Column({ nullable: true })
  isAdm: boolean;

  @Column("boolean", { default: true, nullable: true })
  isActive: boolean = true;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => SchedulesUserProperties, (schedule) => schedule.user)
  schedulesProperties: SchedulesUserProperties[];
}

export default User;
