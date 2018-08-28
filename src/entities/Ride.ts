import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { rideStatus } from '../types/types';
import User from './User';

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    enum: ['ACCEPTED', 'FINISHED', 'CANCELED', 'REQUESTING', 'ONROUTE']
  })
  status: rideStatus;

  // User Infos
  @ManyToOne(type => User, user => user.rideAsPassenger)
  passenger: User;
  @ManyToOne(type => User, user => user.rideAsDriver)
  driver: User;

  // 시작 지점
  @Column({ type: 'text' })
  pickUpAddress: string;
  @Column({ type: 'double precision', default: 0 })
  pickUpLat: number;
  @Column({ type: 'double precision', default: 0 })
  pickUpLng: number;

  // 도착 지점
  @Column({ type: 'text' })
  dropOffAddress: string;
  @Column({ type: 'double precision', default: 0 })
  dropOffLat: number;
  @Column({ type: 'double precision', default: 0 })
  dropOffLng: number;

  @Column({ type: 'double precision', default: 0 })
  price: number;

  @Column({ type: 'text' })
  distance: string;

  @Column({ type: 'text' })
  duration: string;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
