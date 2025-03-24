-- Tạo bảng user_info
CREATE TABLE user_info (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         full_name VARCHAR(100),
                                         gender VARCHAR(6),
                                         birthday TIMESTAMP,
                                         address VARCHAR(255),
                                         phone VARCHAR(10),
                                         description TEXT,
                                         image TEXT
);

-- Tạo bảng roles
CREATE TABLE roles (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(20),
                                     role VARCHAR(10)
);

-- Tạo bảng users
CREATE TABLE users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     user_info_id INT,
                                     role_id INT,
                                     email VARCHAR(320),
                                     password VARCHAR(255),
                                     picture VARCHAR(320),
                                     name VARCHAR(255),
                                     refresh_token VARCHAR(320),
                                     CONSTRAINT FK_user_info_id_user FOREIGN KEY (user_info_id) REFERENCES user_info(id)
                                         ON DELETE CASCADE ON UPDATE CASCADE,
                                     CONSTRAINT FK_role_id_user FOREIGN KEY (role_id) REFERENCES roles(id)
                                         ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tạo bảng article
CREATE TABLE article (
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