SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Departamento A'),
(2, 'Departamento B'),
(3, 'Departamento C');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
