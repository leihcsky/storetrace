CREATE TABLE `themes` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `vendor` varchar(255),
  `description` text,
  `theme_store_url` varchar(512),
  `created_at` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `themes_id` PRIMARY KEY(`id`),
  CONSTRAINT `themes_slug_unique` UNIQUE(`slug`)
);

CREATE INDEX `themes_slug_idx` ON `themes` (`slug`);

CREATE TABLE `apps` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `vendor` varchar(255),
  `category` varchar(128),
  `official_url` varchar(512),
  `created_at` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `apps_id` PRIMARY KEY(`id`),
  CONSTRAINT `apps_slug_unique` UNIQUE(`slug`)
);

CREATE INDEX `apps_slug_idx` ON `apps` (`slug`);

CREATE TABLE `stores` (
  `id` int AUTO_INCREMENT NOT NULL,
  `domain` varchar(255) NOT NULL,
  `store_name` varchar(255),
  `theme_id` int,
  `country` varchar(64),
  `currency` varchar(16),
  `shopify_detected` boolean NOT NULL DEFAULT false,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `last_scanned_at` timestamp,
  CONSTRAINT `stores_id` PRIMARY KEY(`id`),
  CONSTRAINT `stores_domain_unique` UNIQUE(`domain`)
);

CREATE INDEX `stores_domain_idx` ON `stores` (`domain`);

CREATE TABLE `store_apps` (
  `id` int AUTO_INCREMENT NOT NULL,
  `store_id` int NOT NULL,
  `app_id` int NOT NULL,
  `detected_at` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `store_apps_id` PRIMARY KEY(`id`)
);

CREATE INDEX `store_apps_store_idx` ON `store_apps` (`store_id`);
CREATE INDEX `store_apps_app_idx` ON `store_apps` (`app_id`);

CREATE TABLE `scans` (
  `id` int AUTO_INCREMENT NOT NULL,
  `store_id` int NOT NULL,
  `scan_result` json,
  `scan_time` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `scans_id` PRIMARY KEY(`id`)
);

CREATE INDEX `scans_store_idx` ON `scans` (`store_id`);

ALTER TABLE `stores` ADD CONSTRAINT `stores_theme_id_themes_id_fk` FOREIGN KEY (`theme_id`) REFERENCES `themes`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `store_apps` ADD CONSTRAINT `store_apps_store_id_stores_id_fk` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `store_apps` ADD CONSTRAINT `store_apps_app_id_apps_id_fk` FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `scans` ADD CONSTRAINT `scans_store_id_stores_id_fk` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE cascade ON UPDATE no action;
