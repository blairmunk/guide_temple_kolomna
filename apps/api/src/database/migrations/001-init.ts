import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1693564800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      CREATE TABLE "poi" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "slug" varchar UNIQUE NOT NULL,
        "title" jsonb NOT NULL,
        "summary" jsonb,
        "body" jsonb,
        "lat" decimal(10,8) NOT NULL,
        "lng" decimal(11,8) NOT NULL,
        "elev" integer,
        "era" varchar,
        "style" varchar,
        "architect" varchar,
        "media" jsonb DEFAULT '[]',
        "tags" text[] DEFAULT '{}',
        "categories" text[] DEFAULT '{}',
        "visit_time_min" integer DEFAULT 5,
        "accessibility" jsonb DEFAULT '{"mgn": false, "stroller": false}',
        "hours" varchar,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      );

      CREATE INDEX "poi_lat_lng_idx" ON "poi" ("lat", "lng");
      CREATE INDEX "poi_tags_idx" ON "poi" USING GIN ("tags");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "poi"');
  }
}
