import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  avatarSrc: string;

  @Column('text')
  username: string;

  @Column({ default: '123' })
  password: string;

  @Column({ default: '这个人很懒' })
  intro: string;

  @Column({ default: '' })
  email: string;

  @CreateDateColumn()
  createTime: number;
}
