SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

INSERT INTO `departments` (`id`, `name`) VALUES
(100, 'Departamento A'),
(101, 'Departamento B'),
(102, 'Departamento C');

INSERT INTO `towns` (`id`, `name`, `department_id`) VALUES
(101, 'Ciudad 1', 100),
(102, 'Ciudad 2', 101),
(103, 'Ciudad 3', 102),
(104, 'Ciudad 4', 102);

INSERT INTO `companies` (`id`, `name`, `nit`, `address`, `phone_number`, `website`, `quantity_employees`, `economic_activity`, `user_id`) VALUES
('f6a88da6-8822-4a50-bb72-c7766822e0f1', 'Daniel SAS', '10002003009', 'KR 108 25-23', '+573014005060', 'www.danielsas.com', '1-10', '0001', '6c64a381-9445-4c82-9954-3731df733625');

INSERT INTO `profiles` (`id`, `name`, `lastname`, `dni`, `personal_phone_number`, `photo`) VALUES
('998ae969-3f9a-4c92-b104-83ff64147144', 'daniel', 'example', '1011121314', '+573004005060', 'daniel-example.jpg');

INSERT INTO `users` (`id`, `email`, `password`, `verified`, `is_active`, `verify_token`, `reset_password_token`, `first_login`, `roles`, `created_on`, `profile_id`) VALUES
('6c64a381-9445-4c82-9954-3731df733625', 'daniel.example@yopmail.com', '$2a$10$E2Sbcdv82li/z5a4hpePQOAUb9cU4JzFgk0i9mRV6bYornAw7dTam', 1, 1, 'NP_lYD0L0XEuZKUL1T8t12IRU', NULL, 1, 'owner', '2024-12-20 11:21:12.730460', '998ae969-3f9a-4c92-b104-83ff64147144');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
