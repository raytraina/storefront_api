CREATE TABLE productOrders (
    id SERIAL PRIMARY KEY,
    productID int NOT NULL REFERENCES products(id),
    orderId int NOT NULL REFERENCES orders(id),
    quantity int
);