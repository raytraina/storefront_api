CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    price float,
    description text,
    categoryId int REFERENCES categories(id)
);