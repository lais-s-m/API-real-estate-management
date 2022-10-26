import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Properties } from "./properties.entity";
import User from "./user.entity";

@Entity("schedules_user_properties")
class SchedulesUserProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", nullable: true })
  date: string;

  @Column({ type: "time", nullable: true })
  hour: string;

  @ManyToOne(() => Properties, { nullable: true })
  @JoinColumn()
  property: Properties;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;
}

export { SchedulesUserProperties };
