import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from '../../user/entity/user.entity';
@Entity()
export class GroupRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
