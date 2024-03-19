SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `brands` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `company_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categories` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category_main_category_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `companies` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nit` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity_employees` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `economic_activity:` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contacts` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number2` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` int NOT NULL,
  `identity_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `company_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `town_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `identities` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `type_document` int NOT NULL,
  `type_person` int NOT NULL,
  `number` int NOT NULL,
  `dv` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `pdvs` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `main` tinyint NOT NULL,
  `location_id` int DEFAULT NULL,
  `company_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `products` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `bar_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `images` text COLLATE utf8mb4_general_ci,
  `type_product` int NOT NULL COMMENT '1: Simple | 2: Config',
  `state` tinyint NOT NULL,
  `sell_in_negative` tinyint NOT NULL,
  `taxes_option` int NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price_sale` int NOT NULL,
  `price_base` int NOT NULL,
  `quantity_stock` int NOT NULL,
  `product_main_product_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `brand_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `products_pdvs` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `min_quantity` int NOT NULL,
  `products_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pdvs_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `profiles` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `personal_phone_number` varchar(55) COLLATE utf8mb4_general_ci NOT NULL,
  `photo` varchar(155) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `towns` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `verified` tinyint NOT NULL DEFAULT '1',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `verify_token` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reset_password_token` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_login` tinyint NOT NULL DEFAULT '1',
  `roles` text COLLATE utf8mb4_general_ci,
  `created_on` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `profile_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_96db6bbbaa6f23cad26871339b` (`name`),
  ADD KEY `FK_654d6ae4688cbf4580b6cfa3b5c` (`company_id`);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c0bd07c28eb461cf192638d4a05` (`category_main_category_id`),
  ADD KEY `FK_987f987126a3f2e4f9ec03db04e` (`company_id`);

ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6d64e8c7527a9e4af83cc66cbf7` (`userId`);

ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_a654663dae8f30f4a21ad5a3cb` (`identity_id`),
  ADD KEY `FK_b53945f3dfe982678bfeb5e1b4f` (`company_id`),
  ADD KEY `FK_93ae4eb723d5e85970fe8e80a77` (`town_id`);

ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `identities`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pdvs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_767c51d1ceed77680594b7838c` (`address`),
  ADD KEY `FK_ec1f95d414024435f2c76cc3aee` (`location_id`),
  ADD KEY `FK_0229d56196245e634dadad57f35` (`company_id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_55d5eef3f101f3b74a7082d730c` (`product_main_product_id`),
  ADD KEY `FK_9a5f6868c96e0069e699f33e124` (`category_id`),
  ADD KEY `FK_1530a6f15d3c79d1b70be98f2be` (`brand_id`);

ALTER TABLE `products_pdvs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d6e8eb9f50a3ef4bd3ee3533b08` (`products_id`),
  ADD KEY `FK_ef110ea33a94d33256356e8c651` (`pdvs_id`);

ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_d01d5321ffd1b73772dcdc005d` (`dni`),
  ADD UNIQUE KEY `IDX_09d81bff5f1d06bbb255904279` (`personal_phone_number`);

ALTER TABLE `towns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9622a3805504447b728dd24844d` (`department_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD UNIQUE KEY `REL_23371445bd80cb3e413089551b` (`profile_id`),
  ADD UNIQUE KEY `IDX_5d96c2b4e28dfcd11ab3bbd928` (`verify_token`),
  ADD UNIQUE KEY `IDX_ee6419219542371563e0592db5` (`reset_password_token`);


ALTER TABLE `departments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `towns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `brands`
  ADD CONSTRAINT `FK_654d6ae4688cbf4580b6cfa3b5c` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

ALTER TABLE `categories`
  ADD CONSTRAINT `FK_987f987126a3f2e4f9ec03db04e` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `FK_c0bd07c28eb461cf192638d4a05` FOREIGN KEY (`category_main_category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `companies`
  ADD CONSTRAINT `FK_6d64e8c7527a9e4af83cc66cbf7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `contacts`
  ADD CONSTRAINT `FK_93ae4eb723d5e85970fe8e80a77` FOREIGN KEY (`town_id`) REFERENCES `towns` (`id`),
  ADD CONSTRAINT `FK_a654663dae8f30f4a21ad5a3cb8` FOREIGN KEY (`identity_id`) REFERENCES `identities` (`id`),
  ADD CONSTRAINT `FK_b53945f3dfe982678bfeb5e1b4f` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

ALTER TABLE `pdvs`
  ADD CONSTRAINT `FK_0229d56196245e634dadad57f35` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `FK_ec1f95d414024435f2c76cc3aee` FOREIGN KEY (`location_id`) REFERENCES `towns` (`id`);

ALTER TABLE `products`
  ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `FK_55d5eef3f101f3b74a7082d730c` FOREIGN KEY (`product_main_product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `products_pdvs`
  ADD CONSTRAINT `FK_d6e8eb9f50a3ef4bd3ee3533b08` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FK_ef110ea33a94d33256356e8c651` FOREIGN KEY (`pdvs_id`) REFERENCES `pdvs` (`id`);

ALTER TABLE `towns`
  ADD CONSTRAINT `FK_9622a3805504447b728dd24844d` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

ALTER TABLE `users`
  ADD CONSTRAINT `FK_23371445bd80cb3e413089551bf` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
