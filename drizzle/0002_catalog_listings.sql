ALTER TABLE `themes`
  ADD COLUMN `price_type` varchar(16),
  ADD COLUMN `price_label` varchar(64),
  ADD COLUMN `image_url` varchar(1024),
  ADD COLUMN `image_alt` varchar(255),
  ADD COLUMN `is_listed` boolean NOT NULL DEFAULT false,
  ADD COLUMN `sort_order` int NOT NULL DEFAULT 0;

CREATE INDEX `themes_listed_idx` ON `themes` (`is_listed`);

ALTER TABLE `apps`
  ADD COLUMN `list_title` varchar(255),
  ADD COLUMN `description` text,
  ADD COLUMN `pricing_label` varchar(128),
  ADD COLUMN `rating` varchar(8),
  ADD COLUMN `review_count` int,
  ADD COLUMN `ranking_badge` varchar(32),
  ADD COLUMN `icon_url` varchar(1024),
  ADD COLUMN `app_store_slug` varchar(128),
  ADD COLUMN `is_listed` boolean NOT NULL DEFAULT false,
  ADD COLUMN `sort_order` int NOT NULL DEFAULT 0;

CREATE INDEX `apps_listed_idx` ON `apps` (`is_listed`);
