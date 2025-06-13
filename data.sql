-- Insertion des utilisateurs
INSERT INTO `user` (`id`, `created_at`, `updated_at`, `email`, `name`, `password`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'admin@resa.com', 'Admin User', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG'),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'user@resa.com', 'John Doe', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG'),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'marie@resa.com', 'Marie Dupont', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG');

-- Insertion des rôles utilisateurs
INSERT INTO `user_roles` (`id`, `created_at`, `updated_at`, `roles`, `user_id`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'ROLE_ADMIN', 1),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'ROLE_USER', 2),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'ROLE_USER', 3);

-- Insertion des bateaux
INSERT INTO `boat` (`id`, `cabins`, `created_at`, `name`, `place_freight`, `place_human_and_pet`, `updated_at`) VALUES
(1, 10, '2024-03-15 10:00:00', 'Le Grand Bleu', 50, 100, '2024-03-15 10:00:00'),
(2, 5, '2024-03-15 10:00:00', 'L\'Océan', 30, 60, '2024-03-15 10:00:00'),
(3, 8, '2024-03-15 10:00:00', 'La Mer', 40, 80, '2024-03-15 10:00:00');

-- Insertion des voyages
INSERT INTO `travel` (`id`, `created_at`, `updated_at`, `arrival_port`, `arrival_time`, `departure_port`, `departure_time`, `price_human`, `price_vehicle`, `boat_id`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'Marseille', '2024-04-01 14:00:00', 'Toulon', '2024-04-01 10:00:00', 50.00, 100.00, 1),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'Nice', '2024-04-02 15:00:00', 'Marseille', '2024-04-02 11:00:00', 60.00, 120.00, 2),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'Toulon', '2024-04-03 16:00:00', 'Nice', '2024-04-03 12:00:00', 55.00, 110.00, 3);

-- Insertion des véhicules
INSERT INTO `vehicle` (`id`, `created_at`, `updated_at`, `registration`, `type`, `user_id`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'AB-123-CD', 'Voiture', 2),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'EF-456-GH', 'Camion', 3),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 'IJ-789-KL', 'Voiture', 2);

-- Association des véhicules aux voyages
INSERT INTO `vehicle_travel` (`vehicle_id`, `travel_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insertion des extras
INSERT INTO `extra` (`id`, `created_at`, `name`, `price`, `quantity`, `updated_at`, `travel_id`) VALUES
(1, '2024-03-15 10:00:00', 'Petit-déjeuner', 15.00, 50, '2024-03-15 10:00:00', 1),
(2, '2024-03-15 10:00:00', 'Déjeuner', 25.00, 50, '2024-03-15 10:00:00', 1),
(3, '2024-03-15 10:00:00', 'Dîner', 30.00, 50, '2024-03-15 10:00:00', 2);

-- Insertion des factures
INSERT INTO `invoice` (`id`, `created_at`, `updated_at`, `travel_id`, `user_id`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 1, 2),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 2, 3),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 3, 2);

-- Insertion des extras dans les factures
INSERT INTO `invoice_extra` (`id`, `created_at`, `updated_at`, `extra_id`, `invoice_id`, `price`, `quantity`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 1, 1, 15.00, 2),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 2, 1, 25.00, 2),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 3, 2, 30.00, 1);

-- Insertion des destinations
INSERT INTO `destinations` (`id`, `arrival_port`, `country_from`, `country_to`, `departure_port`) VALUES
(1, 'Marseille', 'France', 'France', 'Toulon'),
(2, 'Nice', 'France', 'France', 'Marseille'),
(3, 'Toulon', 'France', 'France', 'Nice');

-- Association des utilisateurs aux voyages
INSERT INTO `user_travel` (`id`, `created_at`, `updated_at`, `travel_id`, `user_id`) VALUES
(1, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 1, 2),
(2, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 2, 3),
(3, '2024-03-15 10:00:00', '2024-03-15 10:00:00', 3, 2); 