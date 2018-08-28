import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Chat from './Chat';
import Message from './Message';
import Ride from './Ride';
import Verification from './Verification';

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // User General Info
  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email: string | null;
  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;
  @Column({ type: 'text' })
  firstName: string;
  @Column({ type: 'text' })
  lastName: string;
  @Column({ type: 'int', nullable: true })
  age: string;
  // 페이스북 로그인 시 비밀번호가 필요 없음 => null
  @Column({ type: 'text', nullable: true })
  password: string;
  @Column({ type: 'text', nullable: true })
  fbId: string;
  // 이메일, 페이스북 로그인 시에 필요 없음 => null
  @Column({ type: 'text', nullable: true })
  phoneNumber: string;
  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: string;
  @Column({ type: 'text' })
  profilePhoto: string;
  @OneToMany(type => Verification, verfication => verfication.user)
  verifications: Verification[];

  // Chat Info
  @ManyToOne(type => Chat, chat => chat.participants)
  chat: Chat;
  @ManyToOne(type => Message, message => message.user)
  messages: Message[];

  // Drive Info
  @OneToMany(type => Ride, ride => ride.passenger)
  rideAsPassenger: Ride[];
  @OneToMany(type => Ride, ride => ride.driver)
  rideAsDriver: Ride[];

  @Column({ type: 'boolean', default: false })
  isDriving: boolean;
  @Column({ type: 'boolean', default: false })
  isRiding: boolean;
  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;
  @Column({ type: 'double precision', default: 0 })
  lastLat: number;
  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword = (password: string): Promise<boolean> => {
    return bcrypt.compare(password, this.password);
  };

  // for passwrod encryption
  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  };
}

export default User;
