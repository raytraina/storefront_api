CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName varchar(100),
    lastName varchar(100),
    email varchar(100) UNIQUE NOT NULL,
    password varchar(255),
    isActive boolean DEFAULT true
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    commonName varchar(100) UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    price float,
    description text,
    categoryId int REFERENCES categories(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId int NOT NULL REFERENCES users(id),
    orderStatus varchar(25) DEFAULT 'active'
);

CREATE TABLE productOrders (
    id SERIAL PRIMARY KEY,
    productId int NOT NULL REFERENCES products(id),
    orderId int NOT NULL REFERENCES orders(id),
    quantity int
);