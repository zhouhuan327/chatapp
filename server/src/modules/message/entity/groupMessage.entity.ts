import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Group } from '../../group/entity/group.entity';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id: number;

  // 映射到user的id
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'senderId' })
  user: User;

  // 映射到group的id
  @ManyToOne(() => Group, group => group.id)
  group: Group;

  @Column()
  content: string;

  @Column()
  type: MessageType;

  @CreateDateColumn()
  createTime: string;
}
