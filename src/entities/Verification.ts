import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { VerificationTarget } from "../types/types";
import User from "./User";

const PHONE: string = "PHONE";
const EMAIL: string = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.verifications)
  user: User;

  @Column({ type: "text", enum: [EMAIL, PHONE] })
  target: VerificationTarget;
  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      // TODO: toString(36) ?
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
