import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity()
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "friendId" })
  friend: User;
}
