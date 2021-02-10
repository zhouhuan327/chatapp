import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupMessage } from '../../message/entity/groupMessage.entity';
import { User } from '../../user/entity/user.entity';
import { GroupRelation } from './groupRelation.entity';
@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupName: string;

  @Column()
  groupManagerId: number;

  @Column({ default: '群主很懒,没写公告' })
  intro: string;

  @CreateDateColumn()
  createTime: number;

  // @OneToMany(() => GroupRelation,relation => relation.)
  // user: User[];

  @OneToMany(() => GroupMessage, msg => msg.group)
  groupMessage: GroupMessage[];
}
