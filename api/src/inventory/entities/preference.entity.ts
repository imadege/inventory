import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('preferences') // Table name in the database
export class Preference {
  @PrimaryGeneratedColumn('uuid') // UUID as the primary key
  id: string;

  @Column()
  material: string;

  @Column()
  form: string;

  @Column()
  choice: string;

  @Column()
  grade: string;

  @Column({ nullable: true })
  dimensions: string; // Optional, concatenated dimensions (e.g., L=100 W=50)

  @Column({ nullable: true })
  widthMin: number;

  @Column({ nullable: true })
  widthMax: number;

  @Column({ nullable: true })
  thickenessMin: number;

  @Column({ nullable: true })
  thickenessMax: number;

  @CreateDateColumn()
  createDate: Date; // Automatically set to the current timestamp on creation

  @UpdateDateColumn()
  lastUpdated: Date; // Automatically updated to the current timestamp on each update
}
