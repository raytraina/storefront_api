CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName varchar(100),
    lastName varchar(100),
    email varchar(100) UNIQUE NOT NULL,
    password varchar(255),
    isActive boolean DEFAULT true
);