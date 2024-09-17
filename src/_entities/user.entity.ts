// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from './car.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: false })
  name: string;

  @Column({ unique: false })
  email: string;

  @Column({ unique: false, nullable: true })
  phone: string;

  @Column({ unique: false, nullable: true })
  image: string;

  @Column({ unique: false, nullable: true })
  birthdaydate: Date;

  @Column({ unique: false, nullable: true })
  homeaddress: string;

  @Column({ unique: false, nullable: true })
  officeadress: string;

  @Column()
  password: string;

  @Column({ unique: false })
  role: string;

  @OneToMany(() => Car, (car) => car.user)
  products: Car[];

  @Column({ unique: false, nullable: true })
  access_token: string;

  @Column({ unique: false, nullable: true })
  refresh_token: string;

  @Column({ unique: false, nullable: true })
  access_tokenExpiresIn: string;

  @Column({ unique: false, nullable: true })
  refresh_tokenExpiresIn: string;

  @Column({ unique: false, nullable: true })
  provider: string;

  @Column({ unique: false, nullable: true })
  providerId: string;

  @Column({ unique: false, nullable: true })
  createdAt: Date;

  @Column({ unique: false, nullable: true })
  updatedAt: Date;
}
