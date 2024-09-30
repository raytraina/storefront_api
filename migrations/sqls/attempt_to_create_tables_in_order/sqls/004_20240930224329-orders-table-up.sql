CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId int NOT NULL REFERENCES users(id),
    orderStatus varchar(25) DEFAULT 'active'
);