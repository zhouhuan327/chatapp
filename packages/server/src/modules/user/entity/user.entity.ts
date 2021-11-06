import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMessage } from "../../message/entity/groupMessage.entity";
import { FriendMessage } from "../../message/entity/friendMessage.entity";
import { UserRelation } from "../../friend/entity/userRelation.entity";
import { GroupRelation } from "../../group/entity/groupRelation.entity";
import { Group } from "../../group/entity/group.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: `default_user_avatar1.png` })
  avatarSrc: string;

  @Column("text")
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "这个人很懒" })
  intro: string;

  @Column({ default: "" })
  email: string;

  @Column({ default: "男" })
  sex: string;
  @Column({ default: "" })
  address: string;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => UserRelation, relation => relation.user)
  friend: User[];

  @OneToMany(() => GroupRelation, relation => relation.user)
  group: Group[];

  @OneToMany(() => FriendMessage, msg => msg.sender)
  friendMessage: FriendMessage[];

  @OneToMany(() => GroupMessage, msg => msg.user)
  groupMessage: GroupMessage[];
}
