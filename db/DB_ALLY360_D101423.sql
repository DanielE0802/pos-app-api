SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

INSERT INTO `brands` (`id`, `name`, `company_id`) VALUES
('cc296209-d60c-4dd9-becd-031879a2ce9b', 'Brand A', NULL);

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

INSERT INTO `contacts` (`id`, `name`, `lastname`, `email`, `address`, `phone_number`, `phone_number2`, `type`, `identity_id`, `town_id`, `company_id`) VALUES
('2ad032a0-0cd4-468a-bd33-edac98603a42', 'proveedor2', 'proveedor2', 'proveedor2@yopmail.com', 'Calle 122B # 12-23', '+34623146826', NULL, 1, 'eb947f10-9aea-4a92-b8c1-c8e1d3efa2cf', 10, 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('4dc2416e-db96-43be-83d8-09f96ec287b4', 'proveedores', 'proveedores', 'proveedor@gmail.com', 'Calle 14B # 12-23', '+34623146826', '+573225315408', 1, '782215af-d801-497c-8f98-3bdcf9f4467b', 12, 'f403346f-e91d-423d-9bbb-6a0168cd3f64');

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Valle del Cauca');

INSERT INTO `identities` (`id`, `type_document`, `type_person`, `number`, `dv`) VALUES
('782215af-d801-497c-8f98-3bdcf9f4467b', 1, 2, 1010066970, 2),
('eb947f10-9aea-4a92-b8c1-c8e1d3efa2cf', 1, 2, 1010066970, 2);

INSERT INTO `pdvs` (`id`, `name`, `description`, `address`, `phone_number`, `main`, `location_id`, `company_id`) VALUES
('2f419f06-34cb-4e0f-a154-b149af1b1f88', 'Punto de Venta Oeste', 'Este es el punto de venta Principal Oeste', 'Calle 123 #45-67', '+573002335689', 1, 0, 'f403346f-e91d-423d-9bbb-6a0168cd3f64'),
('ee78b1f2-2a7a-11ee-8003-7085c296afc1', 'Punto de Venta Norte', 'Description of Punto de Venta Norte', 'Calle 156 # 56-98', '+573215689874', 0, 0, 'f403346f-e91d-423d-9bbb-6a0168cd3f64');

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
(10, 'Pradera', 1),
(11, 'Guacari', 1),
(12, 'Yotoco', 1),
(13, 'Ginebra', 1),
(14, 'Restrepo', 1),
(15, 'Candelaria', 1),
(16, 'Ansermanuevo', 1),
(17, 'La union', 1),
(18, 'Zarzal', 1),
(19, 'Roldanillo', 1),
(20, 'Bolivar', 1),
(21, 'El Aguila', 1),
(22, 'Versalles', 1),
(23, 'Argelia', 1),
(24, 'Florida', 1),
(25, 'Riofrio', 1),
(26, 'Alcala', 1),
(27, 'Caicedonia', 1),
(28, 'Dagua', 1),
(29, 'Bugalagrande', 1),
(30, 'Ulloa', 1),
(31, 'El Cairo', 1),
(32, 'El Dovio', 1),
(33, 'Trujillo', 1),
(34, 'El Cerrito', 1),
(35, 'La cumbre', 1),
(36, 'Sevilla', 1),
(37, 'Toro', 1),
(38, 'Vijes', 1),
(39, 'Obando', 1),
(40, 'La Victoria', 1),
(41, 'Andalucia', 1),
(42, 'San Pedro', 1),
(43, 'Calima el Darien', 1);

INSERT INTO `users` (`id`, `password`, `verified`, `verify_token`, `reset_password_token`, `first_login`, `created_on`, `profile_id`) VALUES
('83f972cc-46e9-45df-974b-a32761ea5542', '$2a$10$dtdF2xSsX1Nd1NkS.Xt/1.BFe5n7FX5LlIH1KbzLX4i8IaNzMEkcW', 1, NULL, NULL, 0, '2023-07-24 15:51:31.681878', '7159951d-0f35-4655-ada7-8ea1f7cb5570');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
