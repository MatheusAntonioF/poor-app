CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` integer NOT NULL,
	`date` integer NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`updatedAt` integer
);
