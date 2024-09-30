CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    commonName varchar(100) UNIQUE
);