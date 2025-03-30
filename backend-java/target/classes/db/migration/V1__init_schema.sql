-- Tạo database nếu chưa có (tuỳ môi trường, có thể bỏ dòng này nếu đã tạo sẵn)
CREATE DATABASE IF NOT EXISTS solartp;
USE solartp;

-- Bảng roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    role VARCHAR(10)
    );

-- Dữ liệu mặc định bảng roles
INSERT INTO roles (id, name, role) VALUES
                                       (1, 'ROLE_ADMIN', 'ADMIN'),
                                       (2, 'ROLE_STAFF', 'STAFF'),
                                       (3, 'ROLE_USER', 'USER');

-- Bảng user_info
CREATE TABLE IF NOT EXISTS user_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    gender VARCHAR(6),
    birthday TIMESTAMP,
    address VARCHAR(255),
    phone VARCHAR(10),
    description TEXT,
    image TEXT
    );

-- Bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_info_id INT,
    role_id INT,
    email VARCHAR(320),
    password VARCHAR(255),
    picture VARCHAR(320),
    name VARCHAR(255),
    refresh_token VARCHAR(320)
    );

-- Liên kết khoá ngoại cho bảng users
ALTER TABLE users
    ADD CONSTRAINT FK_user_info_id_user
        FOREIGN KEY (user_info_id)
            REFERENCES user_info(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE users
    ADD CONSTRAINT FK_role_id_user
        FOREIGN KEY (role_id)
            REFERENCES roles(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

-- Cho phép role_id được null
ALTER TABLE users MODIFY role_id INT NULL;

-- Bảng article
CREATE TABLE IF NOT EXISTS article (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       title VARCHAR(255) NOT NULL,
    slug_title VARCHAR(255) NOT NULL,
    header_1 VARCHAR(255),
    content_1_1 TEXT,
    content_1_2 TEXT,
    header_2 VARCHAR(255),
    content_2_1 TEXT,
    content_2_2 TEXT,
    header_3 VARCHAR(255),
    content_3_1 TEXT,
    content_3_2 TEXT,
    header_4 VARCHAR(255),
    content_4_1 TEXT,
    content_4_2 TEXT,
    image_1_url VARCHAR(500),
    alt_image1 VARCHAR(255),
    image_2_url VARCHAR(500),
    alt_image2 VARCHAR(255),
    date_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(100)
    );