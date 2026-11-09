
CREATE DATABASE IF NOT EXISTS smart_energy_management;

USE smart_energy_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Appliances table
CREATE TABLE IF NOT EXISTS appliances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    appliance_name VARCHAR(150) NOT NULL,
    power DECIMAL(10,2) NOT NULL,
    hours_per_day DECIMAL(5,2) NOT NULL,
    quantity INT DEFAULT 1,
    room VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);
