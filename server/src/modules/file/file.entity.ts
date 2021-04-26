import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column()
  fileName: string;
}
