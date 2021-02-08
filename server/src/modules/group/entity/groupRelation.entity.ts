import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class GroupRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  userId: number;
}
