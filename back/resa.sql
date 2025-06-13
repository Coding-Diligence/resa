-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 13 juin 2025 à 08:35
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `resa`
--

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `created_at`, `updated_at`, `email`, `name`, `password`) VALUES
(1, '2025-06-12 12:23:28.000000', '0000-00-00 00:00:00.000000', 'c@a.com', 'Charles Aznavour', 'boheme'),
(2, '2025-06-12 12:26:59.000000', '0000-00-00 00:00:00.000000', 'b@b.com', 'Bonnie', 'bar'),
(3, '2025-06-12 12:30:46.000000', '0000-00-00 00:00:00.000000', 'c@c.fr', 'Clyde', 'canal'),
(4, '2025-06-12 15:47:49.000000', '0000-00-00 00:00:00.000000', 'm@f.com', 'Manuel Ferara', 'acteur'),
(5, '2025-06-12 15:47:49.000000', '0000-00-00 00:00:00.000000', 'ldb@v.fr', 'La Dame Blanche', 'horreur123'),
(6, '2025-06-12 15:53:16.000000', '0000-00-00 00:00:00.000000', 'doom@guy.com', 'David Martinez', 'heros'),
(7, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 'peter@pan.com', 'Clochette', 'tinkerbell'),
(8, '2025-06-12 16:01:05.000000', '0000-00-00 00:00:00.000000', 'k@k.fr', 'Kirikou', 'kirikou'),
(9, '2025-06-13 10:02:41.000000', '0000-00-00 00:00:00.000000', 'admin@admin.fr', 'Admin', 'admin');

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`id`, `created_at`, `updated_at`, `roles`, `user_id`) VALUES
(1, '2025-06-13 10:03:05.000000', '0000-00-00 00:00:00.000000', 'ADMIN', 9),
(2, '2025-06-13 10:03:26.000000', '0000-00-00 00:00:00.000000', 'USER', 1),
(3, '2025-06-13 10:03:26.000000', '0000-00-00 00:00:00.000000', 'USER', 2),
(4, '2025-06-13 10:03:54.000000', '0000-00-00 00:00:00.000000', 'USER', 3),
(5, '2025-06-13 10:03:54.000000', '0000-00-00 00:00:00.000000', 'USER', 4),
(6, '2025-06-13 10:04:29.000000', '0000-00-00 00:00:00.000000', 'USER', 5),
(7, '2025-06-13 10:04:29.000000', '0000-00-00 00:00:00.000000', 'USER', 6),
(8, '2025-06-13 10:05:03.000000', '0000-00-00 00:00:00.000000', 'USER', 7),
(9, '2025-06-13 10:05:03.000000', '0000-00-00 00:00:00.000000', 'USER', 8);

--
-- Déchargement des données de la table `boat`
--

INSERT INTO `boat` (`id`, `cabins`, `created_at`, `name`, `place_freight`, `place_human_and_pet`, `updated_at`) VALUES
(1, 3, '2025-06-12 12:05:24.000000', 'Titanic', 15, 10, '0000-00-00 00:00:00.000000'),
(2, 20, '2025-06-12 12:17:21.000000', 'Black Pearl ', 60, 60, '0000-00-00 00:00:00.000000'),
(3, 20, '2025-06-12 14:53:40.000000', 'Hollandais Volant', 20, 40, '0000-00-00 00:00:00.000000'),
(4, 40, '2025-06-12 15:26:59.000000', 'Destination finale', 20, 80, '0000-00-00 00:00:00.000000'),
(5, 5, '2025-06-12 15:26:59.000000', 'Nom du ferry', 30, 100, '0000-00-00 00:00:00.000000'),
(6, 25, '2025-06-12 15:28:08.000000', 'Le passeur', 10, 35, '0000-00-00 00:00:00.000000'),
(7, 10, '2025-06-12 15:28:08.000000', 'Destination Valhalla', 30, 30, '0000-00-00 00:00:00.000000');

--
-- Déchargement des données de la table `travel`
--

INSERT INTO `travel` (`id`, `created_at`, `updated_at`, `arrival_port`, `arrival_time`, `departure_port`, `departure_time`, `price_human`, `price_vehicle`, `boat_id`) VALUES
(1, '2025-06-13 09:13:25.000000', '0000-00-00 00:00:00.000000', 'Corse', '2025-06-14 20:30:25.243000', 'Marseille', '2025-06-14 08:00:25.313000', 150.00, 400.00, 1),
(6, '2025-06-13 09:24:35.000000', '2025-06-13 09:38:22.000000', 'Marseille', '2025-06-14 22:00:35.940000', 'Corse', '2025-06-14 09:30:35.221000', 150.00, 400.00, 5),
(7, '2025-06-13 09:58:54.000000', '0000-00-00 00:00:00.000000', 'Corse', '2025-06-15 08:30:54.663000', 'Marseille', '2025-06-14 20:00:54.067000', 100.00, 200.00, 2),
(8, '2025-06-13 09:58:54.000000', '0000-00-00 00:00:00.000000', 'Marseille', '2025-06-17 10:00:54.810000', 'Corse', '2025-06-16 21:30:54.553000', 100.00, 200.00, 1);

--
-- Déchargement des données de la table `vehicle`
--

INSERT INTO `vehicle` (`id`, `created_at`, `updated_at`, `registration`, `type`, `user_id`) VALUES
(1, '2025-06-12 16:37:45.000000', '2025-06-13 09:05:56.000000', 'AA-123-BB', 'Car', 1),
(2, '2025-06-12 16:51:07.000000', '2025-06-13 09:06:14.000000', 'CC-456-DD', 'Truck', 2),
(3, '2025-06-12 16:51:07.000000', '2025-06-13 09:06:25.000000', 'EE-789-FF', 'Bike', 3),
(4, '2025-06-12 16:52:29.000000', '2025-06-13 09:06:45.000000', 'GG-159-HH', 'Van', 4);

--
-- Déchargement des données de la table `extra`
--

INSERT INTO `extra` (`id`, `created_at`, `name`, `price`, `quantity`, `updated_at`, `travel_id`) VALUES
(1, '2025-06-13 10:08:52.000000', 'animal', 50.00, 10, '0000-00-00 00:00:00.000000', 1),
(2, '2025-06-13 10:08:52.000000', 'cabin', 100.00, 3, '0000-00-00 00:00:00.000000', 1),
(3, '2025-06-13 10:10:26.000000', 'animal', 50.00, 100, '0000-00-00 00:00:00.000000', 6),
(4, '2025-06-13 10:10:26.000000', 'cabin', 100.00, 5, '0000-00-00 00:00:00.000000', 6);

--
-- Déchargement des données de la table `invoice`
--

INSERT INTO `invoice` (`id`, `created_at`, `updated_at`, `travel_id`, `user_id`) VALUES
(1, '2025-06-13 10:13:31.000000', '0000-00-00 00:00:00.000000', 1, 2),
(2, '2025-06-13 10:13:31.000000', '0000-00-00 00:00:00.000000', 6, 3);

--
-- Déchargement des données de la table `invoice_extra`
--

INSERT INTO `invoice_extra` (`id`, `created_at`, `updated_at`, `price`, `quantity`, `extra_id`, `invoice_id`) VALUES
(1, '2025-06-13 10:16:30.000000', '0000-00-00 00:00:00.000000', 50.00, 2, 1, 1),
(2, '2025-06-13 10:16:30.000000', '0000-00-00 00:00:00.000000', 100.00, 1, 4, 2);

--
-- Déchargement des données de la table `user_travel`
--

INSERT INTO `user_travel` (`id`, `created_at`, `updated_at`, `travel_id`, `user_id`) VALUES
(1, '2025-06-13 10:05:42.000000', '0000-00-00 00:00:00.000000', 1, 2),
(2, '2025-06-13 10:05:42.000000', '0000-00-00 00:00:00.000000', 6, 3);

--
-- Déchargement des données de la table `vehicle_travel`
--

INSERT INTO `vehicle_travel` (`vehicle_id`, `travel_id`) VALUES
(1, 1),
(2, 6);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
