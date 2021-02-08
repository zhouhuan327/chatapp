import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column()
  content: string;

  @Column()
  type: MessageType;

  @CreateDateColumn()
  createTime: number;
}
