import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupMessage } from '../../message/entity/groupMessage.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  avatarSrc: string;

  @Column('text')
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '这个人很懒' })
  intro: string;

  @Column({ default: '' })
  email: string;

  @CreateDateColumn()
  createTime: number;

  @OneToMany(() => GroupMessage, msg => msg.user)
  groupMessage: GroupMessage[];
}
