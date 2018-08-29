import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { VerificationTarget } from '../types/types';

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', enum: ['EMAIL', 'PHONE'] })
  target: VerificationTarget;
  @Column({ type: 'text' })
  payload: string;
  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === 'PHONE') {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === 'EMAIL') {
      // TODO: toString(36) ?
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
