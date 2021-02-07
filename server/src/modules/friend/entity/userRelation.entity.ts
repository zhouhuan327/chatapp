import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  friendId: string;
}
