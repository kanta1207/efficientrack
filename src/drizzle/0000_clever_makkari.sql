CREATE TABLE IF NOT EXISTS "categories" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "master_importance_level" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "master_sizes" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_sessions" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"user_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"location_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"deadline" timestamp NOT NULL,
	"completed_percentage" integer NOT NULL,
	"user_id" integer NOT NULL,
	"importance_level_id" integer NOT NULL
);
