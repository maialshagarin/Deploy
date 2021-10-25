USE sql11446744;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),
    country VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE articles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    article_id INT,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);