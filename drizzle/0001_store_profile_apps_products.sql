ALTER TABLE `stores`
  ADD COLUMN `shopify_domain` varchar(255),
  ADD COLUMN `shopify_plan` varchar(64),
  ADD COLUMN `created_at_on_shopify` timestamp;

CREATE TABLE `products` (
  `id` int AUTO_INCREMENT NOT NULL,
  `store_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `product_url` varchar(512) NOT NULL,
  `image_url` varchar(1024),
  `price` varchar(64),
  `currency` varchar(16),
  `detected_at` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `products_id` PRIMARY KEY(`id`)
);

CREATE INDEX `products_store_idx` ON `products` (`store_id`);
CREATE INDEX `products_handle_idx` ON `products` (`handle`);

ALTER TABLE `products`
  ADD CONSTRAINT `products_store_id_stores_id_fk`
  FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`)
  ON DELETE cascade ON UPDATE no action;
