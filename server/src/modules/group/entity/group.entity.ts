import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}
