import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class POI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column('jsonb')
  title: { ru: string; en?: string };

  @Column('jsonb', { nullable: true })
  summary: { ru: string; en?: string };

  @Column('jsonb', { nullable: true })
  body: { ru: string; en?: string };

  @Column('decimal', { precision: 10, scale: 8 })
  lat: number;

  @Column('decimal', { precision: 11, scale: 8 })
  lng: number;

  @Column('int', { nullable: true })
  elev: number;

  @Column({ nullable: true })
  era: string;

  @Column({ nullable: true })
  style: string;

  @Column({ nullable: true })
  architect: string;

  @Column('jsonb', { default: '[]' })
  media: any[];

  @Column('simple-array', { default: '' })
  tags: string[];

  @Column('simple-array', { default: '' })
  categories: string[];

  @Column('int', { default: 5 })
  visitTimeMin: number;

  @Column('jsonb', { default: '{"mgn": false, "stroller": false}' })
  accessibility: { mgn: boolean; stroller: boolean };

  @Column({ nullable: true })
  hours: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
