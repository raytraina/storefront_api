# API Requirements [UPDATED]

## Summary

The company stakeholders want to create an online storefront to showcase their great product ideas.

Users need to be able to:

- browse an index of all products
- see the specifics of a single product
- add products to an order that they can view in a cart page [FRONTEND]

You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints [UPDATED]

### Products

#### GET `/api/products`

Index all products stored in the database.

#### GET `/api/products/:id`

Show a product by its `id`.

#### POST `/api/products/new` [token required]

Create a new product. Required body parameters:

``` javascript
{
    name: <PRODUCT_NAME>,
    price: <PRICE>,
    description: <DESCRIPTION>,
    categoryId: <CATEGORYID>,
    token: <JWT_ISSUED_TO_USER>**
}
```

*Note: There should be security measures to prevent users from creating new products unless they have admin privileges. Should be discussed as next steps with stakeholders.*

### Users

#### GET `/api/users` [token required]

Index all users in the database. Token must be sent in the request header using this format:

- `JSON Web Token` should be passed in the request header's key/value pairs matching the below pattern:
  - `"Authorization": "Bearer <JWT>"`

*Note: This should be updated in future iterations to have a different authentication for admin users.*

#### GET `/api/users/:id` [token required]

Show a specific user by their `id`. Token must be sent in the request header using this format:

- `JSON Web Token` should be passed in the request header's key/value pairs matching the below pattern:
  - `"Authorization": "Bearer <JWT>"`

*Note: This should be updated in future iterations to have a different authentication for admin users, as well as verification that the user requesting the endpoint is the same user being queried.*

#### POST `/api/users/new` [token issued]

Create a new user. Required body parameters:

``` javascript
{
    firstName: <FIRSTNAME>,
    lastName: <LASTNAME>,
    email: <EMAIL>,
    password: <UNHASHED_PASSWORD>
}
```

#### POST `/api/users/auth` [token required]

Authenticate user credentials. Required body parameters:

``` javascript
{
    email: <EMAIL>,
    password: <UNHASHED_PASSWORD>,
    token: <JWT_ISSUED_TO_USER>
}
```

### Orders

#### GET `/api/users/:id/orders?status=active` [token required]

Show current open orders for a given user. A few different items must be sent in the request:

- `User ID` should be passed as a parameter in the URL
- `Order status` ("active") should be passed as a query parameter
- `JSON Web Token` should be passed in the request header's key/value pairs matching the below pattern:
  - `"Authorization": "Bearer <JWT>"`

#### GET `/api/users/:id/orders?status=complete` [token required]

Show completed orders for a given user. A few different items must be sent in the request:

- `User ID` should be passed as a parameter in the URL
- `Order status` ("complete") should be passed as a query parameter
- `JSON Web Token` should be passed in the request header's key/value pairs matching the below pattern:
  - `"Authorization": "Bearer <JWT>"`

### Future Work [needs updates]

#### GET `/api/products/popular`

- [OPTIONAL] Top 5 most popular products

#### GET `/api/products?category=<CATEGORY_NAME>`

- [OPTIONAL] Products by category (args: product category)

## Data Shapes [UPDATED]

### Product Model

- `id` => serial/unique INT primarykey
- `name` => VARCHAR
- `price` => FLOAT
- `description` => VARCHAR
- `categoryId` => INT foreignkey

### User Model

- `id` => serial/unique INT primarykey
- `firstName` => VARCHAR
- `lastName` => VARCHAR
- `email` => VARCHAR (should include validation on the frontend)
- `password` => VARCHAR (hashed before storing)
- `isActive` => BOOLEAN

### Order Model

- `id` => serial/unique INT primarykey
- `userId` => INT foreignkey
- `status` => VARCHAR ("active" or "complete"; could update to BOOLEAN)

### ProductOrder Model (middle table connecting Products to an Order)

- `id` => serial/unique INT primarykey
- `productId` => INT foreignkey
- `orderId` => INT foreignkey
- `quantity` => INT

### Category Model

- `id` => serial/unique INT primarykey
- `commonName` => VARCHAR
