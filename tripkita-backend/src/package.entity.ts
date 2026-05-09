import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packages')
export class TourPackage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value ? parseFloat(value) : 0),
    },
  })
  price!: number;

  @Column()
  location!: string;

  @Column('simple-array', { nullable: true })
  facilities?: string[];

  @Column()
  schedule!: string;

  @Column({ default: 0 })
  stock!: number;
}