SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

INSERT INTO `brands` (`id`, `name`) VALUES
('cc296209-d60c-4dd9-becd-031879a2ce9b', 'Brand A');

INSERT INTO `categories` (`id`, `name`, `description`, `category_main_category_id`, `company_id`) VALUES
('1711e834-2a6d-11ee-8003-7085c296afc1', 'Category A-A-A', 'Description of Category A-A-A', 'cfd74798-2a6c-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('7d5ca253-af16-4ecd-98d2-70cbe446ea1b', 'Category Test', 'Desc of Category Test', NULL, 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('b6ce1a37-2a6c-11ee-8003-7085c296afc1', 'Category A', 'Description of Category A', NULL, 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('cfd74798-2a6c-11ee-8003-7085c296afc1', 'Category A-A', 'Description of Category A-A', 'b6ce1a37-2a6c-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('cfd74d61-2a6c-11ee-8003-7085c296afc1', 'Category A-B', 'Description of Category A-B', 'b6ce1a37-2a6c-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('de1b5e4f-2a6c-11ee-8003-7085c296afc1', 'Category B', 'Description of Category B', NULL, 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('f9e9dde7-2a6c-11ee-8003-7085c296afc1', 'Category B-A', 'Description of Category B-A', 'de1b5e4f-2a6c-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('f9e9e270-2a6c-11ee-8003-7085c296afc1', 'Category B-B', 'Description of Category B-B', 'de1b5e4f-2a6c-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64');

INSERT INTO `companies` (`id`, `name`, `nit`, `address`, `phone_number`, `website`, `quantity_employees`, `economic_activity:`) VALUES
('f403346f-e91d-423d-9bbb-6a0168cd3f64', 'Empresa Ejemplo', '800123456-7', 'Calle 123 #45-67', '+573215678390', 'https://www.empresa-ejemplo.com', '100-500', 'Servicios');

INSERT INTO `departments` (`id`, `name`) VALUES
('963bd2bd-2a62-11ee-8003-7085c296afc1', 'Department of Colombia A'),
('963bdbd5-2a62-11ee-8003-7085c296afc1', 'Department of Colombia B');

INSERT INTO `pdvs` (`id`, `name`, `description`, `address`, `phone_number`, `main`, `location_id`, `company_id`) VALUES
('2f419f06-34cb-4e0f-a154-b149af1b1f88', 'Punto de Venta Oeste', 'Este es el punto de venta Principal Oeste', 'Calle 123 #45-67', '+573002335689', 1, 'aff6fc7d-2a62-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('ee78b1f2-2a7a-11ee-8003-7085c296afc1', 'Punto de Venta Norte', 'Description of Punto de Venta Norte', 'Calle 156 # 56-98', '+573215689874', 0, 'aff70b53-2a62-11ee-8003-7085c296afc1', 'f403346f-e91d-423d-9bbb-6a0168cd3f64');

INSERT INTO `products` (`id`, `name`, `description`, `bar_code`, `images`, `type_product`, `state`, `sell_in_negative`, `taxes_option`, `sku`, `price_sale`, `price_base`, `quantity_stock`, `product_main_product_id`, `category_id`, `brand_id`) VALUES
('4039de9a-8a04-4c37-acdb-f82e6405c010', 'Producto Ejemplo', 'Esta es la descripción del producto', '1234567890', 'https://example.com/product-image.jpg', 1, 1, 0, 1, 'ABC123', 25000, 20000, 100, NULL, 'b6ce1a37-2a6c-11ee-8003-7085c296afc1', 'cc296209-d60c-4dd9-becd-031879a2ce9b'),
('5a1d4169-d632-4ce4-a3ae-93ef86ec78eb', 'Product A-A', 'Description of Product A-A', 'A-A000001', 'https://acortar.link/nQKCw3', 1, 1, 1, 19, 'A-A-000001', 10000, 5000, 10, '78612a76-2a6d-11ee-8003-7085c296afc1', 'cfd74798-2a6c-11ee-8003-7085c296afc1', 'cc296209-d60c-4dd9-becd-031879a2ce9b'),
('78612a76-2a6d-11ee-8003-7085c296afc1', 'Product A', 'Description of Product A', 'A000001', 'https://acortar.link/nQKCw3', 1, 1, 1, 19, 'A-000001', 10000, 5000, 10, NULL, '1711e834-2a6d-11ee-8003-7085c296afc1', 'cc296209-d60c-4dd9-becd-031879a2ce9b'),
('92ac37b6-9228-41d3-af65-67ed3fa8c8f3', 'Product B', 'Description of Product B', 'B000001', 'https://acortar.link/nQKCw3', 1, 1, 1, 19, 'B-000001', 10000, 5000, 10, NULL, 'f9e9e270-2a6c-11ee-8003-7085c296afc1', 'cc296209-d60c-4dd9-becd-031879a2ce9b'),
('a27df890-69bc-48ce-851d-2f7e3c9b45d7', 'Producto Ejemplo 2', 'Esta es la descripción del producto', '1234567891', 'https://example.com/product-image.jpg', 1, 1, 0, 19, 'AAB000', 25000, 20000, 100, NULL, 'b6ce1a37-2a6c-11ee-8003-7085c296afc1', 'cc296209-d60c-4dd9-becd-031879a2ce9b');

INSERT INTO `products_pdvs` (`id`, `quantity`, `min_quantity`, `products_id`, `pdvs_id`) VALUES
('44c55b4b-0e33-4f62-a3d1-1059992d6340', 50, 10, '78612a76-2a6d-11ee-8003-7085c296afc1', 'ee78b1f2-2a7a-11ee-8003-7085c296afc1'),
('52844d23-518f-4d55-965a-8d153ca5636d', 12350, 10, 'a27df890-69bc-48ce-851d-2f7e3c9b45d7', 'ee78b1f2-2a7a-11ee-8003-7085c296afc1'),
('5d6bde74-df9e-4263-ad90-50beec2e1a0d', 25000, 10, 'a27df890-69bc-48ce-851d-2f7e3c9b45d7', '2f419f06-34cb-4e0f-a154-b149af1b1f88'),
('71ed533c-7502-4dc3-9c30-2f4568dde695', 50, 10, '4039de9a-8a04-4c37-acdb-f82e6405c010', '2f419f06-34cb-4e0f-a154-b149af1b1f88');

INSERT INTO `profiles` (`id`, `email`, `name`, `lastname`, `dni`, `personal_phone_number`, `photo`, `company_id`) VALUES
('7159951d-0f35-4655-ada7-8ea1f7cb5570', 'example@example.com', 'John', 'Doe', '123456789', '+573225154626', 'https://example.com/profile.jpg', 'f403346f-e91d-423d-9bbb-6a0168cd3f64');

INSERT INTO `towns` (`id`, `name`, `department_id`) VALUES
('aff6fc7d-2a62-11ee-8003-7085c296afc1', 'Town of Colombia 1', '963bd2bd-2a62-11ee-8003-7085c296afc1'),
('aff7027c-2a62-11ee-8003-7085c296afc1', 'Town of Colombia 2', '963bd2bd-2a62-11ee-8003-7085c296afc1'),
('aff706ce-2a62-11ee-8003-7085c296afc1', 'Town of Colombia 3', '963bdbd5-2a62-11ee-8003-7085c296afc1'),
('aff70b53-2a62-11ee-8003-7085c296afc1', 'Town of Colombia 4', '963bdbd5-2a62-11ee-8003-7085c296afc1');

INSERT INTO `users` (`id`, `password`, `verified`, `verify_token`, `reset_password_token`, `first_login`, `created_on`, `profile_id`) VALUES
('83f972cc-46e9-45df-974b-a32761ea5542', '$2a$10$dtdF2xSsX1Nd1NkS.Xt/1.BFe5n7FX5LlIH1KbzLX4i8IaNzMEkcW', 1, NULL, NULL, 0, '2023-07-24 15:51:31.681878', '7159951d-0f35-4655-ada7-8ea1f7cb5570');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;