-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2024 a las 04:09:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `task_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `task`
--

CREATE TABLE `task` (
  `id_task` int(11) NOT NULL,
  `nombre_task` varchar(50) NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `task`
--

INSERT INTO `task` (`id_task`, `nombre_task`, `fecha_creacion`, `status`, `user_id`) VALUES
(1, 'Comprar para el desayuno', '2024-09-20', 0, 1),
(2, 'Comprar para el almuerzo', '2024-09-20', 0, 1),
(3, 'Comprar pollo', '2024-09-20', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `nombres_user` varchar(50) NOT NULL,
  `apellido_user` varchar(50) NOT NULL,
  `user` varchar(30) NOT NULL,
  `password` varchar(62) NOT NULL,
  `status` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `ultimo_acceso` date NOT NULL,
  `tipo_usuario` varchar(15) NOT NULL DEFAULT 'GENERAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `nombres_user`, `apellido_user`, `user`, `password`, `status`, `fecha_creacion`, `ultimo_acceso`, `tipo_usuario`) VALUES
(1, 'Pedro Perez', '', 'pperez', '$2a$08$lyLXb5GlKuki5YktPd5zXu9OzZzFZs9EJdjpvEJ5GaWz244oH9yRW', 0, '0000-00-00', '0000-00-00', 'GENERAL'),
(3, 'Santiago Rubiano', '', 'srubiano', '$2a$08$/1ncorp1oQJV6yvs2dsAbOj9cI4hRdCdW/qKB3saNSIx.BhtIWUU6', 0, '0000-00-00', '0000-00-00', 'ADMIN'),
(3, 'Maria Zuluaga', '', 'mzuluaga', '$2a$08$K.DWGGCeq2qxEepSV8qXcOQM.iRXQ0y2znE44OWqTibbJOcl.JtJi', 0, '0000-00-00', '0000-00-00', 'GENERAL');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id_task`),
  ADD KEY `fk_user_task` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `task`
--
ALTER TABLE `task`
  MODIFY `id_task` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_user_task` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
