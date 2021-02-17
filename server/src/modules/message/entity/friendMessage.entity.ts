import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  content: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createTime: string;
}
