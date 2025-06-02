-- Création de la table boat
CREATE TABLE IF NOT EXISTS boat (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    place_human_and_pet INT NOT NULL,
    cabins INT NOT NULL,
    place_freight INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Création de la table travel
CREATE TABLE IF NOT EXISTS travel (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    departure_port VARCHAR(100) NOT NULL,
    arrival_port VARCHAR(100) NOT NULL,
    price_human DECIMAL(10, 2) NOT NULL,
    price_vehicle DECIMAL(10, 2) NOT NULL,
    boat_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (boat_id) REFERENCES boat(id)
);

-- Création de la table extra
CREATE TABLE IF NOT EXISTS extra (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    travel_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (travel_id) REFERENCES travel(id)
);

-- Création de la table Invoice
CREATE TABLE IF NOT EXISTS invoice (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    travel_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (travel_id) REFERENCES travel(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Création de la table invoice_extra
CREATE TABLE IF NOT EXISTS invoice_extra (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT UNSIGNED NOT NULL,
    extra_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (extra_id) REFERENCES extra(id)
);

-- Création de la table user
CREATE TABLE IF NOT EXISTS user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Création de la table user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    roles VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Création de la table vehicle
CREATE TABLE IF NOT EXISTS vehicle (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    registration VARCHAR(20) NOT NULL,
    type VARCHAR(50) NOT NULL,
    user_id INT UNSIGNED,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Création de la table de liaison user_travel
CREATE TABLE IF NOT EXISTS user_travel (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    travel_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (travel_id) REFERENCES travel(id)
);

-- Création de la table de liaison vehicle_travel
CREATE TABLE IF NOT EXISTS vehicle_travel (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    vehicle_id INT UNSIGNED NOT NULL,
    travel_id INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id),
    FOREIGN KEY (travel_id) REFERENCES travel(id)
); 