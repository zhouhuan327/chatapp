import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  avatarSrc: string;

  @Column('text')
  username: string;

  @Column({ default: '123' })
  password: string;

  @Column({ default: '这个人很懒' })
  intro: string;

  @Column('text')
  email: string;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}
